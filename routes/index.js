var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.get('/message', function (req, res, next) {
    res.render('node', {message: 'Hello!'});
});

router.get('/message/:msg', function (req, res, next) {
    var message = req.params.msg
    console.log(message);
    res.render('node', {message: message});
});

router.post('/message', function (req, res, next) {
    var message = req.body.message;
    res.redirect('/message/' + message);
});


module.exports = router;
