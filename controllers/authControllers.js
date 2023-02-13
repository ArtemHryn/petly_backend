const gravatar = require("gravatar");

const {
  registerUser,
  loginUser,
  logoutUser,
  verification,
  resendVerification,
//   getCurrentUser,
//   changeUserSubscription,
//   changeUserAvatar,
} = require("../services/authServices");

const registrationController = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await registerUser(email, password);

  res.status(200).json({ user });
};

const loginController = async (req, res, next) => {
  const { email, password } = req.body;

  const token = await loginUser({ email, password });

  res.status(200).json({ user: { email }, token });
};

const logoutController = async (req, res, next) => {
  const { _id } = req.user;

  console.log(await logoutUser(_id));

  res.status(204).end();
};

const verificationController = async (req, res, next) => {
  const { verificationToken } = req.params;

  await verification(verificationToken);

  res.status(200).json({ message: "Verification is successful!" });
};

const resendVerificationController = async (req, res, next) => {
  const { email } = req.body;

  await resendVerification({ email });

  res.status(400).json({ message: "Verification has already been passed." });
};

// const getCurrentUserController = async (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1];

//   if (!token) {
//     throw new httpError(401, "Unautorized");
//   }
//   const currentUser = await getCurrentUser(token);

//   res.status(200).json({ currentUser });
// };

// const changeSubscriptionController = async (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1];

//   if (!token) {
//     throw new httpError(401, "Unautorized");
//   }

//   const { subscription } = req.body;

//   const changedUserSubscription = await changeUserSubscription(
//     token,
//     subscription
//   );

//   if (!changedUserSubscription) {
//     return res.status(404).json({ message: "Not found" });
//   }

//   res
//     .status(200)
//     .json({ message: `User subscription type was changed to ${subscription}` });
// };

// const changeAvatarController = async (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1];

//   if (!token) {
//     throw new httpError(401, "Unautorized");
//   }

//   const avatarURL = gravatar.url(req.body.email);

//   const { originalname, path: tempUpload } = req.file;

//   const changedUserAvatar = await changeUserAvatar(
//     token,
//     originalname,
//     tempUpload,
//     avatarURL
//   );

//   if (!changedUserAvatar) {
//     return res.status(404).json({ message: "Not found" });
//   }

//   res.status(200).json({ message: "User avatar was changed." });
// };

module.exports = {
  registrationController,
  loginController,
  logoutController,
  verificationController,
  resendVerificationController,
//   getCurrentUserController,
//   changeSubscriptionController,
//   changeAvatarController,
};
