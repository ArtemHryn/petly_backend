const express = require('express');
const { asyncWrapper } = require('../../helper/apiHelper');

const router = express.Router();
const checkJWT = require('../../middlewares/authTokenCheck');

const {
  // addPet,
  // deletePetById,
  // getAllPets,
  deletePetController,
  getAllPetsController,
  addPetController,
} = require('../../controllers/petsControllers');
const { addPetValidation } = require('../../middlewares/validation');
const uploadCloud = require('../../middlewares/photosUploadMiddleware');

router.post(
  '/',
  [checkJWT, uploadCloud.single('petPhoto'), addPetValidation],
  asyncWrapper(addPetController)
);

router.delete('/:myPetId', checkJWT, asyncWrapper(deletePetController));
router.get('/', checkJWT, asyncWrapper(getAllPetsController));

module.exports = router;
