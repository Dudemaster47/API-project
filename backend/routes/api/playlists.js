const express = require('express');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { restoreUser, requireAuth } = require('../../utils/auth');
const { Song, User, Album, Playlist, Comment, SongPlaylist } = require('../../db/models');
const router = express.Router();

// GET all playlists
router.get(
    '/', async (req, res, next) => {
        const playlists = await Playlist.findAll();

        return res.json(playlists);
    }
);

// GET all  playlists created by the Current User
router.get(
    '/current', requireAuth, async (req, res, next) => {
        const userId = req.user.id

        const userPlaylists = await Playlist.findAll({
            where: {
                userId: userId
            }
        });

        res.json(userPlaylists);
    }
)

// GET a playlist based on an ID
router.get(
    '/:playlistId', async (req, res, next) => {
        const playlistId = req.params.playlistId;

        const playlist = await Playlist.findOne({
            where: {
                id: playlistId
            },
            include: Song
        });

        if(!playlist){
            const err = new Error('Not Found');
            err.status = 404;
            err.title = 'Not Found';
            err.errors = ["Playlist couldn't be found."];
            return next(err);
        }

        res.json(playlist);
    }
);

// POST a playlist
router.post(
    '/', requireAuth, async (req, res, next) => {
        const {name, previewImage} = req.body;
        const userId = req.user.id;

        const playlist = await Playlist.create({
            userId: userId,
            name,
            previewImage
        });

        if(!playlist.name){
            const err = new Error('Validation Error');
            err.status = 400;
            err.title = 'Validation Error';
            err.errors = ["Playlist name is required"];
            return next(err);
        }

        res.json(playlist)
    }
);

// POST a song to an playlist based on the playlist's ID
router.post(
    '/:playlistId', requireAuth, async (req, res, next) => {
        const playlistId = req.params.playlistId;
        const userId = req.user.id;
        const {songId} = req.body;
        const playlist = await Playlist.findOne({
            where: {
                id: playlistId
            }
        });

        const song = await Song.findOne({
            where: {
                id: playlistId
            }
        });

        if(!playlist){
            const err = new Error('Not Found');
            err.status = 404;
            err.title = 'Not Found';
            err.errors = ["Playlist couldn't be found."];
            return next(err);
        }

        if(!song){
            const err = new Error('Not Found');
            err.status = 404;
            err.title = 'Not Found';
            err.errors = ["Song couldn't be found."];
            return next(err);
        }


        if(playlist.userId !== userId){
            const err = new Error('Unauthorized user');
            err.status = 403;
            err.title = 'Unauthorized user';
            err.errors = ['This is not your playlist.'];
            return next(err);
        }

        playlist.addSong(songId);

        const songPlaylist = await SongPlaylist.findOne({
            where: {
                playlistId: playlistId,
                songId: songId
            }
        });

        res.json(songPlaylist);
    }
);

// PATCH a playlist
router.patch(
    '/:playlistId/', requireAuth, async (req, res, next) => {
        const playlistId = req.params.playlistId;
        const userId = req.user.id;
        const {name, previewImage} = req.body;
    
        const playlist = await Playlist.findOne({
            where: {
                id: playlistId
            }
        });

        if(!playlist){
            const err = new Error('Not Found');
            err.status = 404;
            err.title = 'Not Found';
            err.errors = ["Playlist couldn't be found."];
            return next(err);
        }

        if(!playlist.name){
            const err = new Error('Validation Error');
            err.status = 400;
            err.title = 'Validation Error';
            err.errors = ["Playlist name is required"];
            return next(err);
        }

        if(playlist.userId !== userId){
            const err = new Error('Unauthorized user');
            err.status = 403;
            err.title = 'Unauthorized user';
            err.errors = ['This is not your album.'];
            return next(err);
        }

        playlist.update({
            name,
            previewImage
        });

        res.json(playlist);
    }
);

// DELETE a playlist
router.delete('/:playlistId', requireAuth, async (req, res, next) => {
    const {playlistId} = req.params;
    const userId = req.user.id;
    const playlist = await Playlist.findByPk(playlistId);

    if(!playlist){
        const err = new Error('Not Found');
        err.status = 404;
        err.title = 'Not Found';
        err.errors = ["Playlist couldn't be found."];
        return next(err);
    }
    
    if(playlist.userId !== userId){
        const err = new Error('Unauthorized user');
        err.status = 403;
        err.title = 'Unauthorized user';
        err.errors = ['This is not your comment.'];
        return next(err);
    }

    await playlist.destroy();

    res.json({
        message: "Successfully deleted"
    });
});


// DELETE a song from a playlist

module.exports = router;