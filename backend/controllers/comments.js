import jwt from "jsonwebtoken";
import moment from "moment";
import { db } from "../connect.js";

export const getCommentsFromPost = (req, res) => {
  const q = `SELECT c.*, u.username, u.name, u.id AS userId, u.profilePic, u.email FROM comments AS c JOIN users AS u ON (u.id = c.userId) WHERE postId = ? ORDER BY c.timestamp DESC`;

  db.query(q, [req.params.postId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const getCommentsFromStory = (req, res) => {
  const q = `SELECT c.*, u.username, u.name, u.id AS userId, u.profilePic, u.email FROM comments AS c JOIN users AS u ON (u.id = c.userId) WHERE storyId = ? ORDER BY c.timestamp DESC`;

  db.query(q, [req.params.storyId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const getCommentsFromComment = (req, res) => {
  const q = `SELECT c.*, u.username, u.name, u.id AS userId, u.profilePic, u.email FROM comments AS c JOIN users AS u ON (u.id = c.userId) WHERE commentId = ? ORDER BY c.timestamp DESC`;

  db.query(q, [req.params.postId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const getNumCommentsFromPost = (req, res) => {
  const q = `SELECT COUNT(id) AS count FROM comments WHERE postId = ?`;

  db.query(q, [req.params.postId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data.count);
  });
};

export const addCommentOnPost = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "INSERT INTO comments (`userId`, `elementType`, `postId`,`desc`,`timestamp`) VALUES (?)";
    const values = [
      userInfo.id,
      "POST",
      req.body.postId,
      req.body.desc,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Post has been commentd.");
    });
  });
};

export const addCommentOnStory = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "INSERT INTO comments (`userId`, `elementType`, `storyId`,`desc`,`timestamp`) VALUES (?)";
    const values = [
      userInfo.id,
      "STORY",
      req.body.storyId,
      req.body.desc,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Story has been commentd.");
    });
  });
};

export const addCommentOnComment = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "INSERT INTO comments (`userId`, `elementType`, `commentId`,`desc`,`timestamp`) VALUES (?)";
    const values = [
      userInfo.id,
      "COMMENT",
      req.body.commentId,
      req.body.desc,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Comment has been commentd.");
    });
  });
};

export const deleteCommentFromPost = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = "DELETE FROM comments WHERE (userId = ? AND postId = ?)";
    console.log(`ID: ${userInfo.id}, POST: ${req.params.postId}`);
    db.query(q, [userInfo.id, req.params.postId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Post has been discommentd");
    });
  });
};

export const deleteCommentFromComment = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = "DELETE FROM comments WHERE (userId = ? AND commentId = ?)";
    console.log(`ID: ${userInfo.id}, POST: ${req.params.commentId}`);
    db.query(q, [userInfo.id, req.params.commentId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Post has been discommentd");
    });
  });
};

export const deleteCommentFromStory = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = "DELETE FROM comments WHERE (userId = ? AND storyId = ?)";
    console.log(`ID: ${userInfo.id}, POST: ${req.params.storyId}`);
    db.query(q, [userInfo.id, req.params.storyId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Post has been discommentd");
    });
  });
};
