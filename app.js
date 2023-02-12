const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const { errorHandler } = require("./helper/apiHelper");

const app = express();

const formatsLogger = process.env.NODE_ENV === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use(errorHandler);

module.exports = app;
