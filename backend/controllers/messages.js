import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getAllMessages = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = `SELECT m.* , u.id AS userId, u.profilePic, u.username, u.name, u.email FROM messages AS m JOIN users AS u ON ((m.receivingUserId = u.id OR m.sendingUserId = u.id) AND NOT u.id = ?) WHERE m.receivingUserId = ? OR m.sendingUserId = ? ORDER BY m.timestamp DESC`;

    const values = [userInfo.id, userInfo.id, userInfo.id];

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
};

export const getMessagesFromUser = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = `SELECT m.* , u.id AS userId, u.profilePic, u.username, u.name, u.email FROM messages AS m JOIN users AS u ON ((m.receivingUserId = u.id OR m.sendingUserId = u.id) AND NOT u.id = ?) WHERE ((m.receivingUserId = ? AND m.sendingUserId = ?) OR (m.receivingUserId = ? AND m.sendingUserId = ?)) ORDER BY m.timestamp DESC`;

    const values = [
      userInfo.id,
      userInfo.id,
      req.params.userId,
      req.params.userId,
      userInfo.id,
    ];

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
};

export const getUserMessagesList = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = `WITH RankedMessages AS (
    SELECT
        id,
        receivingUserId,
        sendingUserId,
        data,
        timestamp,
        ROW_NUMBER() OVER (PARTITION BY
            CASE
                WHEN receivingUserId = ? THEN sendingUserId
                WHEN sendingUserId = ? THEN receivingUserId
            END
            ORDER BY timestamp DESC) AS RowNum
    FROM
        messages
    WHERE
        ? IN (receivingUserId, sendingUserId)
)
SELECT
    r.id,
    r.receivingUserId,
    r.sendingUserId,
    r.data,
    r.timestamp,
    u.username,
    u.name,
    u.profilePic,
    u.email,
    u.id AS userId
FROM
    RankedMessages AS r JOIN users AS u ON ((u.id = r.receivingUserId OR u.id = r.sendingUserId) AND NOT u.id = ?)
WHERE
    RowNum = 1
ORDER BY timestamp DESC;
`;

    const values = [userInfo.id, userInfo.id, userInfo.id, userInfo.id];

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
};

export const sendMessage = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "INSERT INTO messages (`sendingUserId`,`receivingUserId`,`data`, `timestamp`) VALUES (?)";
    const values = [
      userInfo.id,
      req.body.receivingId,
      req.body.data,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Message has been sent");
    });
  });
};
