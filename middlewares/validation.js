const RegisterUserSchema = require("../utils/validation/authValidation/registerValidationSchema");
const LoginUserSchema = require("../utils/validation/authValidation/loginValidationSchema");
const NoticeValidationSchema = require("../utils/validation/noticeValidation/noticeValidationShema");
const addPetSchema = require("../utils/validation/petsValidation/addPetJoiSchema");
const { ErrorConstructor } = require("../helper/errors");
const { resendVerificationValidationSchema } = require("../utils/validation/authValidation/resendVerificationValidationSchema");


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


const noticeValidation = (req, res, next) => {
  const validationResult = NoticeValidationSchema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json(validationResult.error.details);
  }
  next();
};

const addPetValidation = (req, res, next) => {
  const validationResult = addPetSchema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json(validationResult.error.details[0].message);
  }
  next();
};

const resendVerificationValidation = (req, res, next) => {
  const validationResult = resendVerificationValidationSchema.validate(
    req.body
  );
  if (validationResult.error) {
    next(new ErrorConstructor(400, 'missing required field email'));
  }
  next();
};

module.exports = {
  registrationValidation,
  loginValidation,
  noticeValidation,
  addPetValidation,
  resendVerificationValidation,
};

