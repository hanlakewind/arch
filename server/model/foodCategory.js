'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var foodCategorySchema = new Schema({
    foodCategoryName: {
        type: String,
        lowercase: true,
        required: true
    },
    foodClass: ObjectId,
    foods: [ObjectId],
    detail: String,
    description: String
});

foodCategorySchema.methods.getDto = function() {
    return this;
}

module.exports = mongoose.model('FoodCategory', foodCategorySchema);