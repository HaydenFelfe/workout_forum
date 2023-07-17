const router = require('express').Router();
const { WorkoutRoutine } = require('../models/');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const WorkoutRoutineData = await WorkoutRoutine.findAll({
      where: {
        userId: req.session.userId,
      },
    });

    const WorkoutRoutines = WorkoutRoutineData.map((WorkoutRoutine) => WorkoutRoutine.get({ plain: true }));

    res.render('all-workout-admin', {
      layout: 'workout',
      WorkoutRoutines,
    });
  } catch (err) {
    res.redirect('login');
  }
});

router.get('/new', withAuth, (req, res) => {
  res.render('new-workout', {
    layout: 'workout',
  });
});

router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const WorkoutRoutineData = await WorkoutRoutine.findByPk(req.params.id);

    if (WorkoutRoutineData) {
      const WorkoutRoutines = WorkoutRoutineData.get({ plain: true });

      res.render('edit-workout', {
        layout: 'workout',
        post,
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.redirect('login');
  }
});

module.exports = router;
