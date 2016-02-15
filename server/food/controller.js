'use strict';

var mongoose = require('mongoose');
var Food = require('../model/food');
var ObjectId = mongoose.Types.ObjectId;

module.exports.createFood = function(request, response) {
    var foodCategoryId = request.body.foodCategoryId;
    FoodCategory.findOne({
        _id: ObjectId(foodCategoryId)
    }, function(error, foundFoodCategory) {
        if(error) {
            return request.status(500).send(error);
        } else {

        }
    });
};