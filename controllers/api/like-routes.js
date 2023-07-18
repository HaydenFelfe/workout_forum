const router = require("express").Router();
const { Like, WorkoutRoutine } = require("../../models");
const withAuth = require('../../utils/auth');

router.post("/", withAuth, async (req, res) => {
  try {
    console.log(req.session);
    if (!req.session.user_id) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    const { workoutRoutineId } = req.body;
    const existingLike = await Like.findOne({
      where: { workout_routine_id: workoutRoutineId },
    });
    if (existingLike) {
        const hasLiked = await Like.findOne({
            where: { workout_routine_id: workoutRoutineId, user_id: req.session.user_id },
          });
    
          if (hasLiked) {
            res.status(409).json({ error: 'You have already liked this post' });
            return;
          }
        await Like.increment("count", {
        where: { workout_routine_id: workoutRoutineId },
        by: 1,
      });
      res.status(200).json({ message: "The post has been liked!"});
    } else {
      await Like.create({
        workout_routine_id: workoutRoutineId,
        count: 1,
        user_id: req.session.user_id,
      });
      res.status(200).json({ message: "Post liked successfully!" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.get('/count/:workoutRoutineId', async (req, res) => {
    try {
      const { workoutRoutineId } = req.params;
      const likeCount = await Like.count({
        where: { workout_routine_id: workoutRoutineId },
      });
      res.status(200).json({ count: likeCount });
    } catch (err) {
      res.status(400).json(err);
    }
  });

module.exports = router;

