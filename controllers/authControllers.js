
const {
  registerUser,
  loginUser,
  logoutUser,
} = require("../services/authServices");

const registrationController = async (req, res) => {
  const { email, name } = await registerUser(req.body);

  res.status(200).json({ user: { email, name } });
};

const loginController = async (req, res) => {
  const { user, token } = await loginUser(req.body);

  res.status(200).json({ user, token });
};

const logoutController = async (req, res) => {
  const { _id } = req.user;

  await logoutUser(_id);

  res.status(204).end();
};

module.exports = {
  registrationController,
  loginController,
  logoutController,
};
