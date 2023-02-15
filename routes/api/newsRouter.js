const express = require("express");
const { asyncWrapper } = require("../../helper/apiHelper");

const { getNews } = require("../../controllers/newsControllers");

const router = express.Router();

router.get("/", asyncWrapper(getNews));

module.exports = router;
