import { db } from "../connect.js";
import { fetchIncludedMedia } from "./PostsController.js";

/**
 * GET /explore/trending?category=...
 * Fetch trending content by category (posts, workouts, plans)
 */
export const getTrendingContent = (req, res) => {
  const { category = "media" } = req.query;
  let query = "";

  if (category === "media") {
    query = `
      SELECT p.*, 
        (COALESCE(l.like_count, 0) * 1.5) +
        (COALESCE(c.comment_count, 0) * 2.0) +
        (COALESCE(s.share_count, 0) * 3.0) +
        (COALESCE(b.bookmark_count, 0) * 2.5) AS trending_score
      FROM Posts p
      LEFT JOIN (SELECT post_id, COUNT(*) AS like_count FROM Likes GROUP BY post_id) l ON p.post_id = l.post_id
      LEFT JOIN (SELECT post_id, COUNT(*) AS comment_count FROM Comments GROUP BY post_id) c ON p.post_id = c.post_id
      LEFT JOIN (SELECT post_id, COUNT(*) AS share_count FROM Shares GROUP BY post_id) s ON p.post_id = s.post_id
      LEFT JOIN (SELECT post_id, COUNT(*) AS bookmark_count FROM Bookmarks GROUP BY post_id) b ON p.post_id = b.post_id
      ORDER BY trending_score DESC
      LIMIT 20;
    `;
  } else if (category === "workouts") {
    query = "SELECT * FROM Workouts ORDER BY created_at DESC LIMIT 20;";
  } else if (category === "plans") {
    query = "SELECT * FROM workouts ORDER BY created_at DESC LIMIT 20;";
  } else {
    return res.status(400).json({ message: "Invalid category specified" });
  }

  db.query(query, async (err, results) => {
    if (err)
      return res.status(500).json({
        message: "Error fetching trending content",
        error: err.message,
      });

    const mediaIncluded = await fetchIncludedMedia(results, res);
    res.status(200).json(mediaIncluded);
  });
};

/**
 * GET /explore/people
 * Fetch suggested people based on interactions and follow recommendations
 */
export const getSuggestedUsers = (req, res) => {
  const { userId } = req.query;
  const query = `
    SELECT 
      u.*, 
      COUNT(DISTINCT mf.followee_id) AS mutual_friends_count,
      GROUP_CONCAT(DISTINCT mu.username ORDER BY mu.username ASC) AS mutual_friends,
      (SELECT COUNT(*) FROM Followers WHERE followee_id = u.user_id) AS follower_count
    FROM Users u
    LEFT JOIN Followers f ON u.user_id = f.followee_id
    LEFT JOIN Followers mf ON mf.followee_id = u.user_id AND mf.follower_id IN 
      (SELECT followee_id FROM Followers WHERE follower_id = ?)
    LEFT JOIN Users mu ON mf.follower_id = mu.user_id
    WHERE u.user_id NOT IN (SELECT followee_id FROM Followers WHERE follower_id = ?)
    AND u.user_id != ?
    GROUP BY u.user_id
    ORDER BY mutual_friends_count DESC
    LIMIT 20;
  `;

  db.query(query, [userId, userId, userId], (err, results) => {
    if (err)
      return res.status(500).json({
        message: "Error fetching suggested users",
        error: err.message,
      });
    res.status(200).json(results);
  });
};

/**
 * GET /explore/search?query=...&limit=10&page=1
 * Search users, workouts, plans, and posts with pagination, returning structured results.
 * @param {string} query - The search term
 * @param {number} limit - Number of results per category per page
 * @param {number} page - Page number
 */
export const searchExplore = (req, res) => {
  const { query, limit = 10, page = 1 } = req.query;
  const offset = (page - 1) * limit;
  const searchQuery = `%${query}%`;

  const queries = {
    users: "SELECT * FROM Users WHERE username LIKE ? LIMIT ? OFFSET ?",
    workouts: "SELECT * FROM Workouts WHERE name LIKE ? LIMIT ? OFFSET ?",
    plans: "SELECT * FROM Workouts WHERE name LIKE ? LIMIT ? OFFSET ?",
    posts: "SELECT * FROM Posts WHERE description LIKE ? LIMIT ? OFFSET ?",
  };

  const params = {
    users: [searchQuery, parseInt(limit), parseInt(offset)],
    workouts: [searchQuery, parseInt(limit), parseInt(offset)],
    plans: [searchQuery, parseInt(limit), parseInt(offset)],
    posts: [searchQuery, parseInt(limit), parseInt(offset)],
  };

  const results = { users: [], workouts: [], plans: [], posts: [] };

  const promises = Object.keys(queries).map((category) => {
    return new Promise((resolve, reject) => {
      db.query(queries[category], params[category], (err, data) => {
        if (err) reject(err);
        else {
          results[category] = data;
          resolve();
        }
      });
    });
  });

  Promise.all(promises)
    .then(() => res.status(200).json(results))
    .catch((err) =>
      res
        .status(500)
        .json({ message: "Error performing search", error: err.message })
    );
};
