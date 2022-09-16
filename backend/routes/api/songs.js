const express = require('express');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { restoreUser, requireAuth } = require('../../utils/auth');
const { Song, User, Album, Playlist, Comment } = require('../../db/models');
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

module.exports = router;