import { db } from "../connect.js";

/**
 * GET /feed?userId=...&limit=10&page=1
 *
 * This endpoint computes a personalized feed ranking on the fly.
 * Personalization includes:
 *  - Generic engagement score (using LOG(1 + count) for diminishing returns)
 *  - A following bonus if the current user follows the post’s author
 *  - A bonus based on historical interactions for the post's type,
 *  - A bonus if the post author's account type matches the current user's account type,
 *  - And a bonus if the post author's seasonal status (from fitness_profile) matches the current user's seasonal status.
 *
 * Historical interactions are now pre-aggregated in views:
 *  • user_feed_prefs_post_type
 *  • user_feed_prefs_account_type
 *  • user_feed_prefs_seasonal_status
 */
export const getUserFeed = (req, res) => {
  const { userId, limit = 10, page = 1 } = req.query;
  const offset = (page - 1) * limit;

  const query = `
    SELECT 
      p.post_id,
      p.*,
      -- Generic score: log-transformed engagement minus time decay
      (
        (LOG(1 + COALESCE(l.like_count, 0)) * 1.5) +
        (LOG(1 + COALESCE(c.comment_count, 0)) * 2.0) +
        (LOG(1 + COALESCE(s.share_count, 0)) * 3.0) +
        (LOG(1 + COALESCE(b.bookmark_count, 0)) * 2.5) -
        (TIMESTAMPDIFF(HOUR, p.created_at, NOW()) * 0.1)
      ) AS generic_score,
      -- Personalized bonus:
      (
        (CASE WHEN fl.follower_id IS NOT NULL THEN 4 ELSE 0 END) +
        (CASE WHEN pu.account_type = (SELECT account_type FROM Users WHERE user_id = ?) THEN 3 ELSE 0 END) +
        (LOG(1 + COALESCE(ui_at.interactions, 0)) * 0.5) +
        (CASE WHEN fp.seasonal_status = (SELECT seasonal_status FROM FitnessProfile WHERE user_id = ?) THEN 3 ELSE 0 END) +
        (LOG(1 + COALESCE(ui_ss.interactions, 0)) * 0.5)
      ) AS personalized_bonus,
      -- Overall personalized score:
      (
        (LOG(1 + COALESCE(l.like_count, 0)) * 1.5) +
        (LOG(1 + COALESCE(c.comment_count, 0)) * 2.0) +
        (LOG(1 + COALESCE(s.share_count, 0)) * 3.0) +
        (LOG(1 + COALESCE(b.bookmark_count, 0)) * 2.5) -
        (TIMESTAMPDIFF(HOUR, p.created_at, NOW()) * 0.1) +
        (CASE WHEN fl.follower_id IS NOT NULL THEN 4 ELSE 0 END) +
        (CASE WHEN pu.account_type = (SELECT account_type FROM Users WHERE user_id = ?) THEN 3 ELSE 0 END) +
        (LOG(1 + COALESCE(ui_at.interactions, 0)) * 0.5) +
        (CASE WHEN fp.seasonal_status = (SELECT seasonal_status FROM FitnessProfile WHERE user_id = ?) THEN 3 ELSE 0 END) +
        (LOG(1 + COALESCE(ui_ss.interactions, 0)) * 0.5)
      ) AS personalized_score
    FROM Posts p
    -- Join generic engagement counts:
    LEFT JOIN (
      SELECT post_id, COUNT(*) AS like_count 
      FROM Likes 
      GROUP BY post_id
    ) l ON p.post_id = l.post_id
    LEFT JOIN (
      SELECT post_id, COUNT(*) AS comment_count 
      FROM Comments 
      GROUP BY post_id
    ) c ON p.post_id = c.post_id
    LEFT JOIN (
      SELECT post_id, COUNT(*) AS share_count 
      FROM Shares 
      GROUP BY post_id
    ) s ON p.post_id = s.post_id
    LEFT JOIN (
      SELECT post_id, COUNT(*) AS bookmark_count 
      FROM Bookmarks 
      GROUP BY post_id
    ) b ON p.post_id = b.post_id
    -- Following bonus:
    LEFT JOIN Followers fl ON fl.follower_id = ? AND p.user_id = fl.followee_id
    -- Post author info:
    LEFT JOIN Users pu ON p.user_id = pu.user_id
    LEFT JOIN FitnessProfile fp ON p.user_id = fp.user_id
    -- Historical interactions from the pre-aggregated views:
    LEFT JOIN UserFeedPrefsAccountType ui_at ON ui_at.account_type = pu.account_type AND ui_at.user_id = ?
    LEFT JOIN UserFeedPrefsSeasonalStatus ui_ss ON ui_ss.seasonal_status = fp.seasonal_status AND ui_ss.user_id = ?
    WHERE p.created_at >= NOW() - INTERVAL 7 DAY
    ORDER BY personalized_score DESC
    LIMIT ? OFFSET ?;`;

  /**
   * Parameter order:
   *  1. For account type fixed bonus (personalized_bonus): current user's ID
   *  2. For seasonal status fixed bonus (personalized_bonus): current user's ID
   *  3. For account type fixed bonus (personalized_score): current user's ID
   *  4. For seasonal status fixed bonus (personalized_score): current user's ID
   *  5. For Followers join: current user's ID
   *  6. For ui_pt join: current user's ID
   *  7. For ui_at join: current user's ID
   *  8. For ui_ss join: current user's ID
   *  9. LIMIT value
   * 10. OFFSET value
   */
  const params = [
    userId, // (2) seasonal status bonus in personalized_bonus
    userId, // (2) seasonal status bonus in personalized_bonus
    userId, // (3) account type bonus in personalized_score
    userId, // (4) seasonal status bonus in personalized_score
    userId, // (5) Followers join
    userId, // (7) ui_at join (account type)
    userId, // (8) ui_ss join (seasonal status)
    parseInt(limit), // (9) LIMIT
    parseInt(offset), // (10) OFFSET
  ];

  db.query(query, params, (err, results) => {
    if (err) {
      console.error("Error fetching user feed:", err);
      return res
        .status(500)
        .json({ message: "Error fetching user feed", error: err.message });
    }

    // Fetch additional content for each post (photos, videos, texts)
    const fetchContentPromises = results.map((post) => {
      return new Promise((resolve, reject) => {
        const content = post.content || {};

        const photoPromises = (content.photos || []).map((photo) => {
          return new Promise((resolve, reject) => {
            db.query(
              `SELECT * FROM Photos WHERE photo_id = ?`,
              [photo.id],
              (err, data) => {
                if (err) reject(err);
                else resolve({ ...data[0], order: photo.order });
              }
            );
          });
        });

        const videoPromises = (content.videos || []).map((video) => {
          return new Promise((resolve, reject) => {
            db.query(
              `SELECT * FROM Videos WHERE video_id = ?`,
              [video.id],
              (err, data) => {
                if (err) reject(err);
                else resolve({ ...data[0], order: video.order });
              }
            );
          });
        });

        const textPromises = (content.texts || []).map((text) => {
          return new Promise((resolve, reject) => {
            db.query(
              `SELECT * FROM Texts WHERE text_id = ?`,
              [text.id],
              (err, data) => {
                if (err) reject(err);
                else resolve({ ...data[0], order: text.order });
              }
            );
          });
        });

        Promise.all([
          Promise.all(photoPromises),
          Promise.all(videoPromises),
          Promise.all(textPromises),
        ])
          .then(([photos, videos, texts]) => {
            post.content = {
              photos,
              videos,
              texts,
            };
            resolve(post);
          })
          .catch((err) => {
            console.error(
              "Error resolving content for post:",
              post.post_id,
              err
            );
            reject(err);
          });
      });
    });

    Promise.all(fetchContentPromises)
      .then((postsWithContent) => {
        res.status(200).json(postsWithContent);
      })
      .catch((err) => {
        console.error("Error processing posts content:", err);
        res.status(500).json({
          message: "Error processing post content",
          error: err.message,
        });
      });
  });
};
