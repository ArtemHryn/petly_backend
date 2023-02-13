const express = require("express");
const { asyncWrapper } = require("../../helper/apiHelper");
const router = express.Router();

const checkJWT = require("../../middlewares/authTokenCheck");

// const {
//   registrationValidation,
//   loginValidation,
//   changeSubscriptionValidation,
//   verifyEmailValidation,
// } = require("../../middlewares/validation");

const {
  registrationController,
  loginController,
  logoutController,
  verificationController,
  resendVerificationController,
  // getCurrentUserController,
  // changeSubscriptionController,
  // changeAvatarController,
} = require("../../controllers/authControllers");

router.post(
  "/signup",
  // registrationValidation,
  asyncWrapper(registrationController)
);
router.post(
  "/login",
  // loginValidation,
  asyncWrapper(loginController)
);
router.get("/logout", checkJWT, asyncWrapper(logoutController));

router.get("/verify/:verificationToken", asyncWrapper(verificationController));
router.post(
  "/verify",
  // verifyEmailValidation,
  asyncWrapper(resendVerificationController)
);

// router.get("/current", checkJWT, asyncWrapper(getCurrentUserController));
// router.patch(
//   "/current",
//   checkJWT,
//   changeSubscriptionValidation,
//   asyncWrapper(changeSubscriptionController)
// );
// router.patch(
//   "/avatars",
//   checkJWT,
//   uploadMiddleware.single("avatar"),
//   asyncWrapper(changeAvatarController)
// );

module.exports = router;
