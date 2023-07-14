const router = require("express").Router();
const WorkoutRoutine = require("../../models/workoutRoutine");

router.post("/", async (req, res) => {
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

// router.put("/:id", async (req, res) => {
//   try {
//     const workoutRoutine = await WorkoutRoutine.update(
//       {
//         title: req.body.title,
//         description: req.body.description,
//       },
//       {
//         where: {
//           id: req.params.id,
//         },
//       }
//     );
//     res.status(200).json(workoutRoutine);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });
module.exports = router;

router.get('/workout/:bpart', async (req, res) => {
    const workoutRouties = await WorkoutRoutine.findAll({
        where: {
            bodyPart: req.params.bpart
        }
    })
})

router.put("/:id", async (req, res) => {
  try {
    const workoutRoutine = await WorkoutRoutine.update(
      {
        title: req.body.title,
        description: req.body.description,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json(workoutRoutine);
  } catch (err) {
    res.status(400).json(err);
  }
});

