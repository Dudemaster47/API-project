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

// GET all songs of an artist based on an ID
  
router.get(
  '/:userId/songs', async (req, res) => {
    const userId = req.params.userId;

    const artist = await User.findOne({
      where: {
        id: userId
      }
    });

    if(!artist){
      const err = new Error('Not Found');
      err.status = 404;
      err.title = 'Not Found';
      err.errors = ["Artist couldn't be found."];
      return next(err);
    }

    const artistSongs = await Song.findAll({
      where: {
        userId: userId
      }
    });

    res.json(artistSongs);
  }
);

module.exports = router;