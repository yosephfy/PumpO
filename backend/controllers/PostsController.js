// Table Structure for `Posts`:
// ----------------------------------------
// | post_id          | INT AUTO_INCREMENT PRIMARY KEY |
// | user_id          | INT NOT NULL                  |
// | content          | JSON DEFAULT NULL             |
// | tagged_users     | JSON DEFAULT NULL             |
// | description      | TEXT DEFAULT NULL             |
// | created_at       | TIMESTAMP DEFAULT CURRENT_TIMESTAMP |
// | updated_at       | TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP |
// ----------------------------------------

import { db } from "../connect.js";
// Create a new post
export const createPost = (req, res) => {
  const { user_id, content, description, tagged_users } = req.body;

  // Step 1: Create a post with empty content
  const query = `
    INSERT INTO Posts (user_id, content, description, tagged_users)
    VALUES (?, ?, ?, ?)
  `;

  db.query(
    query,
    [
      user_id,
      JSON.stringify({ photos: [], videos: [], texts: [] }) || null, // Empty content
      description || null,
      JSON.stringify(tagged_users) || null,
    ],
    (err, data) => {
      if (err) return res.status(500).json(err);

      const postId = data.insertId;

      // Step 2: Handle content creation
      const videoEntries = [];
      const photoEntries = [];
      const textEntries = [];

      const videoPromises = (content?.videos || []).map((video) => {
        return new Promise((resolve, reject) => {
          const query = `
            INSERT INTO Videos (post_id, media_url, thumbnail_url, is_pulse)
            VALUES (?, ?, ?, ?)
          `;
          db.query(
            query,
            [
              postId,
              video.media_url,
              video.thumbnail_url,
              video.is_pulse || false,
            ],
            (err, result) => {
              if (err) reject(err);
              else {
                videoEntries.push({ id: result.insertId, order: video.order });
                resolve();
              }
            }
          );
        });
      });

      const photoPromises = (content?.photos || []).map((photo) => {
        return new Promise((resolve, reject) => {
          const query = `
            INSERT INTO Photos (post_id, media_url)
            VALUES (?, ?)
          `;
          db.query(query, [postId, photo.media_url], (err, result) => {
            if (err) reject(err);
            else {
              photoEntries.push({ id: result.insertId, order: photo.order });
              resolve();
            }
          });
        });
      });

      const textPromises = (content?.texts || []).map((text) => {
        return new Promise((resolve, reject) => {
          const query = `
            INSERT INTO Texts (post_id, content)
            VALUES (?, ?)
          `;
          db.query(query, [postId, text.content], (err, result) => {
            if (err) reject(err);
            else {
              textEntries.push({ id: result.insertId, order: text.order });
              resolve();
            }
          });
        });
      });

      Promise.all([...videoPromises, ...photoPromises, ...textPromises])
        .then(() => {
          // Step 3: Update the post with content IDs and orders
          const updatedContent = {
            photos: photoEntries,
            videos: videoEntries,
            texts: textEntries,
          };

          const updateQuery = `
            UPDATE Posts
            SET content = ?
            WHERE post_id = ?
          `;

          db.query(
            updateQuery,
            [JSON.stringify(updatedContent), postId],
            (err) => {
              if (err) return res.status(500).json(err);
              res.status(201).json({
                post_id: postId,
                message: "Post created successfully!",
              });
            }
          );
        })
        .catch((err) => res.status(500).json(err));
    }
  );
};

// Get a post by ID
export const getPostById = (req, res) => {
  const { postId } = req.params;

  const query = `
    SELECT * FROM Posts WHERE post_id = ?
  `;

  db.query(query, [postId], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("Post not found.");

    const post = data[0];

    // Fetch content details
    const contentPromises = [
      new Promise((resolve, reject) => {
        db.query(
          `SELECT * FROM Photos WHERE post_id = ?`,
          [postId],
          (err, photos) => {
            if (err) reject(err);
            else resolve(photos);
          }
        );
      }),
      new Promise((resolve, reject) => {
        db.query(
          `SELECT * FROM Videos WHERE post_id = ?`,
          [postId],
          (err, videos) => {
            if (err) reject(err);
            else resolve(videos);
          }
        );
      }),
      new Promise((resolve, reject) => {
        db.query(
          `SELECT * FROM Texts WHERE post_id = ?`,
          [postId],
          (err, texts) => {
            if (err) reject(err);
            else resolve(texts);
          }
        );
      }),
    ];

    Promise.all(contentPromises)
      .then(([photos, videos, texts]) => {
        post.content = {
          photos,
          videos,
          texts,
        };
        res.status(200).json(post);
      })
      .catch((err) => res.status(500).json(err));
  });
};

// Update a post
export const updatePost = (req, res) => {
  const { postId } = req.params;
  const { content, description, tagged_users } = req.body;

  // Step 1: Update post metadata
  const query = `
    UPDATE Posts
    SET description = ?, tagged_users = ?, updated_at = NOW()
    WHERE post_id = ?
  `;

  db.query(
    query,
    [description || null, JSON.stringify(tagged_users) || null, postId],
    (err, data) => {
      if (err) return res.status(500).json(err);

      // Step 2: Handle content updates
      const videoEntries = [];
      const photoEntries = [];
      const textEntries = [];

      const videoUpdatePromises = (content?.videos || []).map((video) => {
        return new Promise((resolve, reject) => {
          const query = `
            INSERT INTO Videos (video_id, post_id, media_url, thumbnail_url, is_pulse)
            VALUES (?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE
            media_url = VALUES(media_url),
            is_pulse = VALUES(is_pulse)
          `;
          db.query(
            query,
            [
              video.id,
              postId,
              video.media_url,
              video.thumbnail_url,
              video.is_pulse || false,
            ],
            (err, result) => {
              if (err) reject(err);
              else {
                videoEntries.push({
                  id: video.id || result.insertId,
                  order: video.order,
                });
                resolve();
              }
            }
          );
        });
      });

      const photoUpdatePromises = (content?.photos || []).map((photo) => {
        return new Promise((resolve, reject) => {
          const query = `
            INSERT INTO Photos (photo_id, post_id, media_url)
            VALUES (?, ?, ?)
            ON DUPLICATE KEY UPDATE
            media_url = VALUES(media_url)
          `;
          db.query(
            query,
            [photo.id, postId, photo.media_url],
            (err, result) => {
              if (err) reject(err);
              else {
                photoEntries.push({
                  id: photo.id || result.insertId,
                  order: photo.order,
                });
                resolve();
              }
            }
          );
        });
      });

      const textUpdatePromises = (content?.texts || []).map((text) => {
        return new Promise((resolve, reject) => {
          const query = `
            INSERT INTO Texts (text_id, post_id, content)
            VALUES (?, ?, ?)
            ON DUPLICATE KEY UPDATE
            content = VALUES(content)
          `;
          db.query(query, [text.id, postId, text.content], (err, result) => {
            if (err) reject(err);
            else {
              textEntries.push({
                id: text.id || result.insertId,
                order: text.order,
              });
              resolve();
            }
          });
        });
      });

      Promise.all([
        ...videoUpdatePromises,
        ...photoUpdatePromises,
        ...textUpdatePromises,
      ])
        .then(() => {
          // Step 3: Update the post with new content IDs and orders
          const updatedContent = {
            photos: photoEntries,
            videos: videoEntries,
            texts: textEntries,
          };

          const updateContentQuery = `
            UPDATE Posts
            SET content = ?
            WHERE post_id = ?
          `;

          db.query(
            updateContentQuery,
            [JSON.stringify(updatedContent), postId],
            (err) => {
              if (err) return res.status(500).json(err);
              res.status(200).json("Post updated successfully!");
            }
          );
        })
        .catch((err) => res.status(500).json(err));
    }
  );
};

// Delete a post
export const deletePost = (req, res) => {
  const { postId } = req.params;

  const query = `DELETE FROM Posts WHERE post_id = ?`;

  db.query(query, [postId], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.affectedRows === 0) return res.status(404).json("Post not found.");

    const deleteContentQueries = [
      `DELETE FROM Photos WHERE post_id = ?`,
      `DELETE FROM Videos WHERE post_id = ?`,
      `DELETE FROM Texts WHERE post_id = ?`,
    ];

    const deletePromises = deleteContentQueries.map((deleteQuery) => {
      return new Promise((resolve, reject) => {
        db.query(deleteQuery, [postId], (err) => {
          if (err) reject(err);
          else resolve();
        });
      });
    });

    Promise.all(deletePromises)
      .then(() => {
        res.status(200).json("Post deleted successfully!");
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  });
};

// Get ALL posts
export const getAllPosts = (req, res) => {
  const query = `SELECT * FROM Posts`;

  db.query(query, (err, data) => {
    if (err) return res.status(500).json(err);
    res.status(200).json(data);
  });
};
// Lazy load posts (paginated loading)
export const lazyLoadPosts = (req, res) => {
  const { userId, page = 1, limit = 10, tagged_user } = req.query; // Default to page 1 with 10 posts per page

  const offset = (page - 1) * limit;

  const filtered = [
    { value: userId, condition: "user_id = ?" },
    {
      value: tagged_user,
      condition: "JSON_CONTAINS(tagged_users, JSON_ARRAY(?))",
    },
  ].filter((x) => x.value);

  let filteredQuery = filtered.map((x) => `${x.condition}`).join(" AND ");
  filteredQuery = filteredQuery.length > 0 ? "WHERE " + filteredQuery : "";

  let filteredParams = filtered.map((x) => x.value);

  const query = `
    SELECT * FROM Posts
    ${filteredQuery}
    ORDER BY created_at DESC
    LIMIT ? OFFSET ?
  `;

  const params = [...filteredParams, parseInt(limit), parseInt(offset)];

  db.query(query, params, (err, posts) => {
    if (err) {
      console.error("Error fetching posts:", err); // Log detailed error information
      return res
        .status(500)
        .json({ message: "Internal server error", error: err.message });
    }

    const fetchContentPromises = posts.map((post) => {
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
            ); // Log specific post error
            reject(err);
          });
      });
    });

    Promise.all(fetchContentPromises)
      .then((postsWithContent) => {
        res.status(200).json(postsWithContent);
      })
      .catch((err) => {
        console.error("Error processing posts content:", err); // Log detailed processing error
        res.status(500).json({
          message: "Error processing post content",
          error: err.message,
        });
      });
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
    res.status(200).json(data[0]);
  });
};

// Search Posts by Keyword
export const searchPosts = (req, res) => {
  const { keyword = "", limit = 10, page = 1 } = req.query;
  const offset = (page - 1) * limit;

  const query = `
    SELECT * FROM Posts
    WHERE description LIKE ?
    ORDER BY created_at DESC
    LIMIT ? OFFSET ?
  `;

  db.query(
    query,
    [`%${keyword}%`, parseInt(limit), parseInt(offset)],
    (err, data) => {
      if (err) return res.status(500).json(err);
      res.status(200).json(data);
    }
  );
};

// Filter Posts by Date Range
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
      res.status(200).json(data);
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

// Get Pulse Feed
export const getPulseFeed = (req, res) => {
  const { userId, limit = 10, page = 1 } = req.query;
  const offset = (page - 1) * limit;

  const filtered = [{ value: userId, condition: "p.user_id = ?" }].filter(
    (x) => x.value
  );

  let filteredQuery = filtered.map((x) => `${x.condition}`).join(" AND ");
  filteredQuery = filteredQuery.length > 0 ? "AND " + filteredQuery : "";

  let filteredParams = filtered.map((x) => x.value);
  const query = `
    SELECT v.video_id, v.media_url, v.thumbnail_url, p.*
    FROM Videos v
    JOIN Posts p ON v.post_id = p.post_id ${filteredQuery}
    WHERE v.is_pulse = TRUE
    ORDER BY v.created_at DESC
    LIMIT ? OFFSET ?
  `;

  db.query(
    query,
    [...filteredParams, parseInt(limit), parseInt(offset)],
    (err, data) => {
      if (err) return res.status(500).json(err);
      res.status(200).json(data);
    }
  );
};
