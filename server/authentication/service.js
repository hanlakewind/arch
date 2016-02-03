'use strict';

var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var Q = require('q');
var settings = require('../../settings.json');
var secretKey = require('../../secret.key.json');

var JWT_SIGN_OPTIONS = {
    algorithm: 'HS256',
    expiresIn: 1800,
    issuer: secretKey.JWT_ISSUER
};

var JWT_VERIFY_OPTIONS = {
    algorithms: ['HS256'],
    issuer: secretKey.JWT_ISSUER
};

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
};

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
};

module.exports.generateAccessToken = function(userDto) {
    var deferred = Q.defer();
    jwt.sign(userDto, secretKey.JWT_SECRET_KEY, JWT_SIGN_OPTIONS, function(token) {
        if(token) {
            deferred.resolve(token);
        } else {
            deferred.reject();
        }
    });
    
    return deferred.promise;
};

module.exports.verifyAccessToken = function(accessToken) {
    var deferred = Q.defer();
    jwt.verify(accessToken, secretKey.JWT_SECRET_KEY, JWT_VERIFY_OPTIONS, function(error, decoded) {
        if(error) {
            deferred.reject(error);
        } else {
            deferred.resolve(decoded);
        }
    });
    
    return deferred.promise;
};