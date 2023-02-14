const jwt = require("jsonwebtoken");
const { ErrorConstructor } = require("../helper/errors");
const { User } = require("../models/userModel");

const checkJWT = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      throw new ErrorConstructor(401, "Unautorized");
    }

    const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const dbUser = await User.findOne({ _id: user._id });

    if (token !== dbUser.token)
      next(new ErrorConstructor(401, "Not authorized"));

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = checkJWT;
