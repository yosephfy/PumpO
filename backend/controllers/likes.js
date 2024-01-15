import jwt from "jsonwebtoken";
import moment from "moment";
import { db } from "../connect.js";

export const getLikesFromPost = (req, res) => {
  const q = `SELECT * FROM likes WHERE postId = ? AND elementType = "POST"`;

  db.query(q, [req.params.postId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const getLikesFromStory = (req, res) => {
  const q = `SELECT * FROM likes WHERE storyId = ? AND elementType = "STORY"`;

  db.query(q, [req.params.storyId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const getLikesFromComment = (req, res) => {
  const q = `SELECT * FROM likes WHERE commentId = ? AND elementType = "COMMENT"`;

  db.query(q, [req.params.commentId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const getNumLikesFromPost = (req, res) => {
  const q = `SELECT COUNT(id) AS count FROM likes WHERE postId = ?`;

  db.query(q, [req.params.postId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data.count);
  });
};

export const addLikeOnPost = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "INSERT INTO likes (`userId`, `elementType`, `postId`,`timestamp`) VALUES (?)";
    const values = [
      userInfo.id,
      "POST",
      req.body.postId,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Post has been liked.");
    });
  });
};

export const addLikeOnComment = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "INSERT INTO likes (`userId`, `elementType`, `commentId`,`timestamp`) VALUES (?)";
    const values = [
      userInfo.id,
      "COMMENT",
      req.body.commentId,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Comment has been liked.");
    });
  });
};

export const addLikeOnStory = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "INSERT INTO likes (`userId`, `elementType`, `storyId`,`timestamp`) VALUES (?)";
    const values = [
      userInfo.id,
      "STORY",
      req.body.postId,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Story has been liked.");
    });
  });
};

export const UnlikePost = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "DELETE FROM likes WHERE (userId = ? AND postId = ? AND elementType = 'POST')";
    console.log(`ID: ${userInfo.id}, POST: ${req.params.postId}`);
    db.query(q, [userInfo.id, req.params.postId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Post has been disliked");
    });
  });
};

export const UnlikeComment = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "DELETE FROM likes WHERE (userId = ? AND commentId = ? AND elementType = 'COMMENT')";
    console.log(`ID: ${userInfo.id}, POST: ${req.params.commentId}`);
    db.query(q, [userInfo.id, req.params.commentId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Comment has been disliked");
    });
  });
};

export const UnlikeStory = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "DELETE FROM likes WHERE (userId = ? AND storyId = ? AND elementType = 'STORY')";
    console.log(`ID: ${userInfo.id}, POST: ${req.params.storyId}`);
    db.query(q, [userInfo.id, req.params.storyId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Story has been disliked");
    });
  });
};
