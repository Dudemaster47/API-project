const express = require('express');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { restoreUser, requireAuth } = require('../../utils/auth');
const { Song, User, Album, Playlist, Comment } = require('../../db/models');
const router = express.Router();

// GET all albums
router.get(
    '/', async (req, res, next) => {
        const albums = await Album.findAll();

        return res.json(albums);
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
    '/:albumId', async (req, res, next) => {
        const albumId = req.params.albumId;

        const album = await Album.findOne({
            where: {
                id: albumId
            }
        });

        if(!album){
            const err = new Error('Not Found');
            err.status = 404;
            err.title = 'Not Found';
            err.errors = ["Album couldn't be found."];
            return next(err);
        }


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
    '/', requireAuth, async (req, res, next) => {
        const {title, description, previewImage} = req.body;
        const userId = req.user.id;

        const album = await Album.create({
            userId: userId,
            title,
            description,
            previewImage
        });

        if(!album.title){
            const err = new Error('Validation Error');
            err.status = 400;
            err.title = 'Validation Error';
            err.errors = ["Album title is required"];
            return next(err);
        }

        res.json(album)
    }
);

// PUT an album
router.put(
    '/:albumId/', requireAuth, async (req, res, next) => {
        const albumId = req.params.albumId;
        const userId = req.user.id;
        const { title, description, previewImage} = req.body;
    
        const album = await Album.findOne({
            where: {
                id: albumId
            }
        });

        if(!album){
            const err = new Error('Not Found');
            err.status = 404;
            err.title = 'Not Found';
            err.errors = ["Album couldn't be found."];
            return next(err);
        }

        if(!album.title){
            const err = new Error('Validation Error');
            err.status = 400;
            err.title = 'Validation Error';
            err.errors = ["Album title is required"];
            
        }

        if(album.userId !== userId){
            const err = new Error('Unauthorized user');
            err.status = 403;
            err.title = 'Unauthorized user';
            err.errors = ['This is not your album.'];
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

    if(!album){
        const err = new Error('Not Found');
        err.status = 404;
        err.title = 'Not Found';
        err.errors = ["Album couldn't be found."];
        return next(err);
    }
    
    if(album.userId !== userId){
        const err = new Error('Unauthorized user');
        err.status = 403;
        err.title = 'Unauthorized user';
        err.errors = ['This is not your comment.'];
        return next(err);
    }

    await album.destroy();

    res.json({
        message: "Successfully deleted"
    });
});

// DELETE a song from an album?

module.exports = router;