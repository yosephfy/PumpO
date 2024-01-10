import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import Sequelize from "sequelize";
import authRoutes from "./routes/auth.js";
import commentRoutes from "./routes/comments.js";
import feedRoutes from "./routes/feed.js";
import likeRoutes from "./routes/likes.js";
import messagesRoutes from "./routes/messages.js";
import postRoutes from "./routes/posts.js";
import storiesRoutes from "./routes/stories.js";
import userRoutes from "./routes/users.js";
import settingRoutes from "./routes/settings.js";
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
const corsConfig = {
  credentials: true,
  origin: true,
};
app.use(cors(corsConfig));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/feed", feedRoutes);
app.use("/api/stories", storiesRoutes);
app.use("/api/messages", messagesRoutes);
app.use("/api/settings", settingRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

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
