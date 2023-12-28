import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getNewFeed = (req, res) => {
  const q = `SELECT p.*, u.username, u.profilePic FROM posts AS p JOIN users AS u ON (p.userId = u.id) ORDER BY createdAt DESC`;

  db.query(q, [], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const getFollowedFeed = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = `SELECT p.*, u.username, u.profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId)
    LEFT JOIN relationships AS r ON (p.userId = r.followedId) WHERE r.followerId= ? OR p.userId =?
    ORDER BY p.createdAt DESC`;

    const values = [userInfo.id, userInfo.id];

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
};


