const router = require("express").Router();
const bcrypt = require('bcrypt');
const User = require("../../models/user");

router.post('/', async (req, res) => {
  try {
    const { username, email, password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = await User.create({
      username,
      email,
      password: hashedPassword,
    });
  
    res.status(200).json(userData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) =>{
  try{
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user){
      res.status(404).json({ error: 'User not found' });
      return;
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if(passwordMatch){
      res.status(200).json({ message: 'You are now logged in!' });
    } else {
      res.status(401).json({ error: 'Login failed. Please try again!' });
    }
  }catch (err){
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const userData = {
      id: user.id,
      username: user.username,
      email: user.email,
    };

    res.status(200).json(userData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// router.put('/:id', async (req, res) => {
//   try {
//     const user = await User.update(
//       {
//         username: req.body.username,
//         email: req.body.email,
//         password: req.body.password,
//       },
//       {
//         where: {
//           id: req.params.id,
//         },
//       }
//     );
//     res.status(200).json(user);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

module.exports = router;