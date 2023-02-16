const { Notice } = require('../models/noticeModel');
const { User } = require("../models/userModel");
const { ErrorConstructor } = require('../helper/errors');



// create users notice
const add = async (req, res) => {
  const { _id: owner, email, phone } = req.user;

  const result = await Notice.create({
    ...req.body,
    owner
  });
  res.status(201).json({ ...result._doc, owner: { owner, email, phone } });
};


// get all noties from category or title

const getAll = async (req, res) => {
  const { category } = req.params;
  const { page = 1, limit = 8, query } = req.query;
 

  const options =
    query === null || query === '' || query === undefined
      ? { category }
      : { category, $text: { $search: query } };

  const skip = (page - 1) * limit;


  const allNotice = await Notice.find(options);

  const sorting = [['_id', -1]];

  const result = await Notice.find(options)
    .sort(sorting)
    .skip(skip)
    .limit(limit);

  if (!options) {
    throw new ErrorConstructor(404, 'Not found');
    } res.json({total: allNotice.length, result: result });
    
};


// get one notice
const getOne = async (req, res) => {
  const { noticeId } = req.params;
  const result = await Notice.findById(noticeId)
  if (!result) {
    throw new ErrorConstructor(404,`Notice with id : ${noticeId} not found`);
  }
  res.status(200).json({
    result,
  });
};


// getOwnerNotice
const getOwner = async (req, res) => {
  const { _id: userId } = req.user;
  const notices = await Notice.find({ owner: userId }, '-createdAt -updatedAt');
  res.json({
 notices
  });
};

const deleteOwnerNotice = async (req, res) => {
  const { _id: userId } = req.user;
  const { noticeId } = req.params;

  const deletedNotice = await Notice.findOneAndDelete({
    _id: noticeId,
    owner: userId,
  });

  if (!deletedNotice) {
    throw new ErrorConstructor(404, 'Not Found');
  }
  return res.status(200).json({ message: 'Notice deleted' });
};

// Add favorite

const addOwnerFavorites = async (req, res) => {
  const { _id: userId } = req.user;
  const { noticeId: id } = req.params;

  const result = await Notice.findById(id);
  if (!result) {
    throw new ErrorConstructor(404, 'Not found');
  }

  const { favorites } = await User.findById(userId);
  if (favorites.includes(id)) {
    throw new ErrorConstructor(400, 'Notice is already in favorites list');
  }

  await User.findByIdAndUpdate(
    userId,
    { $push: { favorites: id } },
    { new: true }
  );
  return res
    .status(200)
    .json({ message: 'Notice added to favorites list', data: result });
};



// remove owner favorites notice

const removeOwnerFavorites = async (req, res) => {
  const { _id: userId } = req.user;
  const { noticeId: id } = req.params;
  const result = await Notice.findById(id);
  if (!result) {
    throw new ErrorConstructor(404, 'Not found');
  }

  await User.findByIdAndUpdate(
    userId,
    { $pull: { favorites: id } },
    { new: true }
  );

  return res
    .status(200)
    .json({ message: 'Notice removed from favorites list', data: result });
};


// get owner favorites list
const getOwnerFavorites = async (req, res) => {
  const { _id: userId } = req.user;

  const ownerFavorites = await User.findById(userId).populate(
    'favorites',
    'title name birthdate breed location comments categoryName price photo sex owner'
  );
  const { favorites } = ownerFavorites;

  return res.status(200).json({ favorites });
};





module.exports = {
  getAll,
  add,
  getOne,
  getOwner,
  deleteOwnerNotice,
  addOwnerFavorites,
  removeOwnerFavorites,
  getOwnerFavorites,
};