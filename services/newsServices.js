const { News } = require('../models/newsModel');

const getNews = async ({ page = 1, limit = 6, query }) => {
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

  return result;
};

module.exports = {
  getNews,
};
