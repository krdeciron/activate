var passport = require('passport');
var models = require('../../core/models');
var bcrypt = require('bcrypt');

module.exports.init = function(router) {

	router.post('/newuser', 
		// Password hashing middleware.
		// TODO: Move somewhere else to be reused.
		function(req, res, next) {
			if (req.body.password) {
				bcrypt.hash(req.body.password, 10, function(err, hash) {
					if (err) {
						next(err);
					}
					else {
						req.body.password = hash;
						next();
					}
				});
			}
			else {
				next('Invalid password.');
			}
		},
		function(req, res, next) {
			var user = new models.User({
				username: req.body.username,
				password: req.body.password
			});
			user.save(function(err) {
				if (err) { return next(err); }
				req.login(user, next);
			});
		}
	);

	router.post('/login', passport.authenticate('local'));

	router.post('/accountDetails', function(req, res, next) {
		// do something
		return next();
	});
};
