const express = require('express');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { restoreUser, requireAuth } = require('../../utils/auth');
const { Song, User, Album, Playlist, Comment } = require('../../db/models');
const router = express.Router();

// GET all albums
router.get(
    '/', async (req, res) => {
        const albums = await Album.findAll();

        return res.json({albums});
    }
)

// GET all albums created by the Current User
router.get(
    '/current', requireAuth, async (req, res, next) => {
        const userId = req.user.id

        const userAlbums = await Album.findAll({
            where: {
                userId: userId
            }
        });

        res.json(userAlbums);
    }
)

// GET an album based on an ID
router.get(
    '/:albumId', async (req, res) => {
        const albumId = req.params.albumId;

        const album = await Album.findOne({
            where: {
                id: albumId
            }
        });

        const artist = await User.findOne({
            where: {
                id: album.userId
            },
            attributes: ['id', 'username', 'previewImage']
        });

        const songs = await Song.findAll({
            where: {
                albumId: album.id
            },
            attributes: ['id', 'userId', 'albumId', 'title', 'description', 'url', 'createdAt', 'updatedAt', 'previewImage']
        })

        res.json({album, artist: artist, songs: songs});
    }
)

module.exports = router;