const express = require('express');
const controller = require('../../controllers/noticeControllers');
const { asyncWrapper } = require('../../helper/apiHelper');
const checkJWT = require('../../middlewares/authTokenCheck');
const uploadCloud = require('../../middlewares/photosUploadMiddleware');
const router = express.Router();

const { noticeValidation } = require('../../middlewares/validation');

router.post(
  '/',
  [checkJWT, uploadCloud.single('noticeAvatar'), noticeValidation],
  asyncWrapper(controller.addNotice)
);

router.get('/owner', checkJWT, controller.getOwnerNotices);

router.get('/notice/:noticeId', asyncWrapper(controller.getOneNotice));

router.get('/:category', asyncWrapper(controller.getAllNotices));

router.delete(
  '/:noticeId',
  checkJWT,
  asyncWrapper(controller.deleteOwnerNotice)
);

router.patch(
  '/favorites/:noticeId',
  checkJWT,
  asyncWrapper(controller.addOwnerFavorit)
);

router.get(
  '/favorites/all',
  checkJWT,
  asyncWrapper(controller.getOwnerFavorites)
);

router.put(
  '/favorites/:noticeId',
  checkJWT,
  asyncWrapper(controller.removeOwnerFavorit)
);

module.exports = router;
