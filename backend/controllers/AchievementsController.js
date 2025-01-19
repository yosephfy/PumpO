// Table Structure for `Achievements` and `UserAchievements`:
// -----------------------------------------------------------
// Achievements Table
// | achievement_id   | INT AUTO_INCREMENT PRIMARY KEY |
// | name             | VARCHAR(100) NOT NULL         |
// | description      | TEXT NOT NULL                 |
// | criteria         | JSON NOT NULL                 |
// | category         | ENUM(...) NOT NULL            |
// | reward_points    | INT DEFAULT 0                 |
// | created_at       | TIMESTAMP DEFAULT CURRENT_TIMESTAMP |
// | updated_at       | TIMESTAMP DEFAULT CURRENT_TIMESTAMP |
// -----------------------------------------------------------
// UserAchievements Table
// | user_achievement_id | INT AUTO_INCREMENT PRIMARY KEY |
// | user_id             | INT NOT NULL                  |
// | achievement_id      | INT NOT NULL                  |
// | date_awarded        | TIMESTAMP DEFAULT CURRENT_TIMESTAMP |
// | progress            | JSON                          |
// | status              | ENUM('In Progress', 'Completed') DEFAULT 'In Progress' |
// -----------------------------------------------------------

import { db } from "../connect.js";

// Create a new achievement
export const createAchievement = (req, res) => {
  const { name, description, criteria, category, reward_points } = req.body;

  const query = `
    INSERT INTO Achievements (name, description, criteria, category, reward_points)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [name, description, JSON.stringify(criteria), category, reward_points],
    (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(201).json("Achievement created successfully!");
    }
  );
};

// Get all achievements
export const getAchievements = (req, res) => {
  const query = "SELECT * FROM Achievements";

  db.query(query, [], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

// Assign an achievement to a user
export const assignAchievementToUser = (req, res) => {
  const { user_id, achievement_id } = req.body;

  const query = `
    INSERT INTO UserAchievements (user_id, achievement_id, progress, status)
    VALUES (?, ?, ?, ?)
  `;

  db.query(
    query,
    [user_id, achievement_id, JSON.stringify({}), "In Progress"],
    (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(201).json("Achievement assigned to user successfully!");
    }
  );
};

// Get achievements for a user
export const getUserAchievements = (req, res) => {
  const { userId } = req.params;

  const query = `
    SELECT ua.*, a.name, a.description, a.reward_points, a.category
    FROM UserAchievements ua
    JOIN Achievements a ON ua.achievement_id = a.achievement_id
    WHERE ua.user_id = ?
  `;

  db.query(query, [userId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

// Update user achievement progress
export const updateAchievementProgress = (req, res) => {
  const { userAchievementId } = req.params;
  const { progress, status } = req.body;

  const query = `
    UPDATE UserAchievements
    SET progress = ?, status = ?, date_awarded = CASE WHEN ? = 'Completed' THEN NOW() ELSE date_awarded END
    WHERE user_achievement_id = ?
  `;

  db.query(
    query,
    [JSON.stringify(progress), status, status, userAchievementId],
    (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.affectedRows === 0)
        return res.status(404).json("User achievement not found.");
      return res
        .status(200)
        .json("User achievement progress updated successfully!");
    }
  );
};
