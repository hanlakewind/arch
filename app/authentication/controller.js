'use strict';

var User = require('../model/user');

module.exports.createUser = function(request, response) {
    console.log('HERE!!!!' + request.body.firstName);
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