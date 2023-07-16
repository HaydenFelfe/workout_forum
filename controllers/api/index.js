
const express = require('express');
const router = express.Router();

const userRoutes = require('./user-routes');
const workoutRoutineRoutes = require('./workoutRoutine-routes');
const likeRoutes = require('./like-routes');
const commentRoutes = require('./comment-routes');


router.use('/users', userRoutes);
router.use('/workout-routines', workoutRoutineRoutes);
router.use('/likes', likeRoutes);
router.use('/comments', commentRoutes);


module.exports = router;

