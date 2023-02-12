const mongoose = require("mongoose");

const connectMongo = async () => {
  mongoose.set("strictQuery", false);
  mongoose.connect(process.env.MONGO_CONNECTION_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = { connectMongo };
