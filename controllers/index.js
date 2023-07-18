const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');
const workoutRoutes = require('./workout-routes');

router.use('/', homeRoutes);
router.use('/workout', workoutRoutes);
router.use('/api', apiRoutes);




module.exports = router;