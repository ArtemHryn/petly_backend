// const { ErrorConstructor } = require('../helper/errors.js');
// const { Pet } = require('../models/petModel.js');

// const addPetController = async (req, res) => {
//   const { _id } = req.user;
//   const result = await Pet.create({
//     ...req.body,
//     avatarURL: req.file.path,
//     owner: _id,
//   });
//   res.status(201).json({ result });
// };

// const deletePetController = async (req, res) => {
//   const { myPetId } = req.params;
//   const { _id: owner } = req.user;
//   const result = await Pet.findOneAndDelete({ _id: myPetId, owner });
//   if (!result) {
//     throw ErrorConstructor(404, 'Not found');
//   }
//   res.status(200).json({ message: 'Pet was deleted' });
// };

// const getAllPetsController = async (req, res) => {
//   const { _id: owner } = req.user;
//   const result = await Pet.find({ owner });

//   res.status(200).json({ pets: result });
// };

// module.exports = {
//   addPetController,
//   deletePetController,
//   getAllPetsController,
// };

const {
  addPet,
  deletePet,
  getAllPetsByOwner,
} = require('../services/petService.js');

const addPetController = async (req, res) => {
  const { _id } = req.user;
  const result = await addPet(_id, req.body);
  res.status(201).json({ result });
};

const deletePetController = async (req, res) => {
  const { myPetId } = req.params;
  const { _id: owner } = req.user;
  await deletePet(myPetId, owner);

  res.status(200).json({ message: 'Pet was deleted' });
};

const getAllPetsController = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await getAllPetsByOwner(owner);

  res.status(200).json({ pets: result });
};

module.exports = {
  addPetController,
  deletePetController,
  getAllPetsController,
};
