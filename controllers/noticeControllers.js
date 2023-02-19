const { Notice } = require('../models/noticeModel');
const { User } = require('../models/userModel');
const { ErrorConstructor } = require('../helper/errors');

// create users notice
const addNotice = async (req, res) => {
  const { _id } = req.user;
  const { email, phone } = await User.findById(_id);

  const pet = new Notice({
    ...req.body,
    imgURL: req.file.path,
    owner: { _id, email, phone },
  });

  const result = await pet.save();
  res.status(201).json({ pet: result });
};

// get all noties from category or title

const getAllNotices = async (req, res) => {
  const { category } = req.params;
  const { page = 1, limit = 8, query } = req.query;
  if (!category) {
    throw new ErrorConstructor(400, 'Please, select category');
  }
  // const options = query
  //   ? { category, $text: { $search: query } }
  //   : { category };

  const options =
    query === '' || !query
      ? {category}
      : {
          category,
          $or: [
            { title: { $regex: query, $options: 'i' } },
            { breed: { $regex: query, $options: 'i' } },
          ],
        };

  const skip = (page - 1) * limit;

  const allNotice = await Notice.find(options);

  const sorting = [['createdAt', 1]];

  const result = await Notice.find(options)
    .sort(sorting)
    .skip(skip)
    .limit(limit);

  if (!result) {
    throw new ErrorConstructor(404, 'Not found');
  }
  res.json({ total: allNotice.length, result: result });
};

// get one notice
const getOneNotice = async (req, res) => {
  const { noticeId } = req.params;
  const result = await Notice.findById(noticeId);
  if (!result) {
    throw new ErrorConstructor(404, `Notice with id : ${noticeId} not found`);
  }
  res.status(200).json({
    result,
  });
};

// getOwnerNotice
const getOwnerNotices = async (req, res) => {
  const { _id: userId } = req.user;
  const notices = await Notice.find({ owner: userId }, '-createdAt -updatedAt');
  res.json({
    notices,
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

const addOwnerFavorit = async (req, res) => {
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

const removeOwnerFavorit = async (req, res) => {
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
  getAllNotices,
  addNotice,
  getOneNotice,
  getOwnerNotices,
  deleteOwnerNotice,
  addOwnerFavorit,
  removeOwnerFavorit,
  getOwnerFavorites,
};
