const jwt = require('jsonwebtoken');
const sha256 = require('sha256');
require('dotenv').config();

const { ErrorConstructor } = require('../helper/errors');
const { User } = require('../models/userModel');
const { format } = require('date-fns');
const sendMail = require('../helper/sendMail');
const { checkCredentials } = require('../helper/checkCredentials');

const registerUser = async body => {
  const { email } = body;
  const candidate = await User.findOne({ email });

  if (candidate) {
    throw new ErrorConstructor(409, 'Email in use');
  }

  const verificationToken = sha256(body.email + process.env.VERIFY_SALT);
  body.verificationToken = verificationToken;
  const user = new User(body);

  await user.save();
  sendMail(body.email, 'verify', verificationToken);

  return user;
};

const loginUser = async ({ email, password }) => {
  const candidate = await User.findOne({ email });
  await checkCredentials(candidate, password);

  const token = jwt.sign(
    { _id: candidate._id, email: candidate.email },
    process.env.JWT_SECRET_KEY,
    { expiresIn: '365d' }
  );

  const user = await User.findByIdAndUpdate(candidate._id, {
    $set: { token },
  }).select({ password: 0, token: 0 });
  return { user, token };
};

const logoutUser = async _id => {
  await User.findByIdAndUpdate(_id, { $set: { token: null } });
};

const current = async _id => {
  const user = await User.findOne({ _id }).select({ password: 0, token: 0 });
  return user;
};

const updateUser = async (_id, body) => {
  // you can update password also
  const user = await User.findById(_id);
  if (body.birthday) {
    const parsedDate = new Date(Date.parse(body.birthday));
    body.birthday = format(new Date(parsedDate), 'yyyy-MM-dd');
  }
  console.log(body.birthday);

  Object.assign(user, body);
  user.save();
};

const updatePhoto = async (_id, fileURL) => {
  const user = await User.findById(_id);
  user.userPhotoURL = fileURL;
  return user.save();
};

const verifyUser = async verificationToken => {
  const user = await User.findOne({ verificationToken, verify: false });
  if (!user) {
    throw new ErrorConstructor(404, 'User not found');
  }

  user.verificationToken = 'null';
  user.verify = true;
  await user.save();
};

const resendVerification = async email => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new ErrorConstructor(400, 'User not found');
  }
  if (user.verify) {
    throw new ErrorConstructor(400, 'Verification has already been passed');
  }

  sendMail(email, 'verify', user.verificationToken);
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  current,
  updateUser,
  updatePhoto,
  verifyUser,
  resendVerification,
};
