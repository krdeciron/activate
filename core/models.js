var mongoose = require('mongoose');

var activitySchema = new mongoose.Schema({
    
});

var structureSchema = new mongoose.Schema({
    
});

var userSchema = new mongoose.Schema({
   username: { type: String, required: true },
   password: { type: String, required: true },
   firstName: String,
   lastName: String
});

userSchema.methods.validPassword = function(password) {
    return password === this.tempPasswd;
};

mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    console.log('mongoose connection successful');
});

module.exports.User = mongoose.model('User', userSchema);
