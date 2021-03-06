var express = require('express');
var router = express.Router();

var MODEL_PATH = '../models/';
var User = require(MODEL_PATH + '/user');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

router.post('/sign-up', function(req, res, next) {
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: bcrypt.hashSync(req.body.password, 10),
    email: req.body.email
  });

  user.save(function(err, result) {
    if (err) {
      return res.status(500)
        .json({
          title: 'An error occurred',
          error: err
        });
    }

    res.status(201)
      .json({
        message: 'Saved user',
        obj: result
      });
  });
});

router.post('/sign-in', function(req, res, next) {
  User.findOne({ email: req.body.email }, function(err, user) {
    if (err) {
      return res.status(500)
        .json({
          title: 'An error occurred',
          error: err
        });
    }

    if (!user) {
      return res.status(401)
        .json({
          title: 'Login failed',
          error: {
            message: 'Wrong login credentials'
          }
        });
    }

    if (!bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(401)
        .json({
          title: 'Login failed',
          error: {
            message: 'Wrong login credentials'
          }
        });
    }

    var token = jwt.sign({ user: user }, 'Enclaveit453', { expiresIn: 7200 });
    res.status(200).json({
      message: 'Successfully logged in',
      token: token,
      userId: user._id
    });
  });
});

module.exports = router;