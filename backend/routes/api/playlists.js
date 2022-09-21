const express = require('express');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { restoreUser, requireAuth } = require('../../utils/auth');
const { Song, User, Album, Playlist, Comment, SongPlaylist } = require('../../db/models');
const router = express.Router();

// GET all playlists
router.get(
    '/', async (req, res) => {
        const playlists = await Playlist.findAll();

        return res.json(playlists);
    }
);

// GET all songs created by the Current User
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

// GET a song based on an ID
router.get(
    '/:playlistId', async (req, res) => {
        const playlistId = req.params.playlistId;

        const playlist = await Playlist.findOne({
            where: {
                id: playlistId
            },
            include: Song
        });


        res.json(playlist);
    }
);

// POST a playlist
router.post(
    '/', requireAuth, async (req, res) => {
        const {name, previewImage} = req.body;
        const userId = req.user.id;

        const playlist = await Playlist.create({
            userId: userId,
            name,
            previewImage
        });

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

        if(playlist.userId !== userId){
            const err = new Error('Unauthorized user');
            err.status = 403;
            err.title = 'Unauthorized user';
            err.erors = ['This is not your album.'];
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

module.exports = router;