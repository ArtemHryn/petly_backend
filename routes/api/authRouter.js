const express = require("express");
const { asyncWrapper } = require("../../helper/apiHelper");
const router = express.Router();

const checkJWT = require("../../middlewares/authTokenCheck");

const {
  registrationValidation,
  loginValidation,
  resendVerificationValidation,
  ResetPasswordValidation
} = require("../../middlewares/validation");

const {
  registrationController,
  loginController,
  logoutController,
  currentController,
  updateUserController,
  updatePhotoController,
  verificationController,
  resendVerificationController,
  requestPasswordResetController,
  restorePasswordController,
} = require('../../controllers/authControllers');
const uploadCloud = require("../../middlewares/photosUploadMiddleware");

router.post(
  "/signup",
  registrationValidation,
  asyncWrapper(registrationController)
);
router.post("/login", loginValidation, asyncWrapper(loginController));

router.get("/logout", checkJWT, asyncWrapper(logoutController));

router.get("/current", checkJWT, asyncWrapper(currentController));

router.patch("/update", checkJWT, asyncWrapper(updateUserController));
router.patch(
  '/photo',
  [checkJWT, uploadCloud.single('userPhoto')],
  asyncWrapper(updatePhotoController)
);

router.get('/verify/:verificationToken', asyncWrapper(verificationController));

router.post(
  '/verify',
  resendVerificationValidation,
  asyncWrapper(resendVerificationController)
);


router.post('/forgot-password', asyncWrapper(requestPasswordResetController));

router.patch('/restore-password/:token', ResetPasswordValidation,
  asyncWrapper(restorePasswordController)
);

module.exports = router;