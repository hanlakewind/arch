'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var foodClassSchema = new Schema({
    _id: {
        type: ObjectId,
        required: true
    },
    foodClassName: {
        type: String,
        lowercase: true,
        required: true
    },
    foodCategory: [ObjectId],
    detail: String,
    description: String
});

foodClassSchema.methods.getDto = function() {
    return this;
}

module.exports = mongoose.model('FoodClass', foodClassSchema);