const router = require("express").Router();
const WorkoutRoutine = require("../../models/workoutRoutine");
const withAuth = require('../../utils/auth');

router.post("/", withAuth, async (req, res) => {
  try {
    const workoutRoutineData = await WorkoutRoutine.create({
      title: req.body.title,
      description: req.body.description,
      userId: req.body.userId,
      bodyPart: req.body.bodyPart,
    });
    res.status(200).json(workoutRoutineData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/workout/:bodyPart', async (req, res) => {
    try {
  const workoutRouties = await WorkoutRoutine.findAll({
        where: {
            bodyPart: req.params.bodyPart
        }
    });
    res.status(200).json(workoutRouties);
  } catch (err){
    res.status(400).json(err);
  }
});

router.put("/:id", withAuth, async (req, res) => {
  try {
    const [updatedCount] = await WorkoutRoutine.update(
      {
        title: req.body.title,
        description: req.body.description,
      },
      {
        where: {
          id: req.params.id,
        },
        returning: true,
      }
    );
    if (updatedCount > 0) {
      const updatedWorkoutRoutine = await WorkoutRoutine.findByPk(req.params.id);
      // await WorkoutRoutine.findByPk(req.params.id);
      res.status(200).json(updatedWorkoutRoutine);
      // res.status(200).json({ message: "workout routine updated successfully! "});
    }else {
      res.status(404).json({ error: "workout routine not found" });
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const [affectedRows] = WorkoutRoutine.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (affectedRows > 0) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;