var models = require('../core/models');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');

passport.use(new LocalStrategy(
    function(username, password, done) {
        models.User.findOne({ username: username }, function (err, user) {
			if (err) { return done(err); }
			if (!user) {
				return done(null, false, { message: 'Incorrect username.' });
			}
			bcrypt.compare(password, user.password, function(err, res) {
				if (err) {
					return done(err);
				}
				if (!res) {
					return done(null, false, { message: 'Incorrect password.' });
				}
				return done(null, user);
			});
		});
	}
));

passport.serializeUser(function(user, done) {
   done(null, user.id); 
});

passport.deserializeUser(function(id, done) {
    models.User.findById(id, function(err, user) {
        done(err, user);
    });
});

module.exports.init = function(app) {
	app.use(passport.initialize());
	app.use(passport.session());
};
