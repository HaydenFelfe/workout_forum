const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');
const workoutRoutes = require('./workout-routes.js');

router.use('/', homeRoutes);
router.use('/workout', workoutRoutes);
router.use('/api', apiRoutes);




module.exports = router;

