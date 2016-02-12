'use strict';

var Food = require('../model/food');

module.exports.createFood = function(request, response) {
    var foodName = request.body.foodName;
    var foodCategoryId = request.body.foodCategoryId;
};