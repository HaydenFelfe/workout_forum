const router = require('express').Router();
const { User, WorkoutRoutine, Like, Comment } = require('../models');

router.get('/', async (req, res) => {
    try {
        const WorkoutRoutineData = await WorkoutRoutine.findAll({
            include: [User],
        });

        const workouts = WorkoutRoutineData.map((workout) => workout.get({ plain: true }));

        res.render('all', { workouts });
    }   catch (err) {
        res.status(500).json(err);
    }
});

router.get('/workout/:id', async (req, res) => {
    try {
        const WorkoutRoutineData = await WorkoutRoutine.findByPk(req.params.id, {
            include: [
                User,
                {
                    model: Comment,
                    include: [User],
                },
            ],
        });

        if (WorkoutRoutineData) {
            const workout = WorkoutRoutineData.get({ plain: true });

            res.render('single-workout', { workout });
        } else {
            res.status(400).end();
        } 
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('signup');
});

module.exports = router;