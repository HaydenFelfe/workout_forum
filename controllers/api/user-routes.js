const router = require("express").Router();
const User = require("../../models/user");

router.post('/', async (req, res) => {
  try {
    const userData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    res.status(200).json(userData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const user = await User.update(
      {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;