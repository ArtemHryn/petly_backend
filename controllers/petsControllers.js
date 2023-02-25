const {
  addPet,
  deletePet,
  getAllPetsByOwner,
} = require('../services/petService.js');

const addPetController = async (req, res) => {
  const { _id } = req.user;
  const {path} = req.file
  const result = await addPet(_id, req.body, path);
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
