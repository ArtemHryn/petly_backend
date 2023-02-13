const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { ErrorConstructor } = require("../helper/errors");
const { User } = require("../models/userModel");

const registerUser = async (email, password, name, city, phone) => {
  const candidate = await User.findOne({ email });

  if (candidate) {
    throw new ErrorConstructor(409, "Email in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = new User({
    email,
    password: hashedPassword,
    name,
    city,
    phone,
  });

  await user.save();

  return user;
};

const loginUser = async ({ email, password }) => {
  const candidate = await User.findOne({ email });
  const isPasswordCorrect = await bcrypt.compare(password, candidate.password);

  if (!candidate || !isPasswordCorrect) {
    throw new ErrorConstructor(401, "Wrong email or password");
  }

  const token = jwt.sign(
    { _id: candidate._id, email: candidate.email },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "1d" }
  );

  await User.findByIdAndUpdate(candidate._id, { $set: { token } });

  return token;
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
