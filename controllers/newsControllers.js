const { ErrorConstructor } = require('../helper/errors');
const { News } = require('../models/newsModel');

const getNews = async (req, res) => {
  const { page = 1, limit = 6, query } = req.query;
  const skip = page * limit - limit;

  const options =
    query === '' || !query
      ? {}
      : {
          $or: [
            { title: { $regex: query, $options: 'i' } },
            { description: { $regex: query, $options: 'i' } },
          ],
        };

  const result = await News.find(options).skip(skip).limit(limit);

  if (!result) {
    throw ErrorConstructor(404, 'Not found');
  }

  res.status(200).json({ result });
};

module.exports = {
  getNews,
};
