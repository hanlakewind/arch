'use strict';

var bcrypt = require('bcrypt');
var Q = require('q');
var settings = require('../../settings.json');

module.exports.hashPassword = function(inputPassword) {
    var deferred = Q.defer();
    bcrypt.hash(inputPassword, settings.SALT_FACTOR, function(error, hash) {
        if(error) {
            deferred.reject(error);
        } else {
            deferred.resolve(hash);
        }
    });
    
    return deferred.promise;
}

module.exports.comparePassword = function(inputPassword, userPassword) {
    var deferred = Q.defer();
    bcrypt.compare(inputPassword, userPassword, function(error, result) {
        if(error) {
            deferred.reject(error);
        } else {
            deferred.resolve(result);
        }
    });
    
    return deferred.promise;
}