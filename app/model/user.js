'use strict';

var settings = require('../../settings.json');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    firstName: {
        type: String,
        lowercase: true,
        required: true
    },
    lastName: {
        type: String,
        lowercase: true,
        required: true
    },
    email: {
        type: String,
        lowercase: true,
        required: true,
        unique: true,
        validate: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    password: {
        type: String,
        required: true
    },
    roles: [String]
});

userSchema.pre('save', function(next) {
    var self = this;
    if(!self.isModified('password')) {
        return next();
    }
    bcrypt.hash(self.password, settings.SALT_FACTOR, function(error, hash) {
        if(error) {
            return next(error);
        }
        self.password = hash;
        next();
    });
});

userSchema.methods.comparePassword = function(inputPassword, callback) {
    bcrypt.compare(inputPassword, this.password, function(error, result) {
        if(error) {
            return callback(error);
        }
        callback(result);
    });
}

userSchema.methods.getDto = function() {
    return {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email
    };
}

module.exports = mongoose.model('User', userSchema);