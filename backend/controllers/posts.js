import jwt from "jsonwebtoken";
import moment from "moment";
import { db } from "../connect.js";
import cloudinary from "../utils/cloudinary.js";

export const getPost = (req, res) => {
  const q = `SELECT p.*, u.username, u.profilePic FROM users AS u JOIN posts AS p ON (u.id = p.userId) WHERE p.id = ?`;

  db.query(q, [req.params.postId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data[0]);
  });
};

export const getUserPosts = (req, res) => {
  const q = `SELECT p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId) WHERE p.userId = ? ORDER BY p.createdAt DESC`;

  db.query(q, [req.params.userId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const addPost = (req, res) => {
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
        folder: "pumpo/posts",
      });
      imgUrl = uploadedResponse.url;
      console.log(uploadedResponse);
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
    ///
    const q =
      "INSERT INTO posts(`desc`, `img`, `createdAt`, `updatedAt`, `userId`) VALUES (?)";
    const values = [
      req.body.desc,
      imgUrl,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      userInfo.id,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Post has been created.");
    });
  });
};

export const deletePost = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = "DELETE FROM posts WHERE `id`=? AND `userId` = ?";

    db.query(q, [req.params.id, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.affectedRows > 0)
        return res.status(200).json("Post has been deleted.");
      return res.status(403).json("You can delete only your post");
    });
  });
};

export const uploadPost = async (req, res) => {
  let filestr = req.body.data.replace(/^"(.+(?="$))"$/, "$1");

  try {
    const uploadedResponse = await cloudinary.uploader.upload(filestr, {
      folder: "pumpo/posts",
    });
    console.log(uploadedResponse);
    return res.status(200).json("UPLOADED");
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};
