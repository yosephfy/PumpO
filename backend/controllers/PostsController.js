// Table Structure for `Posts`:
// ----------------------------------------
// | post_id          | INT AUTO_INCREMENT PRIMARY KEY |
// | user_id          | INT NOT NULL                  |
// | post_type        | ENUM('Photo', 'Video', 'Text', 'Workout') NOT NULL |
// | media_url        | VARCHAR(255) DEFAULT NULL     |
// | tagged_users     | JSON DEFAULT NULL             |
// | tagged_exercises | JSON DEFAULT NULL             |
// | description      | TEXT DEFAULT NULL             |
// | created_at       | TIMESTAMP DEFAULT CURRENT_TIMESTAMP |
// | updated_at       | TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP |
// ----------------------------------------

import { db } from "../connect.js";

// Create a new post
export const createPost = (req, res) => {
  const {
    user_id,
    post_type,
    media_url,
    tagged_users,
    tagged_exercises,
    description,
  } = req.body;

  const query = `
    INSERT INTO Posts (user_id, post_type, media_url, tagged_users, tagged_exercises, description)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [
      user_id,
      post_type,
      media_url || null,
      JSON.stringify(tagged_users) || null,
      JSON.stringify(tagged_exercises) || null,
      description || null,
    ],
    (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(201).json({
        post_id: data.insertId,
        message: "Post created successfully!",
      });
    }
  );
};

// Get a post by ID
export const getPostById = (req, res) => {
  const { postId } = req.params;

  const query = `
    SELECT * FROM Posts WHERE post_id = ?
  `;

  db.query(query, postId, (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("Post not found.");
    return res.status(200).json(data[0]);
  });
};

// Update a post
export const updatePost = (req, res) => {
  const { postId } = req.params;
  const { media_url, tagged_users, tagged_exercises, description } = req.body;

  const query = `
    UPDATE Posts
    SET media_url = ?, tagged_users = ?, tagged_exercises = ?, description = ?, updated_at = NOW()
    WHERE post_id = ?
  `;

  db.query(
    query,
    [
      media_url || null,
      JSON.stringify(tagged_users) || null,
      JSON.stringify(tagged_exercises) || null,
      description || null,
      postId,
    ],
    (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.affectedRows === 0)
        return res.status(404).json("Post not found.");
      return res.status(200).json("Post updated successfully!");
    }
  );
};

// Delete a post
export const deletePost = (req, res) => {
  const { postId } = req.params;

  const query = `
    DELETE FROM Posts WHERE post_id = ?
  `;

  db.query(query, [postId], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.affectedRows === 0) return res.status(404).json("Post not found.");
    return res.status(200).json("Post deleted successfully!");
  });
};

// Get ALL posts
export const getAllPosts = (req, res) => {
  const query = `SELECT * FROM Posts`;

  db.query(query, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

// Lazy load posts (paginated loading)
export const lazyLoadPosts = (req, res) => {
  const { userId, page = 1, limit = 10, postType = null } = req.query; // Default to page 1 with 10 posts per page

  const offset = (page - 1) * limit;

  const filtered = [
    { value: userId, name: "user_id" },
    { value: postType, name: "post_type" },
  ].filter((x) => x.value);

  let filteredQuery = filtered.map((x) => `${x.name} = ?`).join(" AND ");
  filteredQuery = filteredQuery.length > 0 ? "WHERE " + filteredQuery : "";

  let filteredParams = filtered.map((x) => x.value);

  const query = `
    SELECT * FROM Posts
    ${filteredQuery}
    ORDER BY created_at DESC
    LIMIT ? OFFSET ?
  `;

  const params = [...filteredParams, parseInt(limit), parseInt(offset)];

  db.query(query, params, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

// Count posts by a specific user
export const countPostsByUser = (req, res) => {
  const { userId } = req.params;

  const query = `
    SELECT COUNT(*) AS post_count
    FROM Posts
    WHERE user_id = ?
  `;

  db.query(query, [userId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data[0]);
  });
};

// Search Posts by Keyword
export const searchPosts = (req, res) => {
  const { keyword = "", limit = 10, page = 1 } = req.query;
  const offset = (page - 1) * limit;

  const query = `
    SELECT * FROM Posts
    WHERE description LIKE ? OR JSON_CONTAINS(tagged_users, JSON_ARRAY(?))
    ORDER BY created_at DESC
    LIMIT ? OFFSET ?
  `;

  const params = [`%${keyword}%`, keyword, parseInt(limit), parseInt(offset)];

  db.query(query, params, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

// Filter Posts by Post Type
export const filterPostsByType = (req, res) => {
  const { post_type, limit = 10, page = 1 } = req.query;
  const offset = (page - 1) * limit;

  const query = `
    SELECT * FROM Posts
    WHERE post_type = ?
    ORDER BY created_at DESC
    LIMIT ? OFFSET ?
  `;

  db.query(
    query,
    [post_type, parseInt(limit), parseInt(offset)],
    (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    }
  );
};

// Get Popular Posts
export const getPopularPosts = (req, res) => {
  const { time_frame = "30 DAYS", limit = 10, page = 1 } = req.query;
  const offset = (page - 1) * limit;

  const query = `
    SELECT p.*, 
           (SELECT COUNT(*) FROM Likes WHERE post_id = p.post_id) AS like_count,
           (SELECT COUNT(*) FROM Comments WHERE post_id = p.post_id) AS comment_count
    FROM Posts p
    WHERE created_at >= NOW() - INTERVAL ?
    ORDER BY (like_count + comment_count) DESC
    LIMIT ? OFFSET ?
  `;

  db.query(
    query,
    [time_frame, parseInt(limit), parseInt(offset)],
    (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    }
  );
};

// Get Posts with Tagged Exercises
export const getPostsWithTaggedExercises = (req, res) => {
  const { exercise_id, limit = 10, page = 1 } = req.query;
  const offset = (page - 1) * limit;

  const query = `
    SELECT * FROM Posts
    WHERE JSON_CONTAINS(tagged_exercises, JSON_ARRAY(?))
    ORDER BY created_at DESC
    LIMIT ? OFFSET ?
  `;

  db.query(
    query,
    [exercise_id, parseInt(limit), parseInt(offset)],
    (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    }
  );
};

// Get Posts with Tagged Users
export const getPostsWithTaggedUsers = (req, res) => {
  const { user_id, limit = 10, page = 1 } = req.query;
  const offset = (page - 1) * limit;

  const query = `
    SELECT * FROM Posts
    WHERE JSON_CONTAINS(tagged_users, JSON_ARRAY(?))
    ORDER BY created_at DESC
    LIMIT ? OFFSET ?
  `;

  db.query(query, [user_id, parseInt(limit), parseInt(offset)], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

// Get Posts by Date Range
export const getPostsByDateRange = (req, res) => {
  const { start_date, end_date, limit = 10, page = 1 } = req.query;
  const offset = (page - 1) * limit;

  const query = `
    SELECT * FROM Posts
    WHERE created_at BETWEEN ? AND ?
    ORDER BY created_at DESC
    LIMIT ? OFFSET ?
  `;

  db.query(
    query,
    [start_date, end_date, parseInt(limit), parseInt(offset)],
    (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    }
  );
};

// Get Top Tagged Users
export const getTopTaggedUsers = (req, res) => {
  const query = `
    SELECT JSON_UNQUOTE(JSON_EXTRACT(tagged_users, '$[*]')) AS user_id, COUNT(*) AS count
    FROM Posts
    WHERE tagged_users IS NOT NULL
    GROUP BY user_id
    ORDER BY count DESC
    LIMIT 10
  `;

  db.query(query, [], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};
