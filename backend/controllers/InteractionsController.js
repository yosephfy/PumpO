import { db } from "../connect.js";

// --------------------- COMMENTS ---------------------

// Add a comment or reply (for posts or other comments)
export const addComment = (req, res) => {
  const { post_id, parent_comment_id, user_id, content } = req.body;

  const insertQuery = `
    INSERT INTO Comments (post_id, parent_comment_id, user_id, content)
    VALUES (?, ?, ?, ?)
  `;

  db.query(
    insertQuery,
    [post_id || null, parent_comment_id || null, user_id, content],
    (err, result) => {
      if (err) return res.status(500).json(err);

      const selectQuery = `SELECT * FROM Comments WHERE comment_id = LAST_INSERT_ID()`;
      db.query(selectQuery, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(201).json(data[0]); // Assuming 'id' is the primary key
      });
    }
  );
};

// Get all comments and replies for a specific post
export const GetAllComments = (req, res) => {
  const query = `
    SELECT * FROM Comments
  `;

  db.query(query, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

// Get all comments and replies for a specific post
export const getCommentsByPost = (req, res) => {
  const { postId } = req.params;

  const query = `
    SELECT c.*, u.username, u.profile_picture
    FROM Comments c
    JOIN Users u ON c.user_id = u.user_id
    WHERE c.post_id = ?
    ORDER BY c.created_at DESC
  `;

  db.query(query, [postId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

// Remove a comment
export const removeComment = (req, res) => {
  const { commentId } = req.params;

  const query = `
    DELETE FROM Comments WHERE comment_id = ?
  `;

  db.query(query, [commentId], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.affectedRows === 0)
      return res.status(404).json("Comment not found.");
    return res.status(200).json("Comment removed successfully!");
  });
};

// Get replies for a specific comment
export const getRepliesByComment = (req, res) => {
  const { commentId } = req.params;

  const query = `
    SELECT c.*, u.username, u.profile_picture
    FROM Comments c
    JOIN Users u ON c.user_id = u.user_id
    WHERE c.parent_comment_id = ?
    ORDER BY c.created_at ASC
  `;

  db.query(query, [commentId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};
// Get a hierarchical tree of comments and replies for a post
export const getCommentTreeByPost = (req, res) => {
  const { postId } = req.params;

  const query = `
    SELECT c.*, u.username, u.profile_picture
    FROM Comments c
    JOIN Users u ON c.user_id = u.user_id
    WHERE c.post_id = ?
    ORDER BY c.created_at DESC
  `;

  db.query(query, [postId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

// --------------------- LIKES ---------------------

// Add a like to a post or comment
export const addLike = (req, res) => {
  const { post_id, comment_id, user_id } = req.body;

  const query = `
    INSERT INTO Likes (post_id, comment_id, user_id)
    VALUES (?, ?, ?)
  `;

  db.query(
    query,
    [post_id || null, comment_id || null, user_id],
    (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(201).json("Like added successfully!");
    }
  );
};

// Get the number of likes for a post
export const getLikesByPost = (req, res) => {
  const { postId } = req.params;

  const query = `
    SELECT COUNT(*) AS likes
    FROM Likes
    WHERE post_id = ?
  `;

  db.query(query, [postId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data[0]);
  });
};

// Get the number of likes for a comment
export const getLikesByComment = (req, res) => {
  const { commentId } = req.params;

  const query = `
    SELECT COUNT(*) AS likes
    FROM Likes
    WHERE comment_id = ?
  `;

  db.query(query, [commentId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data[0]);
  });
};

// Remove a like from a post or comment
export const removeLike = (req, res) => {
  const { likeId } = req.params;

  const query = `
    DELETE FROM Likes WHERE like_id = ?
  `;

  db.query(query, [likeId], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.affectedRows === 0) return res.status(404).json("Like not found.");
    return res.status(200).json("Like removed successfully!");
  });
};

// Get all posts liked by a user
export const getLikedPostsByUser = (req, res) => {
  const { user_id, limit = 10, page = 1 } = req.query;
  const offset = (page - 1) * limit;

  const query = `
    WITH RankedPosts AS (
      SELECT p.*, ROW_NUMBER() OVER (PARTITION BY p.post_id ORDER BY p.created_at DESC) AS row_num
      FROM Likes l
      INNER JOIN Posts p ON l.post_id = p.post_id
      WHERE l.user_id = ?
    )
    SELECT *
    FROM RankedPosts
    WHERE row_num = 1
    ORDER BY created_at DESC
    LIMIT ? OFFSET ?
  `;

  db.query(
    query,
    [user_id, parseInt(limit), parseInt(offset)],
    (err, posts) => {
      if (err) return res.status(500).json(err);

      const fetchContentPromises = posts.map((post) => {
        return new Promise((resolve, reject) => {
          const contentPromises = [
            new Promise((resolve, reject) => {
              db.query(
                `SELECT * FROM Photos WHERE post_id = ?`,
                [post.post_id],
                (err, photos) => {
                  if (err) reject(err);
                  else resolve(photos);
                }
              );
            }),
            new Promise((resolve, reject) => {
              db.query(
                `SELECT * FROM Videos WHERE post_id = ?`,
                [post.post_id],
                (err, videos) => {
                  if (err) reject(err);
                  else resolve(videos);
                }
              );
            }),
            new Promise((resolve, reject) => {
              db.query(
                `SELECT * FROM Texts WHERE post_id = ?`,
                [post.post_id],
                (err, texts) => {
                  if (err) reject(err);
                  else resolve(texts);
                }
              );
            }),
          ];

          Promise.all(contentPromises)
            .then(([photos, videos, texts]) => {
              post.content = { photos, videos, texts };
              resolve(post);
            })
            .catch((err) => reject(err));
        });
      });

      Promise.all(fetchContentPromises)
        .then((postsWithContent) => res.status(200).json(postsWithContent))
        .catch((err) => res.status(500).json(err));
    }
  );
};

// Get all comments liked by a user
export const getLikedCommentsByUser = (req, res) => {
  const { user_id, limit = 10, offset = 0 } = req.query;

  const query = `
    SELECT c.* 
    FROM Likes l
    INNER JOIN Comments c ON l.comment_id = c.comment_id
    WHERE l.user_id = ?
    ORDER BY created_at DESC
    LIMIT ? OFFSET ?
  `;

  db.query(query, [user_id, parseInt(limit), parseInt(offset)], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

// Check if a user liked a specific post
export const checkIfUserLikedPost = (req, res) => {
  const { userId, postId } = req.query;

  const query = `
    SELECT like_id
    FROM Likes
    WHERE user_id = ? AND post_id = ?
  `;

  db.query(query, [userId, postId], (err, data) => {
    if (err) return res.status(500).json(err);

    const isLiked = data.length > 0;
    const likeId = isLiked ? data[0].like_id : null;

    return res.status(200).json({ is_liked: isLiked, like_id: likeId });
  });
};

// Check if a user liked a specific comment
export const checkIfUserLikedComment = (req, res) => {
  const { userId, commentId } = req.query;

  const query = `
    SELECT like_id
    FROM Likes
    WHERE user_id = ? AND comment_id = ?
  `;

  db.query(query, [userId, commentId], (err, data) => {
    if (err) return res.status(500).json(err);

    const isLiked = data.length > 0;
    const likeId = isLiked ? data[0].like_id : null;

    return res.status(200).json({ is_liked: isLiked, like_id: likeId });
  });
};
// --------------------- SHARES ---------------------

// Share a post
export const sharePost = (req, res) => {
  const { post_id, user_id } = req.body;

  const query = `
    INSERT INTO Shares (post_id, user_id)
    VALUES (?, ?)
  `;

  db.query(query, [post_id, user_id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(201).json("Post shared successfully!");
  });
};

// Get the number of shares for a specific post
export const getSharesByPost = (req, res) => {
  const { postId } = req.params;

  const query = `
    SELECT COUNT(*) AS shares
    FROM Shares
    WHERE post_id = ?
  `;

  db.query(query, [postId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data[0].shares);
  });
};

// Get all shares made by a user
export const getSharesByUser = (req, res) => {
  const { userId } = req.params;

  const query = `
    SELECT s.*, p.*
    FROM Shares s
    JOIN Posts p ON s.post_id = p.post_id
    WHERE s.user_id = ?
  `;

  db.query(query, [userId], (err, shares) => {
    if (err) return res.status(500).json(err);

    const fetchContentPromises = shares.map((post) => {
      return new Promise((resolve, reject) => {
        const contentPromises = [
          new Promise((resolve, reject) => {
            db.query(
              `SELECT * FROM Photos WHERE post_id = ?`,
              [post.post_id],
              (err, photos) => {
                if (err) reject(err);
                else resolve(photos);
              }
            );
          }),
          new Promise((resolve, reject) => {
            db.query(
              `SELECT * FROM Videos WHERE post_id = ?`,
              [post.post_id],
              (err, videos) => {
                if (err) reject(err);
                else resolve(videos);
              }
            );
          }),
          new Promise((resolve, reject) => {
            db.query(
              `SELECT * FROM Texts WHERE post_id = ?`,
              [post.post_id],
              (err, texts) => {
                if (err) reject(err);
                else resolve(texts);
              }
            );
          }),
        ];

        Promise.all(contentPromises)
          .then(([photos, videos, texts]) => {
            post.content = { photos, videos, texts };
            resolve(post);
          })
          .catch((err) => reject(err));
      });
    });

    Promise.all(fetchContentPromises)
      .then((sharesWithContent) => res.status(200).json(sharesWithContent))
      .catch((err) => res.status(500).json(err));
  });
};

// Check if a user bookmarked a specific post
export const checkIfUserSharedPost = (req, res) => {
  const { userId, postId } = req.query;

  const query = `
    SELECT share_id
    FROM Shares
    WHERE user_id = ? AND post_id = ?
  `;

  db.query(query, [userId, postId], (err, data) => {
    if (err) return res.status(500).json(err);

    const isShared = data.length > 0;
    const shareId = isShared ? data[0].share_id : null;

    return res.status(200).json({ is_shared: isShared, share_id: shareId });
  });
};

// --------------------- BOOKMARKS ---------------------

// Bookmark a post
export const addBookmark = (req, res) => {
  const { post_id, user_id } = req.body;

  const query = `
    INSERT INTO Bookmarks (post_id, user_id)
    VALUES (?, ?)
  `;

  db.query(query, [post_id, user_id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(201).json("Post bookmarked successfully!");
  });
};

// Get all bookmarks for a specific user
export const getBookmarksByUser = (req, res) => {
  const { userId } = req.params;

  const query = `
    SELECT b.*, p.*
    FROM Bookmarks b
    JOIN Posts p ON b.post_id = p.post_id
    WHERE b.user_id = ?
  `;

  db.query(query, [userId], (err, bookmarks) => {
    if (err) return res.status(500).json(err);

    const fetchContentPromises = bookmarks.map((post) => {
      return new Promise((resolve, reject) => {
        const contentPromises = [
          new Promise((resolve, reject) => {
            db.query(
              `SELECT * FROM Photos WHERE post_id = ?`,
              [post.post_id],
              (err, photos) => {
                if (err) reject(err);
                else resolve(photos);
              }
            );
          }),
          new Promise((resolve, reject) => {
            db.query(
              `SELECT * FROM Videos WHERE post_id = ?`,
              [post.post_id],
              (err, videos) => {
                if (err) reject(err);
                else resolve(videos);
              }
            );
          }),
          new Promise((resolve, reject) => {
            db.query(
              `SELECT * FROM Texts WHERE post_id = ?`,
              [post.post_id],
              (err, texts) => {
                if (err) reject(err);
                else resolve(texts);
              }
            );
          }),
        ];

        Promise.all(contentPromises)
          .then(([photos, videos, texts]) => {
            post.content = { photos, videos, texts };
            resolve(post);
          })
          .catch((err) => reject(err));
      });
    });

    Promise.all(fetchContentPromises)
      .then((bookmarksWithContent) =>
        res.status(200).json(bookmarksWithContent)
      )
      .catch((err) => res.status(500).json(err));
  });
};

// Remove a bookmark
export const removeBookmark = (req, res) => {
  const { bookmarkId } = req.params;

  const query = `
    DELETE FROM Bookmarks WHERE bookmark_id = ?
  `;

  db.query(query, [bookmarkId], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.affectedRows === 0)
      return res.status(404).json("Bookmark not found.");
    return res.status(200).json("Bookmark removed successfully!");
  });
};

// Check if a user bookmarked a specific post
export const checkIfUserBookmarkedPost = (req, res) => {
  const { userId, postId } = req.query;

  const query = `
    SELECT bookmark_id
    FROM Bookmarks
    WHERE user_id = ? AND post_id = ?
  `;

  db.query(query, [userId, postId], (err, data) => {
    if (err) return res.status(500).json(err);

    const isBookmarked = data.length > 0;
    const bookmarkId = isBookmarked ? data[0].bookmark_id : null;

    return res
      .status(200)
      .json({ is_bookmarked: isBookmarked, bookmark_id: bookmarkId });
  });
};

// --------------------- SUMMARY ---------------------

// Get interaction summary for a post (comments, likes, shares, bookmarks)
export const getInteractionSummaryByPost = (req, res) => {
  const { postId } = req.params;

  const query = `
    SELECT
      (SELECT COUNT(*) FROM Comments WHERE post_id = ?) AS comment_count,
      (SELECT COUNT(*) FROM Likes WHERE post_id = ?) AS like_count,
      (SELECT COUNT(*) FROM Shares WHERE post_id = ?) AS share_count,
      (SELECT COUNT(*) FROM Bookmarks WHERE post_id = ?) AS bookmark_count
  `;

  db.query(query, [postId, postId, postId, postId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data[0]);
  });
};

// Get interaction summary for a user (likes, shares, bookmarks)
export const getInteractionSummaryByUser = (req, res) => {
  const { userId } = req.params;

  const query = `
    SELECT
      (SELECT COUNT(*) FROM Likes WHERE user_id = ?) AS like_count,
      (SELECT COUNT(*) FROM Shares WHERE user_id = ?) AS share_count,
      (SELECT COUNT(*) FROM Bookmarks WHERE user_id = ?) AS bookmark_count
  `;

  db.query(query, [userId, userId, userId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data[0]);
  });
};
