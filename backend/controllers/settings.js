import jwt from "jsonwebtoken";
import moment from "moment";
import { db } from "../connect.js";

export const getSettingsFromUserId = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = "SELECT * FROM settings WHERE `userId` = ? AND `name` IN (?)";
    var values = JSON.parse(req.query.names);
    db.query(q, [userInfo.id, values], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length == 0)
        return res.status(404).json("User Settings Not found");
      return res.status(200).json(data);
    });
  });
};

export const getSettingsFromUserIdAndName = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = "SELECT * FROM settings WHERE `userId` = ? AND `name` = ?";

    db.query(q, [userInfo.id, req.params.val], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length === 0) return res.status(200).json(-1);
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
      "INSERT INTO settings(`userId`, `name`, `value`, `timestamp`) VALUES (?)";
    const values = [
      userInfo.id,
      req.body.name,
      req.body.value,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
};

export const updateSettingByUserIdAndName = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    const q1 = "SELECT * FROM settings WHERE `userId` = ? AND `name` = ?";

    db.query(q1, [userInfo.id, req.body.name], (err, data) => {
      let qadd = "";
      let values = [];
      if (err) return res.status(500).json(err);
      if (data.length == 0) {
        values = [
          [
            userInfo.id,
            req.body.name,
            req.body.value,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          ],
        ];
        qadd =
          "INSERT INTO settings(`userId`, `name`, `value`, `timestamp`) VALUES (?)";
      } else {
        values = [req.body.value, req.body.name, userInfo.id];
        qadd =
          "UPDATE settings SET `value` = ? WHERE `name` = ? AND`userId` = ? ";
      }

      db.query(qadd, values, (err, data1) => {
        if (err) return res.status(500).json(err);
        if (data1.affectedRows > 0)
          return res.status(200).json("Setting has been upated");
        return res.status(403).json("Did not update setting");
      });
    });
  });
};
