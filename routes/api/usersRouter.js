const express = require('express');
const { asyncWrapper } = require('../../helper/apiHelper');

const router = express.Router();
const checkJWT = require('../../middlewares/authTokenCheck');

const { getCurrent } = require('../../controllers/usersControllers');

router.get('/current', checkJWT, asyncWrapper(getCurrent));

module.exports = router;
