var models = require('../core/models');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');

var passhash = function(req, res, next) {
	if (req.body.password) {
		bcrypt.genSalt(10, function(err, salt) {
			if (err) {
				next(err);
			}
			else {
				bcrypt.hash(req.body.password, salt, function(err, hash) {
					if (err) {
						next(err);
					}
					else {
						req.body.password = hash;
						next();
					}
				});
			}
		});
	}
	else {
		next();
	}
};

passport.use(new LocalStrategy(
    function(username, password, done) {
        console.log("Attempting to authenticate with username and password");
        models.User.findOne({ username: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
        }
		bcrypt.compare(password, user.password, function(err, res) {
			if (res) {
				return done(null, user);
			}
			else {
				return done(null, false, { message: 'Incorrect password.' });
			}
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
	app.use(passhash);
};
