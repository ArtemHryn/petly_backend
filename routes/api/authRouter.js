const express = require("express");
const { asyncWrapper } = require("../../helper/apiHelper");

const router = express.Router();

router.post(
  "/signup", asyncWrapper()
);

module.exports = router;