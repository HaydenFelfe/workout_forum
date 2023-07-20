const router = require('express').Router();
const { WorkoutRoutine, User } = require('../models/');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try { const userData = await User.findByPk(req.session.user_id, {
    include: [{ model: WorkoutRoutine }]
  })
  
  const user = userData.get({ plain: true });

    res.render('all', {
      layout: 'workout',
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/new', (req, res) => {
    res.render('new-workout', {
        layout: 'workout',
        logged_in: true
    })
});

// router.get('/new', withAuth, async (req, res) => {
//   try {
//     res.render('new-workout', {
//     //layout: 'workout',
//     logged_in: true
//      }); 
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

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


