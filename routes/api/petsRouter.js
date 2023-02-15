const express = require("express");
const { asyncWrapper } = require("../../helper/apiHelper");

const router = express.Router();
const checkJWT = require("../../middlewares/authTokenCheck");

const { addPet, deletePetById } = require("../../controllers/petsControllers");

router.post("/", checkJWT, asyncWrapper(addPet));

router.delete("/:id", checkJWT, asyncWrapper(deletePetById));

module.exports = router;
