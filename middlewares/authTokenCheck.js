const jwt = require("jsonwebtoken");
const { ErrorConstructor } = require("../helper/errors");

const checkJWT = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new ErrorConstructor(401, "Unautorized");
    }

    const user = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!user || !token) {
      throw new ErrorConstructor(401, "Unautorized");
    }

    req.user = user;
    req.token = token;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = checkJWT;
