const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/', function(req, res, next) {
  console.log(req.body);

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
    text: req.body.message
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  res.status(200).send('EVENT_RECEIVED');
});

module.exports = router;
