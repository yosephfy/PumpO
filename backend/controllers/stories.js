import jwt from "jsonwebtoken";
import moment from "moment";
import { db } from "../connect.js";
import cloudinary from "../utils/cloudinary.js";

export const getStory = (req, res) => {
  const q = `SELECT s.*, u.username, u.profilePic FROM users AS u JOIN stories AS s ON (u.id = s.userId) WHERE s.id = ?`;

  db.query(q, [req.params.storyId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data[0]);
  });
};

export const getUserStories = (req, res) => {
  const q = `SELECT DISTINCT s.*, u.id AS userId, username, profilePic FROM stories AS s JOIN users AS u ON (u.id = s.userId) WHERE s.userId = ? AND s.public = "true" ORDER BY s.timestamp DESC`;

  db.query(q, [req.params.userId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const getFollowedStories = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  /*  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

  }); */
  const q = `SELECT DISTINCT s.*, u.username, u.profilePic FROM stories AS s JOIN users AS u ON (u.id = s.userId)
  LEFT JOIN relationships AS r ON (s.userId = r.followedId) WHERE (r.followerId= ? ) AND s.public = "true"
  ORDER BY s.timestamp DESC`;

  const values = [req.params.userId];

  db.query(q, values, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const addStory = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", async (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    ///
    let filestr = req.body.img.replace(/^"(.+(?="$))"$/, "$1");
    let imgUrl =
      "https://blogs.oregonstate.edu/mulliganhr/wp-content/themes/koji/assets/images/default-fallback-image.png";

    try {
      const uploadedResponse = await cloudinary.uploader.upload(filestr, {
        folder: "pumpo/stories",
      });
      imgUrl = uploadedResponse.url;
      console.log(uploadedResponse);
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
    ///
    const q =
      "INSERT INTO stories(`data`, `duration`, `timestamp`, `userId`, `public`) VALUES (?)";
    const values = [
      imgUrl,
      req.body.duration ? req.body.duration : 5,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      userInfo.id,
      "true",
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Story has been created.");
    });
  });
};

export const deletePost = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = "DELETE FROM stories WHERE `id`=? AND `userId` = ?";

    db.query(q, [req.params.id, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.affectedRows > 0)
        return res.status(200).json("Story has been deleted.");
      return res.status(403).json("You can delete only your Story");
    });
  });
};
