import jwt from "jsonwebtoken";
import moment from "moment";
import { db } from "../connect.js";

export const getUsers = (req, res) => {
  const q = "SELECT * FROM users";

  db.query(q, [], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.json(data);
  });
};

export const getUserById = (req, res) => {
  const userId = req.params.userId;
  const q = "SELECT * FROM users WHERE id = ?";

  db.query(q, [userId], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length == 0) return res.status(404).json("User Not found");
    const { password, ...info } = data[0];
    return res.json(info);
  });
};

export const getUserByUsername = (req, res) => {
  const username = req.params.username;
  const q = "SELECT * FROM users WHERE username = ?";

  db.query(q, [username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length == 0) return res.status(404).json("User Not found");

    const { password, ...info } = data[0];
    return res.json(info);
  });
};

export const getUserByEmail = (req, res) => {
  const email = req.params.email;
  const q = "SELECT * FROM users WHERE email = ?";

  db.query(q, [email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length == 0) return res.status(404).json("User Not found");

    const { password, ...info } = data[0];
    return res.json(info);
  });
};

export const updateUser = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "UPDATE users SET `name` = ?, `username` = ?, `email` = ?, `bio` = ? WHERE `id` = ? ";

    const value = [
      req.body.name,
      req.body.username,
      req.body.email,
      req.body.bio,
      userInfo.id,
    ];
    db.query(q, value, (err, data) => {
      if (err) res.status(500).json(err);
      if (data.affectedRows > 0) return res.json("Updated!");
      return res.status(403).json("You can update only your post!");
    });
  });
};

export const getUserFollowers = (req, res) => {
  const q = "SELECT * FROM relationships WHERE followedId = ?";

  db.query(q, [req.params.userId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const getUserFollowed = (req, res) => {
  const q = "SELECT * FROM relationships WHERE followerId = ?";

  db.query(q, [req.params.userId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const getUserFriendRequests = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) res.status(403).json("Token is not valid!");

    const q = `SELECT r.*, u.id AS userId, u.profilePic, u.name, u.username FROM friendrequests AS r JOIN users AS u ON (r.requestingId = u.id) WHERE requestedId = ? ORDER BY timestamp DESC`;

    const values = [req.params.requestedId];

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
};

export const followUser = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "INSERT INTO relationships (`followedId`,`followerId`) VALUES (?)";
    const values = [req.params.followedId, userInfo.id];

    db.query(q, [values], (err, data) => {
      if (err) res.status(500).json(err);
      return res.status(200).json("followed");
    });
  });
};

export const unfollowUser = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "DELETE FROM relationships WHERE `followerId`=? AND `followedId`=?";
    db.query(q, [userInfo.id, req.params.followedId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Unfollowed");
    });
  });
};

export const relationshipsAdd = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "INSERT INTO relationships (`followedId`,`followerId`) VALUES (?)";
    const values = [req.body.followedId, req.body.followerId];

    db.query(q, [values], (err, data) => {
      if (err) res.status(500).json(err);
      return res.status(200).json("followed");
    });
  });
};

export const relationshipsDelete = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "DELETE FROM relationships WHERE `followerId`=? AND `followedId`=?";
    db.query(q, [req.body.followerId, req.body.followedId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Unfollowed");
    });
  });
};

export const friendRequestAdd = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "INSERT INTO friendrequests (`requestingId`,`requestedId`,`timestamp`) VALUES (?)";
    const values = [
      req.body.requestingId,
      req.body.requestedId,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
    ];

    db.query(q, [values], (err, data) => {
      if (err) res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
};

export const friendRequestDelete = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "DELETE FROM friendrequests WHERE `requestedId`=? AND `requestingId`=?";
    const values = [req.body.requestedId, req.body.requestingId];
    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
};

export const getGymProfileByUserId = (req, res) => {
  const userId = req.params.userId;
  const q = "SELECT * FROM gymprofile WHERE userId = ?";

  db.query(q, [userId], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length == 0) return res.status(404).json("Profile Not found");
    return res.status(200).json(data[0]);
  });
};

export const updateGymProfile = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "UPDATE gymprofile SET `gymType`=?,`weightStatus`=?, `height`=?,`startingDate`=?,`birthYear`=?  WHERE userId=? ";

    const value = [
      req.body.gymType,
      req.body.weightStatus,
      req.body.height,
      req.body.startingDate,
      req.body.birthYear,
      userInfo.id,
    ];
    db.query(q, value, (err, data) => {
      if (err) res.status(500).json(err);
      if (data.affectedRows > 0) return res.json("Updated!");
      return res.status(403).json("You can update only your profile!");
    });
  });
};

export const addGymProfile = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "INSERT INTO gymprofile(`gymType`, `weightStatus`, `height`, `startingDate`, `birthYear`, `userId`) VALUES (?)";
    const values = [
      req.body.gymType,
      req.body.weightStatus,
      req.body.height,
      moment(Date.parse(req.body.startingDate)).format("YYYY-MM-DD HH:mm:ss"),
      moment(Date.parse(req.body.birthYear)).format("YYYY-MM-DD HH:mm:ss"),
      userInfo.id,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Gym profile has been created.");
    });
  });
};
