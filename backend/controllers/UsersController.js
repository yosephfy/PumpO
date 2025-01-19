// Table Structure for `Users`:
// ----------------------------------------
// | user_id       | INT AUTO_INCREMENT   |
// | username      | VARCHAR(50) NOT NULL |
// | email         | VARCHAR(100) NOT NULL|
// | account_type  | ENUM(...) NOT NULL   |
// | bio           | TEXT                 |
// | profile_pic   | VARCHAR(225)         |
// | created_at    | TIMESTAMP DEFAULT CURRENT_TIMESTAMP |
// | updated_at    | TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP |

// Table Structure for `UserAuth`:
// ----------------------------------------
// | auth_id       | INT AUTO_INCREMENT   |
// | user_id       | INT NOT NULL         |
// | password_hash | VARCHAR(255) NOT NULL|
// | last_login    | TIMESTAMP DEFAULT NULL|
// | failed_login_attempts | INT DEFAULT 0|
// | account_locked | BOOLEAN DEFAULT FALSE|
// | created_at    | TIMESTAMP DEFAULT CURRENT_TIMESTAMP |
// | updated_at    | TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP |

import { db } from "../connect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register a new user
export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  const checkQuery = "SELECT * FROM users WHERE email = ?";
  db.query(checkQuery, [email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length > 0) return res.status(400).json("Email already exists!");

    bcrypt.hash(password, 10, (hashErr, hashedPassword) => {
      if (hashErr) return res.status(500).json(hashErr);

      const userQuery = `INSERT INTO users (username, email) VALUES (?, ?)`;
      db.query(userQuery, [username, email], (insertErr, result) => {
        if (insertErr) return res.status(500).json(insertErr);

        const authQuery = `INSERT INTO userauth (user_id, password_hash) VALUES (?, ?)`;
        db.query(authQuery, [result.insertId, hashedPassword], (authErr) => {
          if (authErr) return res.status(500).json(authErr);
          console.log("User Registered");
          return res.status(201).json("User registered successfully!");
        });
      });
    });
  });
};

// Login a user
// Login a user
export const loginUser = (req, res) => {
  const { email, password } = req.body;

  const query = `
    SELECT u.user_id, u.username, u.account_type, u.profile_picture, a.password_hash 
    FROM users u 
    INNER JOIN userauth a ON u.user_id = a.user_id 
    WHERE u.email = ?`;

  db.query(query, [email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User not found!");

    const user = data[0];

    bcrypt.compare(password, user.password_hash, (compareErr, isMatch) => {
      if (compareErr) return res.status(500).json(compareErr);
      if (!isMatch) return res.status(401).json("Invalid credentials!");

      const token = jwt.sign(
        {
          user_id: user.user_id,
          username: user.username,
          account_type: user.account_type,
          profile_picture: user.profile_picture,
        },
        "your_jwt_secret",
        { expiresIn: "1h" }
      );

      const updateQuery = `UPDATE userauth SET last_login = NOW() WHERE user_id = ?`;
      db.query(updateQuery, [user.user_id], (updateErr) => {
        if (updateErr) return res.status(500).json(updateErr);

        // Remove sensitive information before returning user
        delete user.password_hash;

        return res.json({
          token,
          user,
          message: "Login successful!",
        });
      });
    });
  });
};

export const searchUsers = (req, res) => {
  const { query = "", limit = 10, page = 1 } = req.query;
  const offset = (page - 1) * limit;

  const searchQuery = `
    SELECT * FROM users 
    WHERE username LIKE ? OR email LIKE ?
    ORDER BY username ASC
    LIMIT ? OFFSET ?
  `;

  const searchParams = [
    `%${query}%`,
    `%${query}%`,
    parseInt(limit),
    parseInt(offset),
  ];

  db.query(searchQuery, searchParams, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

// Fetch all users
export const getUsers = (req, res) => {
  const query =
    "SELECT user_id, username, email, account_type, profile_picture FROM users";

  db.query(query, [], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.json(data);
  });
};

// Fetch a single user by ID
export const getUserById = (req, res) => {
  const { userId } = req.params;

  const query =
    "SELECT user_id, username, email, account_type, profile_picture, bio FROM users WHERE user_id = ?";
  db.query(query, [userId], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User not found!");

    return res.json(data[0]);
  });
};

// Update user details
export const updateUser = (req, res) => {
  const { userId } = req.params;
  const { username, email, account_type, profile_picture, bio } = req.body;

  const query = `
    UPDATE users 
    SET username = ?, email = ?, account_type = ?, profile_picture = ?, bio = ?, updated_at = NOW()
    WHERE user_id = ?`;

  db.query(
    query,
    [username, email, account_type, profile_picture, bio, userId],
    (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.affectedRows === 0)
        return res.status(404).json("User not found!");

      return res.json("User updated successfully!");
    }
  );
};

// Delete a user
export const deleteUser = (req, res) => {
  const { userId } = req.params;

  const query = "DELETE FROM users WHERE user_id = ?";
  db.query(query, [userId], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.affectedRows === 0) return res.status(404).json("User not found!");

    return res.json("User deleted successfully!");
  });
};
