import express from "express";
const app = express();
const PORT = process.env.PORT || 8080;
import userRoutes from "./routes/users.js";
import likeRoutes from "./routes/likes.js";
import commentRoutes from "./routes/comments.js";
import postRoutes from "./routes/posts.js";
import authRoutes from "./routes/auth.js";
import cors from "cors";
import cookieParser from "cookie-parser";

/* app.get("/", (req, res) => {
  res.send("Hello, Fitness App!");
}); */

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/likes", likeRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

import Sequelize from "sequelize";
const sequelize = new Sequelize("pumpodatabase", "root", "foreveryoung", {
  host: "localhost",
  dialect: "mysql",
});

// Test the database connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();
