'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var foodSchema = new Schema({
    foodName: {
        type: String,
        lowercase: true,
        required: true
    },
    calorie: {
        type: Number,
        required: true
    },
    gramsPerServing: Number,
    foodClass: ObjectId,
    foodCategory: ObjectId,
    detail: String,
    description: String
});

foodSchema.methods.getDto = function() {
    return this;
}

module.exports = mongoose.model('Food', foodSchema);