const express = require("express");
const { asyncWrapper } = require("../../helper/apiHelper");

const router = express.Router();
const checkJWT = require("../../middlewares/authTokenCheck");

const { addPet, deletePetById } = require("../../controllers/petsControllers");
const { addPetValidation } = require("../../middlewares/validation");

router.post("/", [checkJWT, addPetValidation], asyncWrapper(addPet));

router.delete("/:myPetId", checkJWT, asyncWrapper(deletePetById));

module.exports = router;
