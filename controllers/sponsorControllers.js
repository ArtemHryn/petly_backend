const { Sponsor } = require('../models/sponsorModel');
const { ErrorConstructor } = require('../helper/errors');

const getSponsors = async (req, res) => {
  const { page = 1, limit = 9 } = req.query;
  const skip = (page - 1) * limit;

  const result = await Sponsor.find().skip(skip).limit(limit);

  res.status(200).json({ total: result.length, data: result });
  if (!result) {
    throw ErrorConstructor(404, 'Not found');
  }
};

module.exports = { getSponsors };
