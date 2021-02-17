const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/', function(req, res, next) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'dangcao11111@gmail.com',
      pass: 'haidang113'
    }
  });

  const mailOptions = {
    from: 'dangcao77777@gmail.com',
    to: email,
    subject: subject,
    html: comment
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
