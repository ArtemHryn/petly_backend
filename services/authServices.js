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
};

const current = async (_id) => {
  const user = await User.findOne({ _id }).select({ password: 0, token: 0 });
  return user;
};

const updateUser = async (_id, body) => {
  // you can update password also
  const user = await User.findById(_id);
  Object.assign(user, body);
  user.save();
};

const updatePhoto = async (_id, fileURL) => {
  const user = await User.findById(_id);
  user.userPhotoURL = fileURL
  return user.save()
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  current,
  updateUser,
  updatePhoto,
};
