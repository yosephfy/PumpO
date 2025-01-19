// Table Structure for `Followers`:
// ----------------------------------------
// | follower_id  | INT NOT NULL         |
// | followee_id  | INT NOT NULL         |
// | followed_at  | TIMESTAMP DEFAULT CURRENT_TIMESTAMP |
// ----------------------------------------
import { db } from "../connect.js";

// Follow a user
export const followUser = (req, res) => {
  const { follower_id, followee_id } = req.body;

  if (follower_id === followee_id) {
    return res.status(400).json("You cannot follow yourself.");
  }

  const query = `INSERT INTO Followers (follower_id, followee_id) VALUES (?, ?)`;

  db.query(query, [follower_id, followee_id], (err, data) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        return res.status(400).json("You are already following this user.");
      }
      return res.status(500).json(err);
    }
    return res.status(201).json("Followed successfully!");
  });
};

// Unfollow a user
export const unfollowUser = (req, res) => {
  const { follower_id, followee_id } = req.body;

  const query = `DELETE FROM Followers WHERE follower_id = ? AND followee_id = ?`;

  db.query(query, [follower_id, followee_id], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.affectedRows === 0) {
      return res.status(404).json("You are not following this user.");
    }
    return res.status(200).json("Unfollowed successfully!");
  });
};

// Get followers of a user
export const getFollowers = (req, res) => {
  const { userId } = req.params;

  const query = `
    SELECT u.user_id, u.username, u.profile_picture
    FROM Followers f
    JOIN Users u ON f.follower_id = u.user_id
    WHERE f.followee_id = ?`;

  db.query(query, [userId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

// Get users a person is following
export const getFollowing = (req, res) => {
  const { userId } = req.params;

  const query = `
    SELECT u.user_id, u.username, u.profile_picture
    FROM Followers f
    JOIN Users u ON f.followee_id = u.user_id
    WHERE f.follower_id = ?`;

  db.query(query, [userId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

// Get follower and following counts for a user
export const getFollowerAndFollowingCounts = (req, res) => {
  const { userId } = req.params;

  const followerQuery = `
    SELECT COUNT(*) AS followers_count
    FROM Followers
    WHERE followee_id = ?`;

  const followingQuery = `
    SELECT COUNT(*) AS following_count
    FROM Followers
    WHERE follower_id = ?`;

  // Execute both queries
  db.query(followerQuery, [userId], (err, followerData) => {
    if (err) return res.status(500).json(err);

    db.query(followingQuery, [userId], (err, followingData) => {
      if (err) return res.status(500).json(err);

      return res.status(200).json({
        followers: followerData[0].followers_count,
        following: followingData[0].following_count,
      });
    });
  });
};

// Check if one user follows another
export const checkIfUserFollows = (req, res) => {
  const { follower_id, followee_id } = req.query;

  const query = `
    SELECT COUNT(*) AS is_following
    FROM Followers
    WHERE follower_id = ? AND followee_id = ?
  `;

  db.query(query, [follower_id, followee_id], (err, data) => {
    if (err) return res.status(500).json(err);

    const isFollowing = data[0].is_following > 0;
    return res.status(200).json({ is_following: isFollowing });
  });
};
