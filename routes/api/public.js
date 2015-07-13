var passport = require('passport');
var models = require('../../core/models');

module.exports.init = function(router) {

	router.post('/newuser', function(req, res, next) {
		var user = new models.User({
			username: req.body.username,
			password: req.body.password
		});
		user.save(function(err) {
			if (err) { return next(err); }
			req.login(user, next);
		});
	});

	router.post('/login',
		passport.authenticate('local', { 
			successRedirect: '/',
			failureRedirect: '/login',
			failureFlash: true 
		})
	);

	router.post('/accountDetails', function(req, res, next) {
		// do something
		return next();
	});
};
