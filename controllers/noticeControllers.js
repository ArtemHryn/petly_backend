const { Notice } = require('../models/noticeModel');
const { User } = require('../models/userModel');
const { ErrorConstructor } = require('../helper/errors');
const { format } = require('date-fns');

// create users notice
const addNoticeController = async (req, res) => {
  const { _id } = req.user;
  const { email, phone } = await User.findById(_id);
  try {
    if (req.body.birthdate) {
      const parsedDate = new Date(Date.parse(req.body.birthdate));
      req.body.birthdate = format(new Date(parsedDate), 'yyyy-MM-dd');
    }
  } catch (error) {
    const newDate = new Date('01-02-2000');
    req.body.birthdate = newDate.toUTCString();
  }
  const pet = new Notice({
    ...req.body,
    imgURL: req.file.path,
    owner: { _id, email, phone },
  });

  const result = await pet.save();
  res.status(201).json({ pet: result });
};

// get all noties from category or title

const getAllNoticesController = async (req, res) => {
  const { category } = req.params;
  const { page = 1, limit = 8, query } = req.query;
  if (!category) {
    throw new ErrorConstructor(400, 'Please, select category');
  }

  const options =
    query === '' || !query
      ? { category }
      : {
          category,
          $or: [
            { title: { $regex: query, $options: 'i' } },
            { breed: { $regex: query, $options: 'i' } },
          ],
        };

  const skip = (page - 1) * limit;

  const allNotice = await Notice.countDocuments(options);

  const sorting = [['createdAt', -1]];

  const result = await Notice.find(options)
    .sort(sorting)
    .skip(skip)
    .limit(limit);

  if (!result) {
    throw new ErrorConstructor(404, 'Not found');
  }
  res.json({ totalPages: Math.ceil(allNotice / 8), page, result: result });
};

// get owner id info
const getOwnerInfoController = async (req, res) => {
  const { ownerId } = req.params;
  const { phone, email } = await User.findById(ownerId);
  if (!ownerId) {
    throw new ErrorConstructor(404, `Owner with id : ${ownerId} not found`);
  }
  res.status(200).json({
    email,
    phone,
  });
};

// getOwnerNotice
const getOwnerNoticesController = async (req, res) => {
  const { _id: userId } = req.user;
  const { query } = req.query;
  const sorting = [['createdAt', -1]];

  const notices = await Notice.find({ owner: userId })
    .or([
      { title: { $regex: query, $options: 'i' } },
      { breed: { $regex: query, $options: 'i' } },
    ])
    .sort(sorting);
  if (!notices) {
    throw new ErrorConstructor(404, 'Not Found');
  }
  res.status(200).json({
    notices,
  });
};

// delete owner notice
const deleteOwnerNoticeController = async (req, res) => {
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

const addOwnerFavoritController = async (req, res) => {
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

const removeOwnerFavoritController = async (req, res) => {
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
const getOwnerFavoritesController = async (req, res) => {
  const { _id: userId } = req.user;
  const { query } = req.query;
  const sorting = [['createdAt', -1]];
  const filter = query
    ? {
        $or: [
          { title: { $regex: query, $options: 'i' } },
          { breed: { $regex: query, $options: 'i' } },
        ],
      }
    : {};

  const ownerFavorites = await User.findById(userId).sort(sorting).populate({
    path: 'favorites',
    select: 'title category birthdate breed location sex imgURL owner',
    match: filter,
  });
  const { favorites } = ownerFavorites;
  
  return res.status(200).json({ favorites });
};

module.exports = {
  getAllNoticesController,
  addNoticeController,
  getOwnerInfoController,
  getOwnerNoticesController,
  deleteOwnerNoticeController,
  addOwnerFavoritController,
  removeOwnerFavoritController,
  getOwnerFavoritesController,
};
