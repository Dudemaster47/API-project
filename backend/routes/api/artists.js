// backend/routes/api/users.js
const express = require('express')
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Song, Album, Playlist, Comment } = require('../../db/models');
const router = express.Router();

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
  
  // GET all albums of an artist based on an ID
  
  router.get(
    '/:userId/albums', async (req, res) => {
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
  
  // GET all playlists of an artist based on an ID
  
  router.get(
    '/:userId/playlists', async (req, res) => {
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
  
      const artistPlaylists = await Playlist.findAll({
        where: {
          userId: userId
        }
      });
  
      res.json(artistPlaylists);
    }
  );

module.exports = router;