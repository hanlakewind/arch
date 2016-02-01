'use strict';

var jwt = require('jsonwebtoken');
var User = require('../model/user');
var authService = require('../authentication/service');

module.exports.createUser = function(request, response) {
    var newUser = new User({
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        email: request.body.email,
        password: request.body.password
    });
    newUser.save(function(error, result) {
        if(error) {
            response.status(400).send(error);
        } else {
            response.send(result.getDto());
        }
    })
}

module.exports.getToken = function(request, response) {
    User.findOne({
        email: request.body.email
    }, function(searchError, foundUser) {
        if(searchError) {
            return response.status(500).send(searchError);
        }
        if(!foundUser) {
            return response.status(404).send();
        }
        
        foundUser.comparePassword(request.body.password).then(function(result) {
            if(result) {
                authService.generateAccessToken(foundUser.getDto()).then(function(token) {
                    response.send(token);
                }, function() {
                    response.status(500).send('Cannot generate access token.');
                });
            } else {
                response.status(401).send('Wrong password!');
            }
        }, function(compareError) {
            response.status(500).send(compareError);
        });
    });
}