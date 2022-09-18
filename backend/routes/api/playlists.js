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

module.exports = router;