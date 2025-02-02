import { db } from "../connect.js";

/**
 * GET /feed?userId=...&limit=10&page=1
 *
 * This endpoint computes the feed on the fly using both a generic score and personalized bonus.
 * We now apply a logarithmic transformation (LOG(1 + count)) to each engagement factor to
 * dampen the impact of very high raw numbers.
 */
export const getUserFeed = (req, res) => {
  const { userId, limit = 10, page = 1 } = req.query;
  const offset = (page - 1) * limit;

  /**
   * Explanation:
   * - generic_score: A sum of engagement factors after applying a log transform to each count,
   *   minus a time decay.
   * - personalized_bonus: A fixed bonus for the relationship (e.g. following the post's author).
   * - personalized_score: The sum of the generic score and the bonus.
   *
   * Using LOG(1 + count) ensures that additional interactions have diminishing returns,
   * keeping the score in a bounded range.
   */
  const query = `
    SELECT 
      p.post_id,
      p.*,
      (
        (LOG(1 + COALESCE(l.like_count, 0)) * 1.5) +
        (LOG(1 + COALESCE(c.comment_count, 0)) * 2.0) +
        (LOG(1 + COALESCE(s.share_count, 0)) * 3.0) +
        (LOG(1 + COALESCE(b.bookmark_count, 0)) * 2.5) -
        (TIMESTAMPDIFF(HOUR, p.created_at, NOW()) * 0.1)
      ) AS generic_score,
      (
        CASE WHEN fl.follower_id IS NOT NULL THEN 4 ELSE 0 END
      ) AS personalized_bonus,
      (
        (LOG(1 + COALESCE(l.like_count, 0)) * 1.5) +
        (LOG(1 + COALESCE(c.comment_count, 0)) * 2.0) +
        (LOG(1 + COALESCE(s.share_count, 0)) * 3.0) +
        (LOG(1 + COALESCE(b.bookmark_count, 0)) * 2.5) -
        (TIMESTAMPDIFF(HOUR, p.created_at, NOW()) * 0.1) +
        (CASE WHEN fl.follower_id IS NOT NULL THEN 4 ELSE 0 END)
      ) AS personalized_score
    FROM Posts p
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
    -- Check if the current user follows the post's author:
    LEFT JOIN Followers fl ON fl.follower_id = ? AND p.user_id = fl.followee_id
    WHERE p.created_at >= NOW() - INTERVAL 7 DAY
    ORDER BY personalized_score DESC
    LIMIT ? OFFSET ?;
  `;

  db.query(
    query,
    [userId, parseInt(limit), parseInt(offset)],
    (err, results) => {
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
    }
  );
};
