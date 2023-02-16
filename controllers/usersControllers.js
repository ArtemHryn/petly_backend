const { Pet } = require('../models/petModel.js');
const { User } = require('../models/userModel');

const getCurrent = async (req, res) => {
  const { email, name } = req.user;
  const { _id: owner } = req.user;
  const result = await Pet.find({ owner });

  res.status(200),
    res.json({
      user: {
        email,
        name,
        result,
      },
    });
};

module.exports = { getCurrent };
