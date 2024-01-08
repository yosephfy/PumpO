import jwt from "jsonwebtoken";
import moment from "moment";
import { db } from "../connect.js";

export const getSettingsFromUserId = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = "SELECT * FROM settings WHERE userId = ?";

    db.query(q, [userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length == 0)
        return res.status(404).json("User Settings Not found");
      return res.status(200).json(data[0]);
    });
  });
};

export const getSettingsFromUserIdAndKey = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = "SELECT * FROM settings WHERE `userId` = ? AND `key` = ?";

    db.query(q, [userInfo.id, req.body.key], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length == 0)
        return res.status(404).json("User Settings Not found");
      return res.status(200).json(data[0]);
    });
  });
};

export const addSettings = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "INSERT INTO settings(`userId`, `key`, `value`, `timestamp`) VALUES (?)";
    const values = [
      userInfo.id,
      req.body.key,
      req.body.value,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
};

export const updateSettingByUserIdAndKey = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = "UPDATE settings SET `key` = ?, `value` = ? WHERE `userId` = ? ";

    db.query(q, [req.body.key, req.body.value, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.affectedRows > 0)
        return res.status(200).json("Setting has been upated");
      return res.status(403).json("Did not update setting");
    });
  });
};
