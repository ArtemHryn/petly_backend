const { ErrorConstructor } = require("../helper/errors");
const { News } = require("../models/newsModel");

const getNews = async (req, res) => {
  const { page = 1, limit = 6 } = req.query;
  const skip = page * limit - limit;

  const result = await News.find({}).skip(skip).limit(limit);

  if (!result) {
    throw ErrorConstructor(404, "Not found");
  }

  res.status(200).json({ result });
};

module.exports = {
  getNews,
};
