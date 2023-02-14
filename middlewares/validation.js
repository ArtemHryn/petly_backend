const RegisterUserSchema = require("../utils/validation/authValidation/registerValidationSchema");
const LoginUserSchema = require("../utils/validation/authValidation/loginValidationSchema");

const registrationValidation = (req, res, next) => {
  const validationResult = RegisterUserSchema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json(validationResult.error.details);
  }
  next();
};

const loginValidation = (req, res, next) => {
  const validationResult = LoginUserSchema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json(validationResult.error.details);
  }
  next();
};


module.exports = {
  registrationValidation,
  loginValidation,
};