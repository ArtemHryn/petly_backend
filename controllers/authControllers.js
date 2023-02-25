const {
  registerUser,
  loginUser,
  logoutUser,
  current,
  updateUser,
  updatePhoto,
  verifyUser,
  resendVerification,
  requestPasswordReset,
  restorePassword,
} = require('../services/authServices');

const registrationController = async (req, res) => {
  const { email, name } = await registerUser(req.body);

  res.status(201).json({ user: { email, name } });
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
  const { userPhotoURL } = await updatePhoto(_id, req.file.path);
  res.status(200).json({ userPhotoURL });
};

const verificationController = async (req, res) => {
  const { verificationToken } = req.params;
  await verifyUser(verificationToken);
  res.status(200).json({ status: 'Verification successful' });
};

const resendVerificationController = async (req, res) => {
  await resendVerification(req.body.email);
  res.json({ message: 'Verification email sent' });
};

// --------------------------------------------------------------------

const requestPasswordResetController = async (req, res) => {
  const { email } = req.body;
  await requestPasswordReset(email);
  res.status(200).json({message: "Reset password link was sent succesfull"})
}

const restorePasswordController = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  await restorePassword(token, password);
  res.status(200).json({
    message: "Password was changed successfull",
  });
}


module.exports = {
  registrationController,
  loginController,
  logoutController,
  currentController,
  updateUserController,
  updatePhotoController,
  verificationController,
  resendVerificationController,
  requestPasswordResetController,
  restorePasswordController
};
