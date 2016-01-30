var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.export = userModel;

var userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    roles: [String],
    auth: Auth
});

var userModel = mongoose.model('User', userSchema);