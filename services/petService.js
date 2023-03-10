const { Pet } = require('../models/petModel.js');
const { ErrorConstructor } = require('../helper/errors.js');

const addPet = async (userId, petData, avatarURL) => {
  const result = await Pet.create({
    ...petData,
    avatarURL,
    owner: userId,
  });
  return result;
};

const deletePet = async (myPetId, owner) => {
  const result = await Pet.findOneAndDelete({ _id: myPetId, owner });
  if (!result) {
    throw ErrorConstructor(404, 'Not found');
  }
};

const getAllPetsByOwner = async ownerId => {
  const sorting = [['createdAt', -1]];
  const result = await Pet.find({ owner: ownerId }).sort(sorting);
  return result;
};

module.exports = {
  addPet,
  deletePet,
  getAllPetsByOwner,
};
