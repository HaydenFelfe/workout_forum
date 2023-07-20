const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'shawnpark2397@gmail.com',
    pass: 'mblvlrbzehqvzelk',
  },
  debug: true,
});


const sendWelcomeEmail = async (email) => {
  try {
    const mailOptions = {
      from: 'shawnpark2397@gmail.com',
      to: email,
      subject: 'Welcome to The Workout Forum!',
      text: 'Welcome to our website! We are glad to have you as a member, and very excited about your new workout journey with us',
    };


    await transporter.sendMail(mailOptions);
    console.log('Welcome email sent successfully.');
  } catch (error) {
    console.error('Error sending welcome email:', error);
  }
};


module.exports = sendWelcomeEmail;
