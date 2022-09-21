const express = require('express');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { restoreUser, requireAuth } = require('../../utils/auth');
const { Song, User, Album, Playlist, Comment } = require('../../db/models');
const comment = require('../../db/models/comment');
const router = express.Router();

// GET all songs
router.get(
    '/', async (req, res) => {
        const songs = await Song.findAll();

        return res.json({songs});
    }
)

// GET all songs created by the Current User
router.get(
    '/current', requireAuth, async (req, res, next) => {
        const userId = req.user.id

        const userSongs = await Song.findAll({
            where: {
                userId: userId
            }
        });

        res.json(userSongs);
    }
)

// GET a song based on an ID
router.get(
    '/:songId', async (req, res) => {
        const songId = req.params.songId;

        const song = await Song.findOne({
            where: {
                id: songId
            }
        });

        const artist = await User.findOne({
            where: {
                id: song.userId
            },
            attributes: ['id', 'username', 'previewImage']
        });

        const album = await Album.findOne({
            where: {
                id: song.albumId
            },
            attributes: ['id', 'title', 'previewImage']
        })

        res.json({song, artist: artist, album: album});
    }
);

// GET all comments based on a song's id
router.get(
    '/:songId/comments', async (req, res) => {
        const songId = req.params.songId;

        const comments = await Comment.findAll({
            where: {
                songId: songId
            },
            include: {
                model: User,
                attributes: ['id', 'username']
            }
        });

        res.json(comments);
    });

// POST a comment to a song based on the song's id
router.post(
    '/:songId/comments', requireAuth, async (req, res) => {
        const songId = req.params.songId;
        const userId = req.user.id;
        const {body} = req.body;

        const comment = await Comment.create({
            userId: userId,
            songId: songId,
            body
        });

        res.json(comment);
    }
);

// PATCH a song
router.patch(
    '/:songId/', requireAuth, async (req, res, next) => {
        const songId = req.params.songId;
        const userId = req.user.id;
        const {albumId, title, description, url, previewImage} = req.body;
    
        const song = await Song.findOne({
            where: {
                id: songId
            }
        });

        if(song.userId !== userId){
            const err = new Error('Unauthorized user');
            err.status = 403;
            err.title = 'Unauthorized user';
            err.erors = ['This is not your song.'];
            return next(err);
        }

        song.update({
            albumId,
            title,
            description,
            url,
            previewImage
        });

        res.json(song);
    }
);

// DELETE a song
router.delete('/:songId', requireAuth, async (req, res, next) => {
    const {songId} = req.params;
    const userId = req.user.id;
    const song = await Song.findByPk(songId);
    
    if(song.userId !== userId){
        const err = new Error('Unauthorized user');
        err.status = 403;
        err.title = 'Unauthorized user';
        err.erors = ['This is not your comment.'];
        return next(err);
    }

    await song.destroy();

    res.json({
        message: "Successfully deleted"
    });
});

module.exports = router;