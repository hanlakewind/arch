'use strict';

var fs = require('fs');
var Q = require('q');
var settings = require('./settings.json');

module.exports.loadClasses = function(filePath) {
    var deferred = Q.defer();
    fs.readFile(settings.USDA_GROUP_PATH, function(error, data) {
        if(error) {
            deferred.reject(error);
        } else {
            deferred.resolve(data);
        }
    });
    
    return deferred.promise;
};