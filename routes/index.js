var express = require('express');
var router = express.Router();
var passport = require('../init/passportinit');
var models = require('../core/models');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Activate' });
});

router.get('/login', function(req, res) {
   res.render('login', { route: "/login" }); 
});

router.get('/newuser', function(req, res) {
   res.render('login', { route: "/newuser" }); 
});

router.post('/newuser', function(req, res) {
    var user = new models.User({
        username: req.body.username,
        tempPasswd: req.body.password
    });
    user.save(function(err) {
       if (err) { return next(err); } 
       req.login(user, function(err) {
            if (err) { return next(err); }
            return res.redirect('/');
        });
    });
});

router.post('/login', 
    passport.authenticate('local', { 
        successRedirect: '/',
        failureRedirect: '/login' 
}));

module.exports = router;
