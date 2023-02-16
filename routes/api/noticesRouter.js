const express = require('express');
const controller = require('../../controllers/noticeControllers');
const { asyncWrapper } = require('../../helper/apiHelper');
const checkJWT = require('../../middlewares/authTokenCheck');
const router = express.Router();

const {
  noticeValidation
} = require('../../middlewares/validation');

router.post(
  '/',
  checkJWT,
    noticeValidation, asyncWrapper(controller.add));

router.get('/owner', checkJWT, controller.getOwner);

router.get('/notice/:noticeId', asyncWrapper(controller.getOne));
  
router.get('/:category', asyncWrapper(controller.getAll));

router.delete('/:noticeId', checkJWT, asyncWrapper(controller.deleteOwnerNotice));

router.patch(
  '/favorites/:noticeId',
  checkJWT,
  asyncWrapper(controller.addOwnerFavorites)
);

router.get(
  '/favorites/all',
  checkJWT,
  asyncWrapper(controller.getOwnerFavorites)
);

router.put(
  '/favorites/:noticeId',
  checkJWT,
  asyncWrapper(controller.removeOwnerFavorites)
);


module.exports = router;

