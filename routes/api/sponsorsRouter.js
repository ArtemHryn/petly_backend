const express = require('express');
const controller = require('../../controllers/sponsorControllers');
const { asyncWrapper } = require('../../helper/apiHelper');

const router = express.Router();

router.get('/', asyncWrapper( controller.getSponsors));

module.exports = router;
