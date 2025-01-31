// Controller for managing user settings
import { db } from "../connect.js";

// Get all settings with user overrides
export const getUserSettings = (req, res) => {
  const { userId } = req.params;

  const query = `
    SELECT sd.category, sd.setting_key, 
           COALESCE(us.value, sd.default_value) AS value
    FROM SettingsDefaults sd
    LEFT JOIN UserSettings us 
      ON sd.setting_key = us.setting_key AND us.user_id = ?
    ORDER BY sd.category;
  `;

  db.query(query, [userId], (err, data) => {
    if (err) return res.status(500).json(err);
    res.status(200).json(data);
  });
};

// Get settings by category
export const getSettingsByCategory = (req, res) => {
  const { userId, category } = req.params;

  const query = `
    SELECT sd.setting_key, COALESCE(us.value, sd.default_value) AS value
    FROM SettingsDefaults sd
    LEFT JOIN UserSettings us 
      ON sd.setting_key = us.setting_key AND us.user_id = ?
    WHERE sd.category = ?;
  `;

  db.query(query, [userId, category], (err, data) => {
    if (err) return res.status(500).json(err);
    res.status(200).json(data);
  });
};

// Get a setting by its key
export const getSettingByKey = (req, res) => {
  const { userId, settingKey } = req.params;

  const query = `
    SELECT COALESCE(us.value, sd.default_value) AS value
    FROM SettingsDefaults sd
    LEFT JOIN UserSettings us 
      ON sd.setting_key = us.setting_key AND us.user_id = ?
    WHERE sd.setting_key = ?;
  `;

  db.query(query, [userId, settingKey], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0)
      return res.status(404).json({ message: "Setting not found." });
    res.status(200).json(data[0].value);
  });
};

// Update or create a user setting
export const updateUserSetting = (req, res) => {
  const { userId, settingKey } = req.params;
  const { value } = req.body;
  console.log(value);
  const query = `
    INSERT INTO UserSettings (user_id, setting_key, value, updated_at)
    VALUES (?, ?, ?, NOW())
    ON DUPLICATE KEY UPDATE value = VALUES(value), updated_at = NOW();
  `;

  db.query(
    query,
    [userId, settingKey, JSON.stringify({ value: value })],
    (err, data) => {
      if (err) return res.status(500).json(err);
      res.status(200).json({ message: "Setting updated successfully." });
    }
  );
};

// Reset a setting to default
export const resetUserSetting = (req, res) => {
  const { userId, settingKey } = req.params;

  const query = `DELETE FROM UserSettings WHERE user_id = ? AND setting_key = ?;`;

  db.query(query, [userId, settingKey], (err, data) => {
    if (err) return res.status(500).json(err);
    res.status(200).json({ message: "Setting reset to default." });
  });
};
