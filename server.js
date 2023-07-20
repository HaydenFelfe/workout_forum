const path = require('path');
const express = require('express');
const sequelize = require('./config/connection');
const exphbs = require('express-handlebars');
const session = require('express-session');
const helpers = require('./utils/helpers');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const routes = require('./controllers');
const nodemailer = require('nodemailer');




const app = express();
const PORT = process.env.PORT || 3005;
const sess = {
  secret: 'Super secret secret',
  // Express session will use cookies by default, but we can specify options for those cookies by adding a cookies property to our session options.
  cookie: {
    // maxAge sets the maximum age for the cookie to be valid. Here, the cookie (and session) will expire after one hour. The time should be given in milliseconds.
    maxAge: 60 * 60 * 1000,
    // httpOnly tells express-session to only store session cookies when the protocol being used to connect to the server is HTTP.
    httpOnly: true,
    // secure tells express-session to only initialize session cookies when the protocol being used is HTTPS. Having this set to true, and running a server without encryption will result in the cookies not showing up in your developer console.
    secure: false,
    // sameSite tells express-session to only initialize session cookies when the referrer provided by the client matches the domain out server is hosted from.
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  // Sets up session store
  store: new SequelizeStore({
    db: sequelize,
  }),
};




app.use(session(sess));
const hbs = exphbs.create({ helpers });
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'shawnpark2397@gmail.com',
//     pass: 'mblvlrbzehqvzelk',
//   },
//   debug: true,
// });


// Function to send a welcome email
// const sendWelcomeEmail = async (email) => {
//   try {
//     const mailOptions = {
//       from: 'shawnpark2397@gmail.com',
//       to: email,
//       subject: 'Welcome to The Workout Forum!',
//       text: 'Welcome to our website! We are glad to have you as a member, and very excited about your new workout journey with us',
//     };


//     await transporter.sendMail(mailOptions);
//     console.log('Welcome email sent successfully.');
//   } catch (error) {
//     console.error('Error sending welcome email:', error);
//   }
// };


// POST route for creating a new user
// app.post('/api/users', async (req, res) => {
//   try {
//     // Code to create the user in the database (your existing code)


//     // After successfully creating the user, trigger the welcome email
//     await sendWelcomeEmail(req.body.email);


//     // Respond with a success message or user data (your existing code)
//     res.status(200).json({ message: 'User created successfully' });
//   } catch (error) {
//     // Handle any errors (your existing code)
//     res.status(500).json({ error: 'Failed to create user' });
//   }
// });




app.get('/api/user-id', (req, res) => {
  if (req.session.user_id) {
    res.json({ user_id: req.session.user_id });
  } else {
    res.status(404).json({ message: 'User ID not found' });
  }
});








app.use(routes);
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
  });
 
