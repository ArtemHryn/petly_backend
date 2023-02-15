const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const { errorHandler } = require("./helper/apiHelper");

const authRouter = require("./routes/api/authRouter");
const petsRouter = require("./routes/api/petsRouter");
const newsRouter = require("./routes/api/newsRouter");

const app = express();

const formatsLogger = process.env.NODE_ENV === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/users/", authRouter);
app.use("/api/pets", petsRouter);
app.use("/api/news", newsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use(errorHandler);

module.exports = app;
