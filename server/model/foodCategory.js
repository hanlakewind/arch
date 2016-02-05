'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var foodCategorySchema = new Schema({
    _id: {
        type: ObjectId,
        required: true
    },
    foodCategoryName: {
        type: String,
        lowercase: true,
        required: true
    },
    foodClass: ObjectId,
    detail: String,
    description: String
});

foodCategorySchema.methods.getDto = function() {
    return this;
}

module.exports = mongoose.model('FoodCategory', foodCategorySchema);