import jwt from "jsonwebtoken";
import { db } from "../connect.js";
import moment from "moment";

export const getCommentsFromPost = (req, res) => {
  const q = `SELECT c.*, u.username, u.name, u.id AS userId, u.profilePic, u.email FROM comments AS c JOIN users AS u ON (u.id = c.userId) WHERE postId = ? ORDER BY c.timestamp DESC`;

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

export const addComment = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = "INSERT INTO comments (`userId`,`postId`,`timestamp`) VALUES (?)";
    const values = [
      userInfo.id,
      req.body.postId,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Post has been commentd.");
    });
  });
};

export const deleteComment = (req, res) => {
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
