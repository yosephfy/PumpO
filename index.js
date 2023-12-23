const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("Hello, Fitness App!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(
  "pumpodatabase",
  "root",
  "foreveryoung",
  {
    host: "localhost",
    dialect: "mysql",
  }
);

// Test the database connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();
