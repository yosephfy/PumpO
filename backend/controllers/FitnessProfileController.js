// Table Structure for `FitnessProfile`:
// ----------------------------------------
// | profile_id          | INT AUTO_INCREMENT PRIMARY KEY |
// | user_id             | INT NOT NULL                   |
// | weight              | DECIMAL(5, 2)                 |
// | height              | DECIMAL(5, 2)                 |
// | body_fat_percentage | DECIMAL(5, 2)                 |
// | seasonal_status     | ENUM('Bulking', 'Cutting', 'Maintaining') DEFAULT 'Maintaining' |
// | created_at          | TIMESTAMP DEFAULT CURRENT_TIMESTAMP |
// | updated_at          | TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP |
// ----------------------------------------

import { db } from "../connect.js";

// Create a new fitness profile
export const createFitnessProfile = (req, res) => {
  const { user_id, weight, height, body_fat_percentage, seasonal_status } =
    req.body;

  const query = `
    INSERT INTO FitnessProfile (user_id, weight, height, body_fat_percentage, seasonal_status)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [user_id, weight, height, body_fat_percentage, seasonal_status],
    (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(201).json("Fitness profile created successfully!");
    }
  );
};

// Get a fitness profile by user ID
export const getFitnessProfileByUserId = (req, res) => {
  const { userId } = req.params;

  const query = `
    SELECT * FROM FitnessProfile
    WHERE user_id = ?
  `;

  db.query(query, userId, (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0)
      return res.status(404).json("Fitness profile not found.");
    return res.status(200).json(data[0]);
  });
};

// Update a fitness profile
export const updateFitnessProfile = (req, res) => {
  const { profileId } = req.params;
  const { weight, height, body_fat_percentage, seasonal_status } = req.body;

  const query = `
    UPDATE FitnessProfile
    SET weight = ?, height = ?, body_fat_percentage = ?, seasonal_status = ?, updated_at = NOW()
    WHERE profile_id = ?
  `;

  db.query(
    query,
    [weight, height, body_fat_percentage, seasonal_status, profileId],
    (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.affectedRows === 0)
        return res.status(404).json("Fitness profile not found.");
      return res.status(200).json("Fitness profile updated successfully!");
    }
  );
};

// Delete a fitness profile
export const deleteFitnessProfile = (req, res) => {
  const { profileId } = req.params;

  const query = `
    DELETE FROM FitnessProfile
    WHERE profile_id = ?
  `;

  db.query(query, [profileId], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.affectedRows === 0)
      return res.status(404).json("Fitness profile not found.");
    return res.status(200).json("Fitness profile deleted successfully!");
  });
};
