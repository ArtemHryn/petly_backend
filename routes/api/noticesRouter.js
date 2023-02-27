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
  asyncWrapper(controller.addNoticeController)
);

router.get('/owner', checkJWT, controller.getOwnerNoticesController);

router.get('/notice/:ownerId', asyncWrapper(controller.getOwnerInfoController));

router.get('/:category', asyncWrapper(controller.getAllNoticesController));

router.delete(
  '/:noticeId',
  checkJWT,
  asyncWrapper(controller.deleteOwnerNoticeController)
);

router.patch(
  '/favorites/:noticeId',
  checkJWT,
  asyncWrapper(controller.addOwnerFavoritController)
);

router.get(
  '/favorites/all',
  checkJWT,
  asyncWrapper(controller.getOwnerFavoritesController)
);

router.put(
  '/favorites/:noticeId',
  checkJWT,
  asyncWrapper(controller.removeOwnerFavoritController)
);

module.exports = router;
