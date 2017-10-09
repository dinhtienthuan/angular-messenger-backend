var express = require('express');
var router = express.Router();

var User = require('../models/user');
var bcrypt = require('bcryptjs');

router.post('/', function(req, res, next) {
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

module.exports = router;