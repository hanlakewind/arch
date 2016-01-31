'use strict';

var controller = require('./controller');

module.exports = function(app) {
    app.post('/auth/create', function(request, response) {
        controller.createUser(request, response);
    });
}