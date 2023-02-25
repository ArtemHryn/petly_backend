const express = require('express');
const { asyncWrapper } = require('../../helper/apiHelper');

const {
  getNews,
  getNewsController,
} = require('../../controllers/newsControllers');

const router = express.Router();

router.get('/', asyncWrapper(getNewsController));

module.exports = router;
