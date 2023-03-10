const { ErrorConstructor } = require('../helper/errors');
const { getNews } = require('../services/newsServices');

const getNewsController = async (req, res) => {
  const { page = 1, limit = 6, query } = req.query;

  const result = await getNews({ page, limit, query });

  if (!result) {
    throw ErrorConstructor(404, 'Not found');
  }

  res.status(200).json({ result });
};

module.exports = {
  getNewsController,
};
