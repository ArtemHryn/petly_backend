const express = require('express');
const { asyncWrapper } = require('../../helper/apiHelper');

const router = express.Router();
const checkJWT = require('../../middlewares/authTokenCheck');

const { addPet, deletePetById, getAllPets } = require('../../controllers/petsControllers');
const { addPetValidation } = require('../../middlewares/validation');
const uploadCloud = require('../../middlewares/photosUploadMiddleware');

router.post(
  '/',
  [checkJWT, uploadCloud.single('petPhoto'), addPetValidation],
  asyncWrapper(addPet)
);

router.delete('/:myPetId', checkJWT, asyncWrapper(deletePetById));
router.get('/', checkJWT, asyncWrapper(getAllPets));

module.exports = router;
