'use strict';

var fs = require('fs');
var Q = require('q');
var settings = require('../../settings');
var FoodClass = require(settings.ROOT_PATH + '/server/model/foodClass');
var FoodCategory = require(settings.ROOT_PATH + '/server/model/foodCategory');

module.exports.loadClasses = function() {
    var meat = new FoodClass({
        foodClassName: 'meat',
        foodCategories: [],
        detail: 'Everyone loves meat!',
        description: 'Who does not love meat?'
    });
    meat.save(function(error, result) {
        if(error) {
            console.error(error);
        } else {
            console.log('Meat class saved');
        }
    });
    
    var vegetable = new FoodClass({
        foodClassName: 'vegetable',
        foodCategories: [],
        detail: 'Most people love vegetables!',
        description: 'Who does not love vegetables?'
    });
    vegetable.save(function(error, result) {
        if(error) {
            console.error(error);
        } else {
            console.log('Vegetable class saved');
        }
    });
    
    var other = new FoodClass({
        foodClassName: 'other',
        foodCategories: [],
        detail: 'Other stuff',
        description: 'Other food that I have no idea'
    });
    other.save(function(error, result) {
        if(error) {
            console.error(error);
        } else {
            console.log('Other class saved');
        }
    });
};

module.exports.loadCategories = function() {
    var deferred = Q.defer();
    var groupPath = settings.ROOT_PATH + settings.USDA_GROUP_PATH;
    fs.readFile(groupPath, function(error, data) {
        if(error) {
            deferred.reject(error);
        } else {
            categoryParser(data.toString().trim());
            deferred.resolve(data);
        }
    });
    
    return deferred.promise;
};

function categoryParser(dataString) {
    var categoryStrings = dataString.split('\n');
    categoryStrings.forEach(function(categoryString) {
        var categoryName = categoryString.split('~')[2];
        var newFoodCategory = new FoodCategory({
            
        });
    });
}