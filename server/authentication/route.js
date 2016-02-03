'use strict';

var controller = require('./controller');

module.exports = function(app) {
    app.post('/auth/create', function(request, response) {
        controller.createUser(request, response);
    });
    
    app.post('/auth/signIn', function(request, response) {
        controller.getToken(request, response);
    });
    
    app.get('/auth/user', function(request, response) {
        
    });
};