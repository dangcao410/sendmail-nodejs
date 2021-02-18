const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {success_msg: '', error_msg: ''});
});

router.post('/', function(req, res, next) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.MAIL_SEND_USERNAME,
      pass: process.env.MAIL_SEND_PASSWORD
    }
  });

  const mailOptions = {
    from: process.env.MAIL_SEND_USERNAME,
    to: process.env.MAIL_RECEIVE_USERNAME,
    subject: req.body.subject,
    html: `<strong>Name: </strong> ${req.body.name} <br><strong>Email: </strong> ${req.body.email} <br><br><strong>Message: </strong><br>${req.body.message}`
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      const error_msg = 'Something went wrong. Please try again.';
      console.log(error);

      res.status(200).render('index', {success_msg: '', error_msg: error_msg});
    } else {
      const success_msg = 'Message sent. Thank you for contacting me.';
      console.log('Email sent: ' + info.response);

      res.status(200).render('index', {success_msg: success_msg, error_msg: ''});
    }
  });

});

module.exports = router;
