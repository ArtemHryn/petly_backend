const {
  registerUser,
  loginUser,
  logoutUser,
  current,
  updateUser,
  updatePhoto,
} = require('../services/authServices');

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

const currentController = async (req, res) => {
  const { _id } = req.user;
  const currentUser = await current(_id);
  res.status(200).json({ user: currentUser });
};

const updateUserController = async (req, res) => {
  const { _id } = req.user;
  await updateUser(_id, req.body);
  res.status(200).json({ message: 'user has been updated' });
};

const updatePhotoController = async (req, res) => {
  const { _id } = req.user;
  console.log(req.file);

  const {userPhotoURL} = await updatePhoto(_id, req.file.path)
  res.status(200).json({ userPhotoURL });
};
module.exports = {
  registrationController,
  loginController,
  logoutController,
  currentController,
  updateUserController,
  updatePhotoController,
};
