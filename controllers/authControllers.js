const {
  registerUser,
  loginUser,
  logoutUser,
} = require("../services/authServices");

const registrationController = async (req, res, next) => {
  const { email, password, name, city, phone } = req.body;

  const user = await registerUser(email, password, name, city, phone);

  res.status(200).json({ user });
};

const loginController = async (req, res, next) => {
  const { email, password } = req.body;

  const token = await loginUser({ email, password });

  res.status(200).json({ user: { email }, token });
};

const logoutController = async (req, res, next) => {
  const { _id } = req.user;

  await logoutUser(_id);

  res.status(204).end();
};

module.exports = {
  registrationController,
  loginController,
  logoutController,
};
