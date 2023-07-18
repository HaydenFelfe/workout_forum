const router = require("express").Router();
const { Comment, WorkoutRoutine } = require("../../models");
const withAuth = require('../../utils/auth');

router.post("/", withAuth, async (req, res) => {
  try {
    const { comment, workout_routine_id } = req.body;
    const userId = req.params.user_id;
    const commentData = await Comment.create({
      comment,
      workout_routine_id,
      user_id: userId,
    });
    res.status(200).json(commentData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", withAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { comment } = req.body;
    await Comment.update(
      { comment },
      { where: { id } }  
    );
    res.status(200).json({ message: "Comment updated successfully!" });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const { id } = req.params;
    await Comment.destroy({ where: { id }});
    res.status(200).json({ message: "Comment deleted successfuly!"});
  } catch (err){
    res.status(400).json(err);
  }
});

module.exports = router;

