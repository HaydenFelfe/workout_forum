

const express = require('express');
const router = express.Router();

const userRoutes = require('./user-routes');
const workoutRoutineRoutes = require('./workoutRoutine-routes');
const likeRoutes = require('./like-routes');
const commentRoutes = require('./comment-routes');


router.use('/users', userRoutes);
router.use('./workout-routines', workoutRoutineRoutes);
router.use('./likes', likeRoutes);
router.use('./comments', commentRoutes);



const express = require('express');
const router = express.router();

const userRoutes = require('./user-routes');
const workoutRoutineRoutes = require('./workoutRoutine-routes');
const likeRoutes = require('./like-routes');
const commentRoutes = require('./comment-routes');
const bodyPartRoutes = require('./bodyPart-routes');

router.use('/users', userRoutes);
router.use('./workout-routines', workoutRoutineRoutes);
router.use('./likes', likeRoutes);
router.use('./comments', commentRoutes);
router.use('./body-parts', bodyPartRoutes);


module.exports = router;
