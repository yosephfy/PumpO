import { db } from "../connect.js";

// ------------------ Workouts Controller ------------------

// 1. Create a Workout Plan
export const createWorkoutPlan = (req, res) => {
  const { name, description, created_by, duration_minutes, tags, image_url } =
    req.body;

  const query = `
    INSERT INTO Workouts (name, description, created_by, duration_minutes, tags, image_url)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [
      name,
      description,
      created_by || null,
      duration_minutes || null,
      JSON.stringify(tags) || null,
      image_url || null,
    ],
    (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(201).json({ id: data.insertId });
    }
  );
};

// 2. Get All Workout Plans
export const getAllWorkoutPlans = (req, res) => {
  const { limit = 10, offset = 0 } = req.query;

  const query = `
    SELECT * FROM Workouts
    ORDER BY created_at DESC
    LIMIT ? OFFSET ?
  `;

  db.query(query, [parseInt(limit), parseInt(offset)], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

// 3. Get Workout Plan by ID
export const getWorkoutPlanById = (req, res) => {
  const { workoutId } = req.params;

  const query = `SELECT * FROM Workouts WHERE workout_id = ?`;

  db.query(query, [workoutId], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0)
      return res.status(404).json("Workout plan not found!");
    return res.status(200).json(data[0]);
  });
};

// 4. Search Workout Plans by Keyword
export const searchWorkoutPlans = (req, res) => {
  const { keyword, limit = 10, offset = 0 } = req.query;

  const query = `
    SELECT * FROM Workouts
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

// 5. Get Workout Plans Created by User
export const getWorkoutPlansByUser = (req, res) => {
  const { userId, limit = 10, page = 1 } = req.query;
  const offset = (page - 1) * limit;
  const query = `
    SELECT * FROM Workouts
    WHERE created_by = ?
    ORDER BY created_at DESC
    LIMIT ? OFFSET ?
  `;

  db.query(query, [userId, parseInt(limit), parseInt(offset)], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

// 6. Filter Workout Plans by Duration
export const filterWorkoutPlansByDuration = (req, res) => {
  const { min_duration, max_duration, limit = 10, offset = 0 } = req.query;

  const query = `
    SELECT * FROM Workouts
    WHERE duration_minutes BETWEEN ? AND ?
    ORDER BY created_at DESC
    LIMIT ? OFFSET ?
  `;

  db.query(
    query,
    [
      parseInt(min_duration),
      parseInt(max_duration),
      parseInt(limit),
      parseInt(offset),
    ],
    (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    }
  );
};

// 7. Update a Workout Plan
export const updateWorkoutPlan = (req, res) => {
  const { workoutId } = req.params;
  const { name, description, duration_minutes, tags, image_url } = req.body;

  const query = `
    UPDATE Workouts
    SET name = ?, description = ?, duration_minutes = ?, tags = ?, image_url = ?, updated_at = NOW()
    WHERE workout_id = ?
  `;

  db.query(
    query,
    [
      name,
      description,
      duration_minutes || null,
      JSON.stringify(tags) || null,
      image_url || null,
      workoutId,
    ],
    (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.affectedRows === 0)
        return res.status(404).json("Workout plan not found!");
      return res.status(200).json("Workout plan updated successfully!");
    }
  );
};

// 8. Delete a Workout Plan
export const deleteWorkoutPlan = (req, res) => {
  const { workoutId } = req.params;

  const query = `DELETE FROM Workouts WHERE workout_id = ?`;

  db.query(query, [workoutId], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.affectedRows === 0)
      return res.status(404).json("Workout plan not found!");
    return res.status(200).json("Workout plan deleted successfully!");
  });
};

// 9. Duplicate a Workout Plan
export const duplicateWorkoutPlan = (req, res) => {
  const { workoutId } = req.params;
  const { userId } = req.body;

  // Step 1: Get the original workout plan
  const query = `SELECT * FROM Workouts WHERE workout_id = ?`;

  db.query(query, [workoutId], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0)
      return res.status(404).json("Workout plan not found!");

    const originalWorkout = data[0];

    // Step 2: Create a new workout plan
    const insertQuery = `
      INSERT INTO Workouts (name, description, created_by, duration_minutes, tags, image_url)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
      insertQuery,
      [
        `${originalWorkout.name} (Copy)`,
        originalWorkout.description,
        userId || originalWorkout.created_by,
        originalWorkout.duration_minutes,
        originalWorkout.tags,
        originalWorkout.image_url,
      ],
      (insertErr, insertData) => {
        if (insertErr) return res.status(500).json(insertErr);
        return res.status(201).json({
          message: "Workout plan duplicated successfully!",
          new_workout_id: insertData.insertId,
        });
      }
    );
  });
};

// 10. Get Featured Workout Plans
export const getFeaturedWorkoutPlans = (req, res) => {
  const { limit = 10, offset = 0 } = req.query;

  const query = `
    SELECT * FROM Workouts
    WHERE created_by IS NULL OR tags LIKE '%featured%'
    ORDER BY created_at DESC
    LIMIT ? OFFSET ?
  `;

  db.query(query, [parseInt(limit), parseInt(offset)], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

// 11. Get Workout Plans by Tags
export const getWorkoutPlansByTags = (req, res) => {
  const { tags, limit = 10, offset = 0 } = req.query;

  const query = `
    SELECT * FROM Workouts
    WHERE JSON_CONTAINS(tags, JSON_ARRAY(?))
    ORDER BY created_at DESC
    LIMIT ? OFFSET ?
  `;

  db.query(query, [tags, parseInt(limit), parseInt(offset)], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

// 12. Get Recent Workout Plans
export const getRecentWorkoutPlans = (req, res) => {
  const { limit = 10 } = req.query;

  const query = `
    SELECT * FROM Workouts
    ORDER BY created_at DESC
    LIMIT ?
  `;

  db.query(query, [parseInt(limit)], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};
// 1. Add Exercise to Workout Plan
export const addExerciseToWorkoutPlan = (req, res) => {
  const {
    workout_id,
    exercise_id,
    sets,
    repetitions,
    rest_seconds,
    order_index,
  } = req.body;

  const query = `
    INSERT INTO WorkoutExercises (workout_id, exercise_id, sets, repetitions, rest_seconds, order_index)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [
      workout_id,
      exercise_id,
      sets || null,
      repetitions || null,
      rest_seconds || null,
      order_index || null,
    ],
    (err, data) => {
      if (err) return res.status(500).json(err);
      return res
        .status(201)
        .json("Exercise added to workout plan successfully!");
    }
  );
};

// 2. Get All Exercises in a Workout Plan
export const getAllExercisesInWorkoutPlan = (req, res) => {
  const { workoutId } = req.params;

  const query = `
    SELECT we.*, e.*
    FROM WorkoutExercises we
    JOIN Exercises e ON we.exercise_id = e.exercise_id
    WHERE we.workout_id = ?
    ORDER BY we.order_index ASC
  `;

  db.query(query, [workoutId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

// 3. Update Exercise Details in a Workout Plan
export const updateExerciseInWorkoutPlan = (req, res) => {
  const { workout_id, exercise_id } = req.params;
  const { sets, repetitions, rest_seconds, order_index } = req.body;

  const query = `
    UPDATE WorkoutExercises
    SET sets = ?, repetitions = ?, rest_seconds = ?, order_index = ?
    WHERE workout_id = ? AND exercise_id = ?
  `;

  db.query(
    query,
    [
      sets || null,
      repetitions || null,
      rest_seconds || null,
      order_index || null,
      workout_id,
      exercise_id,
    ],
    (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.affectedRows === 0)
        return res.status(404).json("Exercise not found in the workout plan!");
      return res.status(200).json("Exercise updated successfully!");
    }
  );
};

// 4. Remove Exercise from Workout Plan
export const removeExerciseFromWorkoutPlan = (req, res) => {
  const { workout_id, exercise_id } = req.params;

  const query = `
    DELETE FROM WorkoutExercises
    WHERE workout_id = ? AND exercise_id = ?
  `;

  db.query(query, [workout_id, exercise_id], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.affectedRows === 0)
      return res.status(404).json("Exercise not found in the workout plan!");
    return res.status(200).json("Exercise removed successfully!");
  });
};

// 5. Reorder Exercises in a Workout Plan
export const reorderExercisesInWorkoutPlan = (req, res) => {
  const { workout_id } = req.params;
  const { exercise_orders } = req.body; // Array of { exercise_id, order_index }

  const queries = exercise_orders.map((exercise) => {
    return new Promise((resolve, reject) => {
      const query = `
        UPDATE WorkoutExercises
        SET order_index = ?
        WHERE workout_id = ? AND exercise_id = ?
      `;
      db.query(
        query,
        [exercise.order_index, workout_id, exercise.exercise_id],
        (err, data) => {
          if (err) reject(err);
          else resolve(data);
        }
      );
    });
  });

  Promise.all(queries)
    .then(() => res.status(200).json("Exercises reordered successfully!"))
    .catch((err) => res.status(500).json(err));
};

// 6. Bulk Add Exercises to Workout Plan
export const bulkAddExercisesToWorkoutPlan = (req, res) => {
  const { workout_id, exercises } = req.body; // Array of { exercise_id, sets, repetitions, rest_seconds, order_index }

  const values = exercises.map((exercise) => [
    workout_id,
    exercise.exercise_id,
    exercise.sets || null,
    exercise.repetitions || null,
    exercise.rest_seconds || null,
    exercise.order_index || null,
  ]);

  const query = `
    INSERT INTO WorkoutExercises (workout_id, exercise_id, sets, repetitions, rest_seconds, order_index)
    VALUES ?
  `;

  db.query(query, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    return res
      .status(201)
      .json("Exercises added to workout plan successfully!");
  });
};

// 7. Get Total Workout Duration
export const getTotalWorkoutDuration = (req, res) => {
  const { workoutId } = req.params;

  const query = `
    SELECT SUM(we.rest_seconds + (e.duration_minutes * 60)) AS total_duration_seconds
    FROM WorkoutExercises we
    JOIN Exercises e ON we.exercise_id = e.exercise_id
    WHERE we.workout_id = ?
  `;

  db.query(query, [workoutId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json({
      total_duration_seconds: data[0]?.total_duration_seconds || 0,
    });
  });
};

// 8. Check if Exercise Exists in a Workout Plan
export const checkIfExerciseExistsInWorkoutPlan = (req, res) => {
  const { workout_id, exercise_id } = req.params;

  const query = `
    SELECT COUNT(*) AS exists
    FROM WorkoutExercises
    WHERE workout_id = ? AND exercise_id = ?
  `;

  db.query(query, [workout_id, exercise_id], (err, data) => {
    if (err) return res.status(500).json(err);

    const exists = data[0].exists > 0;
    return res.status(200).json({ exists });
  });
};
