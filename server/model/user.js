'use strict';

var mongoose = require('mongoose');
var authService = require('../authentication/service');
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
    
    authService.hashPassword(self.password).then(function(hash) {
        self.password = hash;
        next();
    }, function(error) {
        next(error);
    });
});

userSchema.methods.comparePassword = function(inputPassword) {
    return authService.comparePassword(inputPassword, this.password);
}

userSchema.methods.getDto = function() {
    return {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email
    };
}

module.exports = mongoose.model('User', userSchema);