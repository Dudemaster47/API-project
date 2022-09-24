// backend/routes/api/users.js
const express = require('express')
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Song, Album, Playlist, Comment } = require('../../db/models');
const router = express.Router();

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];

// Sign up
router.post(
  '/',
  validateSignup,
  async (req, res) => {
    const { email, username, firstName, lastName, password} = req.body;
    const user = await User.signup({ email, username, firstName, lastName, password});

    await setTokenCookie(res, user);

    return res.json({
      user,
    });
  }
);

// GET all details of an Artist from an id
router.get(
  '/:userId', async (req, res) => {
    const userId = req.params.userId;

    const totalSongs = await Song.count({
      where: {
        userId: userId
      }
    });

    const totalAlbums = await Album.count({
      where: {
        userId: userId
      }
    });

    const previewImages = await Song.findAll({
      where: {
        userId: userId
      },
      attributes: ['previewImage']
    });

    const artist = await User.findOne({
      where: {
        id: userId
      },
      attributes: ['id', 'username', 'previewImage']
    });

    if(!artist){
      const err = new Error('Not Found');
      err.status = 404;
      err.title = 'Not Found';
      err.errors = ["Artist couldn't be found."];
      return next(err);
    }

    res.json({artist, totalSongs: totalSongs, totalAlbums: totalAlbums, previewImages: previewImages});
  }
);

module.exports = router;