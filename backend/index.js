import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import Sequelize from "sequelize";
import achievementsRoutes from "./routes/AchievementsRouter.js";
import authRoutes from "./routes/auth.js";
import commentRoutes from "./routes/comments.js";
import feedRoutes from "./routes/feed.js";
import fitnessProfileRoutes from "./routes/FitnessProfileRouter.js";
import followersRoutes from "./routes/FollowersRouter.js";
import interactionsRoutes from "./routes/InteractionsRouter.js";
import likeRoutes from "./routes/likes.js";
import messagesRoutes from "./routes/messages.js";
import postRoutes from "./routes/posts.js";
import postsRoutes from "./routes/PostsRouter.js";
import settingRoutes from "./routes/settings.js";
import storiesRoutes from "./routes/stories.js";
import userRoutes from "./routes/users.js";
import exerciseRoutes from "./routes/ExercisesRouter.js";
import workoutsRoutes from "./routes/WorkoutsRouter.js";
import settingRouter from "./routes/SettingsRouter.js";
import feedRouter from "./routes/FeedRouter.js";
import exploreRouter from "./routes/ExploreRouter.js";

/////
import messagesRouter from "./routes/MessagesRouter.js";
import userRouter from "./routes/UserRouter.js";
/////

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
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

/////////////////////////////////////
//* New Implementation *//
/////////////////////////////////////
app.use("/app/users", userRouter);
app.use("/app/followers", followersRoutes);
app.use("/app/interactions", interactionsRoutes);
app.use("/app/fitness-profiles", fitnessProfileRoutes);
app.use("/app/achievements", achievementsRoutes);
app.use("/app/posts", postsRoutes);
app.use("/app/messages", messagesRouter);
app.use("/app/exercises", exerciseRoutes);
app.use("/app/workouts", workoutsRoutes);
app.use("/app/settings", settingRouter);
app.use("/app/feed", feedRouter);
app.use("/app/explore", exploreRouter);
/////////////////////////////////////

app.listen(8080, () => {
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
    console.log(
      `Connected to the database at time: ${new Date().toTimeString()}`
    );
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();
