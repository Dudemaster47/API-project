// backend/routes/api/users.js
const express = require('express')
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Song, Album, Playlist, Comment } = require('../../db/models');
const router = express.Router();


  
  
  
  // GET all albums of an artist based on an ID
  
  router.get(
    '/:userId/albums', async (req, res, next) => {
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
  
      const artistAlbums = await Album.findAll({
        where: {
          userId: userId
        }
      });
  
      res.json(artistAlbums);
    }
  );
  


module.exports = router;