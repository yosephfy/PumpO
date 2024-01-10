import cript from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "../connect.js";

export const register = (req, res) => {
  const q = "SELECT * FROM users WHERE username = ?";

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("User already exist");

    const salt = cript.genSaltSync(10);
    const hashedPassword = cript.hashSync(req.body.password, salt);

    const q =
      "INSERT INTO users (`username`, `name`, `email`, `password`) VALUE (?)";

    const obj = {
      username: req.body.username,
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    };
    db.query(
      q,
      [[req.body.username, req.body.name, req.body.email, hashedPassword]],
      (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(obj);
      }
    );
  });
};

export const login = (req, res) => {
  const q = "SELECT * FROM users WHERE username = ?";

  console.log("clicked");
  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("Username not found");

    const checkPassword = cript.compareSync(
      req.body.password,
      data[0].password
    );

    if (!checkPassword) {
      console.log("Wrong Password");
      return res.status(400).json("Wrong Password");
    }

    const token = jwt.sign({ id: data[0].id }, "secretkey");
    return res
      .cookie("accessToken", token, { httpOnly: true })
      .status(200)
      .json(data[0]);
  });
};

export const logout = (req, res) => {
  res
    .clearCookie("accessToken", { secure: true, sameSite: "none" })
    .status(200)
    .json("Logout successful");
};
