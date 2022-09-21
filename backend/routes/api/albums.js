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
);

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
);

// POST an album
router.post(
    '/', requireAuth, async (req, res) => {
        const {title, description, previewImage} = req.body;
        const userId = req.user.id;

        const album = await Album.create({
            userId: userId,
            title,
            description,
            previewImage
        });

        res.json(album)
    }
);

// POST a song to an album based on the album's ID
router.post(
    '/:albumId', requireAuth, async (req, res, next) => {
        const albumId = req.params.albumId;
        const userId = req.user.id;
        const {title, description, url, previewImage} = req.body;
        const album = await Album.findOne({
            where: {
                id: albumId
            }
        });

        if(album.userId !== userId){
            const err = new Error('Unauthorized user');
            err.status = 403;
            err.title = 'Unauthorized user';
            err.erors = ['This is not your album.'];
            return next(err);
        }

        const song = await Song.create({
            userId: userId,
            albumId: albumId,
            title,
            description,
            url,
            previewImage
        });

        res.json(song);
    }
);

// PATCH an album
router.patch(
    '/:albumId/', requireAuth, async (req, res, next) => {
        const albumId = req.params.albumId;
        const userId = req.user.id;
        const { title, description, previewImage} = req.body;
    
        const album = await Album.findOne({
            where: {
                id: albumId
            }
        });

        if(album.userId !== userId){
            const err = new Error('Unauthorized user');
            err.status = 403;
            err.title = 'Unauthorized user';
            err.erors = ['This is not your album.'];
            return next(err);
        }

        album.update({
            title,
            description,
            previewImage
        });

        res.json(album);
    }
);

// DELETE an album
router.delete('/:albumId', requireAuth, async (req, res, next) => {
    const {albumId} = req.params;
    const userId = req.user.id;
    const album = await Album.findByPk(albumId);
    
    if(album.userId !== userId){
        const err = new Error('Unauthorized user');
        err.status = 403;
        err.title = 'Unauthorized user';
        err.erors = ['This is not your comment.'];
        return next(err);
    }

    await album.destroy();

    res.json({
        message: "Successfully deleted"
    });
});

// DELETE a song from an album?

module.exports = router;