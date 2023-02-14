const jwt = require("jsonwebtoken");
require("dotenv").config();
const { checkCredentials } = require("../helper/checkCredentials");
const { ErrorConstructor } = require("../helper/errors");
const { User } = require("../models/userModel");

const registerUser = async (body) => {
  const { email } = body;
  const candidate = await User.findOne({ email });

  if (candidate) {
    throw new ErrorConstructor(409, "Email in use");
  }
  const user = new User(body);

  await user.save();

  return user;
};

const loginUser = async ({ email, password }) => {
  const candidate = await User.findOne({ email });
  checkCredentials(candidate, password);

  const token = jwt.sign(
    { _id: candidate._id, email: candidate.email },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "1d" }
  );

  const user = await User.findByIdAndUpdate(candidate._id, {
    $set: { token },
  }).select({ password: 0, token: 0 });
  return { user, token };
};

const logoutUser = async (_id) => {
  await User.findByIdAndUpdate(_id, { $set: { token: null } });

  return { message: "The user was logged out" };
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};
