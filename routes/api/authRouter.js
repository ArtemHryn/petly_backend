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
} = require("../../controllers/authControllers");

router.post(
  "/signup",
  registrationValidation,
  asyncWrapper(registrationController)
);
router.post(
  "/login",
  loginValidation,
  asyncWrapper(loginController)
);
router.get("/logout", checkJWT, asyncWrapper(logoutController));

module.exports = router;
