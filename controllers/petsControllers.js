const { ErrorConstructor } = require('../helper/errors.js');
const { Pet } = require('../models/petModel.js');

const addPet = async (req, res) => {
  const { _id } = req.user;
  const result = await Pet.create({
    ...req.body,
    avatarURL: req.file.path,
    owner: _id,
  });
  res.status(201).json({ result });
};

const deletePetById = async (req, res) => {
  const { myPetId } = req.params;
  const { _id: owner } = req.user;
  const result = await Pet.findOneAndDelete({ _id: myPetId, owner });
  if (!result) {
    throw ErrorConstructor(404, 'Not found');
  }
  res.status(200).json({ message: 'Pet was deleted' });
};

const getAllPets = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Pet.find({ owner });

  res.status(200).json({ pets: result });
};

module.exports = {
  addPet,
  deletePetById,
  getAllPets,
};
