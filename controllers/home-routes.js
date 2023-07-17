const router = require('express').Router();
const { User, WorkoutRoutine, Like, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {

});

module.exports = router;