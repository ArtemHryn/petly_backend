const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const { errorHandler } = require("./helper/apiHelper");

const authRouter = require("./routes/api/authRouter");

const app = express();

const formatsLogger = process.env.NODE_ENV === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/users/", authRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use(errorHandler);

module.exports = app;
