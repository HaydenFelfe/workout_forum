const router = require("express").Router();
// const WorkoutRoutine = require("../../models/workoutRoutine");
const { WorkoutRoutine, User} = require('../../models')
const withAuth = require('../../utils/auth');


router.post("/", withAuth, async (req, res) => {
  try {
    const workoutRoutineData = await WorkoutRoutine.create({
      title: req.body.title,
      description: req.body.description,
      user_id: req.session.user_id,
      bodyPart: req.body.bodyPart,
    });
    res.status(200).json(workoutRoutineData);
  } catch (err) {
    res.status(400).json(err);
  }
});




router.get('/workout/:bodyPart', async (req, res) => {
    try {
  const workoutRoutines = await WorkoutRoutine.findAll({
        where: {
            bodyPart: req.params.bodyPart
        },
        include: [{ model: User}]
    });
    const jsonData = workoutRoutines.map(item => item.toJSON());
    console.log(jsonData);
    res.render('bodypart', {layout: "workout", jsonData, bodyPart: req.params.bodyPart});
  } catch (err){
    res.status(400).json(err);
  }
});






// router.put("/:id", async (req, res) => {v
//   try {
//     const [updatedCount] = await WorkoutRoutine.update(
//       {
//         title: req.body.title,
//         description: req.body.description,
//       },
//       {
//         where: {
//           id: req.params.id,
//         },
//         returning: true,
//       }
//     );
//     if (updatedCount > 0) {
//       const updatedWorkoutRoutine = await WorkoutRoutine.findByPk(req.params.id);
//       // await WorkoutRoutine.findByPk(req.params.id);
//       res.status(200).json(updatedWorkoutRoutine);
//       // res.status(200).json({ message: "workout routine updated successfully! "});
//     }else {
//       res.status(404).json({ error: "workout routine not found" });
//     }
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });
module.exports = router;

