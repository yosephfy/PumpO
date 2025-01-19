import { db } from "../connect.js";

// Create an Exercise
export const createExercise = (req, res) => {
  const {
    name,
    category,
    muscles_targeted,
    equipment_required,
    description,
    instructions,
    tags,
    video_url,
    image_url,
    created_by,
  } = req.body;

  const query = `
    INSERT INTO Exercises 
    (name, category, muscles_targeted, equipment_required, description, instructions, tags, video_url, image_url, created_by)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [
      name,
      category,
      JSON.stringify(muscles_targeted) || null,
      JSON.stringify(equipment_required) || null,
      description || null,
      instructions || null,
      JSON.stringify(tags) || null,
      video_url || null,
      image_url || null,
      created_by || null,
    ],
    (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(201).json("Exercise created successfully!");
    }
  );
};

// Get All Exercises
export const getAllExercises = (req, res) => {
  const { limit = 10, offset = 0 } = req.query;

  const query = `
    SELECT * FROM Exercises
    ORDER BY created_at DESC
    LIMIT ? OFFSET ?
  `;

  db.query(query, [parseInt(limit), parseInt(offset)], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

// Get Exercise by ID
export const getExerciseById = (req, res) => {
  const { exerciseId } = req.params;

  const query = `SELECT * FROM Exercises WHERE exercise_id = ?`;

  db.query(query, [exerciseId], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("Exercise not found!");
    return res.status(200).json(data[0]);
  });
};

// Search Exercises by Keyword
export const searchExercises = (req, res) => {
  const { keyword, limit = 10, offset = 0 } = req.query;

  const query = `
    SELECT * FROM Exercises
    WHERE name LIKE ? OR description LIKE ? OR JSON_CONTAINS(tags, JSON_ARRAY(?))
    ORDER BY created_at DESC
    LIMIT ? OFFSET ?
  `;

  db.query(
    query,
    [
      `%${keyword}%`,
      `%${keyword}%`,
      keyword,
      parseInt(limit),
      parseInt(offset),
    ],
    (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    }
  );
};

// Filter Exercises by Category
export const filterExercisesByCategory = (req, res) => {
  const { category, limit = 10, offset = 0 } = req.query;

  const query = `
    SELECT * FROM Exercises
    WHERE category = ?
    ORDER BY created_at DESC
    LIMIT ? OFFSET ?
  `;

  db.query(
    query,
    [category, parseInt(limit), parseInt(offset)],
    (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    }
  );
};

// Get Exercises by Muscle Group
export const getExercisesByMuscleGroup = (req, res) => {
  const { muscleGroup, limit = 10, offset = 0 } = req.query;

  const query = `
    SELECT * FROM Exercises
    WHERE JSON_CONTAINS(muscles_targeted, JSON_ARRAY(?))
    ORDER BY created_at DESC
    LIMIT ? OFFSET ?
  `;

  db.query(
    query,
    [muscleGroup, parseInt(limit), parseInt(offset)],
    (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    }
  );
};

// Get Exercises by Equipment
export const getExercisesByEquipment = (req, res) => {
  const { equipment, limit = 10, offset = 0 } = req.query;

  const query = `
    SELECT * FROM Exercises
    WHERE JSON_CONTAINS(equipment_required, JSON_ARRAY(?))
    ORDER BY created_at DESC
    LIMIT ? OFFSET ?
  `;

  db.query(
    query,
    [equipment, parseInt(limit), parseInt(offset)],
    (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    }
  );
};

// Update an Exercise
export const updateExercise = (req, res) => {
  const { exerciseId } = req.params;
  const {
    name,
    category,
    muscles_targeted,
    equipment_required,
    description,
    instructions,
    tags,
    video_url,
    image_url,
  } = req.body;

  const query = `
    UPDATE Exercises
    SET name = ?, category = ?, muscles_targeted = ?, equipment_required = ?, description = ?, 
        instructions = ?, tags = ?, video_url = ?, image_url = ?, updated_at = NOW()
    WHERE exercise_id = ?
  `;

  db.query(
    query,
    [
      name,
      category,
      JSON.stringify(muscles_targeted) || null,
      JSON.stringify(equipment_required) || null,
      description || null,
      instructions || null,
      JSON.stringify(tags) || null,
      video_url || null,
      image_url || null,
      exerciseId,
    ],
    (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.affectedRows === 0)
        return res.status(404).json("Exercise not found!");
      return res.status(200).json("Exercise updated successfully!");
    }
  );
};

// Delete an Exercise
export const deleteExercise = (req, res) => {
  const { exerciseId } = req.params;

  const query = `DELETE FROM Exercises WHERE exercise_id = ?`;

  db.query(query, [exerciseId], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.affectedRows === 0)
      return res.status(404).json("Exercise not found!");
    return res.status(200).json("Exercise deleted successfully!");
  });
};

// Get Popular Exercises
export const getPopularExercises = (req, res) => {
  const { limit = 10 } = req.query;

  const query = `
    SELECT e.*, COUNT(we.exercise_id) AS usage_count
    FROM Exercises e
    JOIN WorkoutExercises we ON e.exercise_id = we.exercise_id
    GROUP BY e.exercise_id
    ORDER BY usage_count DESC
    LIMIT ?
  `;

  db.query(query, [parseInt(limit)], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};
