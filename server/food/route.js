'use strict';

var controller = require('./controller');

module.exports = function(app) {
    app.post('/food/create', function(request, response) {
        controller.createFood(request, response);
    });
};