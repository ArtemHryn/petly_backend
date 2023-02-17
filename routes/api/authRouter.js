const express = require("express");
const { asyncWrapper } = require("../../helper/apiHelper");
const router = express.Router();

const checkJWT = require("../../middlewares/authTokenCheck");

const {
  registrationValidation,
  loginValidation,
} = require("../../middlewares/validation");

const {
  registrationController,
  loginController,
  logoutController,
  currentController,
  updateUserController,
  updatePhotoController,
} = require("../../controllers/authControllers");
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

module.exports = router;
 