const express = require('express');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { restoreUser, requireAuth } = require('../../utils/auth');
const { Song, User, Album, Playlist, Comment } = require('../../db/models');
const comment = require('../../db/models/comment');
const router = express.Router();

// GET all songs
router.get(
    '/', async (req, res, next) => {

        let query = {
            where: 
            {},
            include: 
            []
        };

        const page = req.query.page === undefined ? 1 : parseInt(req.query.page);
        const size = req.query.size === undefined ? 5 : parseInt(req.query.size);
        if (page >= 1 && size >= 1) {
            query.limit = size;
            query.offset = size * (page - 1);
        }

        if (page < 0){
            const err = new Error('Validation Error');
            err.status = 400;
            err.title = 'Validation Error';
            err.errors = ['Page must be greater than or equal to 0'];
            return next(err);
        }

        if (size < 0){
            const err = new Error('Validation Error');
            err.status = 400;
            err.title = 'Validation Error';
            err.errors = ['Size must be greater than or equal to 0'];
            return next(err);
        }


        if(req.query.title){
            query.where.title = req.query.title;
        }
        
        let songs = await Song.findAll(query);
        if(req.query.createdAt){
            let datedSongs = [];
            let createdAt = req.query.createdAt;

            if(createdAt.length === 11){
                const err = new Error('Validation Error');
                err.status = 400;
                err.title = 'Validation Error';
                err.errors = ['CreatedAt is invalid'];
                return next(err);
            }
            
            
            for(let i=0; i < songs.length; i++){
                let song = songs[i];


                if(song.createdAt.toString().includes(req.query.createdAt)){
                    datedSongs.push(song);

                }
            }
            songs = datedSongs;
        } 


        return res.json(songs);
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
    '/:songId', async (req, res, next) => {
        const songId = req.params.songId;

        const song = await Song.findOne({
            where: {
                id: songId
            }
        });

        if(!song){
            const err = new Error('Not Found');
            err.status = 404;
            err.title = 'Not Found';
            err.errors = ["Song couldn't be found."];
            return next(err);
        }

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
    '/:songId/comments', async (req, res, next) => {
        const songId = req.params.songId;

        const song = await Song.findOne({
            where: {
                id: songId
            }
        });

        if(!song){
            const err = new Error('Not found');
            err.status = 404;
            err.title = 'Not found';
            err.errors = ["Song couldn't be found."];
            return next(err);
        }

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
    '/:songId/comments', requireAuth, async (req, res, next) => {
        const songId = req.params.songId;
        const userId = req.user.id;
        const {body} = req.body;

        const song = await Song.findOne({
            where: {
                id: songId
            }
        });

        if(!song){
            const err = new Error('Not Found');
            err.status = 404;
            err.title = 'Not Found';
            err.errors = ["Song couldn't be found."];
            return next(err);
        }

        if(!comment.body){
            const err = new Error('Validation Error');
            err.status = 400;
            err.title = 'Validation Error';
            err.errors = ["Comment body text is required"];
            return next(err);
        }

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

        if(!song){
            const err = new Error('Not Found');
            err.status = 404;
            err.title = 'Not Found';
            err.errors = ["Song couldn't be found."];
            return next(err);
        }

        if(!song.title){
            const err = new Error('Validation Error');
            err.status = 400;
            err.title = 'Validation Error';
            err.errors = ["Song title is required"];
            return next(err);
        }

        if(!song.url){
            const err = new Error('Validation Error');
            err.status = 400;
            err.title = 'Validation Error';
            err.errors = ["Audio is required"];
            return next(err);
        }

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

    if(!song){
        const err = new Error('Not Found');
        err.status = 404;
        err.title = 'Not Found';
        err.errors = ["Song couldn't be found."];
        return next(err);
    }
    
    if(song.userId !== userId){
        const err = new Error('Unauthorized user');
        err.status = 403;
        err.title = 'Unauthorized user';
        err.errors = ['This is not your comment.'];
        return next(err);
    }

    await song.destroy();

    res.json({
        message: "Successfully deleted"
    });
});

module.exports = router;