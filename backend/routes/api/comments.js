const express = require('express');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { restoreUser, requireAuth } = require('../../utils/auth');
const { Song, User, Album, Playlist, Comment } = require('../../db/models');
const router = express.Router();

// GET all comments
router.get(
    '/', async (req, res, next) => {
        const comments = await Comment.findAll();

        return res.json(comments);
    }
);

// PATCH a comment
router.patch(
    '/:commentId/', requireAuth, async (req, res, next) => {
        const commentId = req.params.commentId;
        const userId = req.user.id;
        const { body } = req.body;
    
        const comment = await Comment.findOne({
            where: {
                id: commentId
            }
        });

        if(!comment){
            const err = new Error('Not Found');
            err.status = 404;
            err.title = 'Not Found';
            err.errors = ["Comment couldn't be found."];
            return next(err);
        }

        if(!comment.body){
            const err = new Error('Validation Error');
            err.status = 400;
            err.title = 'Validation Error';
            err.errors = ["Comment body text is required"];
            return next(err);
        }

        if(comment.userId !== userId){
            const err = new Error('Unauthorized user');
            err.status = 403;
            err.title = 'Unauthorized user';
            err.errors = ['This is not your comment.'];
            return next(err);
        }

        comment.update({
            body
        });

        res.json(comment);
    }
);

// DELETE a comment
router.delete('/:commentId', requireAuth, async (req, res, next) => {
    const {commentId} = req.params;
    const userId = req.user.id;
    const comment = await Comment.findByPk(commentId);

    if(!comment){
        const err = new Error('Not Found');
        err.status = 404;
        err.title = 'Not Found';
        err.errors = ["Comment couldn't be found."];
        return next(err);
    }

    if(comment.userId !== userId){
        const err = new Error('Unauthorized user');
        err.status = 403;
        err.title = 'Unauthorized user';
        err.errors = ['This is not your comment.'];
        return next(err);
    }
    
    await comment.destroy();

    res.json({
        message: "Successfully deleted"
    });
});


module.exports = router;