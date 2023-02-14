const mongoose = require("mongoose");
require("dotenv").config();

const DB_CONNECTION = process.env.MONGO_CONNECTION_DB
  ? process.env.MONGO_CONNECTION_DB
  : `mongodb+srv://production:generatorpass@pets.iomwoyz.mongodb.net/pets_db`;

const connectMongo = async () => {
  mongoose.set("strictQuery", false);
  mongoose.connect(DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = { connectMongo };
