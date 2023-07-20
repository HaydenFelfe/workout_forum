const router = require("express").Router();
const bcrypt = require('bcryptjs');
const User = require("../../models/user");
const sendWelcomeEmail = require('../../utils/email.js')


router.post('/', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = await User.create({
      username,
      email,
      password: hashedPassword,
    });


    // Send welcome email after successfully creating the user
    await sendWelcomeEmail(email);


    const userResponse = {
      id: userData.id,
      username: userData.username,
      email: userData.email,
    };
    res.status(200).json(userResponse);
  } catch (err) {
    res.status(400).json({ message: 'Failed to sign up' });
  }
});


router.post('/login', async (req, res) =>{
  try{
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user){
      res.status(404).json({ error: 'User not found' });
      return;
    }
    console.log(user);
    const passwordMatch = await bcrypt.compare(password, user.password);
    if(passwordMatch){
      req.session.save(() => {
        req.session.user_id = user.id;
        req.session.logged_in = true;
        res
          .status(200)
          .json({ message: 'You are now logged in!' });
      });
    } else {
      res.status(401).json({ error: 'Login failed. Please try again!' });
    }
  }catch (err){
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/logout', (req, res) => {
  try {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } catch (err) {
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