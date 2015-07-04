var models = require('../core/models');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
    function(username, password, done) {
        console.log("Attempting to authenticate with username and password");
        models.User.findOne({ username: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.validPassword(password)) {
            return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
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

module.exports = passport;