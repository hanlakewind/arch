'use strict';

var fs = require('fs');
var Q = require('q');
var settings = require('../../settings');

module.exports.loadClasses = function(filePath) {
    var deferred = Q.defer();
    var groupPath = settings.ROOT_PATH + settings.USDA_GROUP_PATH;
    fs.readFile(groupPath, function(error, data) {
        if(error) {
            deferred.reject(error);
        } else {
            deferred.resolve(data);
        }
    });
    
    return deferred.promise;
};

function classParser(data) {
    
}