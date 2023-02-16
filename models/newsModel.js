const { Schema, model } = require("mongoose");
const { ErrorConstructor } = require("../helper/errors");

const newsSchema = new Schema({
  title: {
    type: String,
  },
  url: {
    type: String,
  },
  description: {
    type: String,
  },
  date: {
    type: String,
  },
});

newsSchema.post("save", ErrorConstructor);

const News = model("new", newsSchema);

module.exports = { News };
