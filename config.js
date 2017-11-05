// Set all environment configuration.
"use strict";
var TAG = 'config.js';

var mongoClient = require('mongodb').MongoClient;
var async = require('async');
var ipDetailsColl = "Test";

// The environment configuration can be set in Amazon S3.
// var env = process.argv[2];
// if (!(env === 'prd' || env === 'loc')) {
//     throw new Error("The environment should be one of 'prd'(Production) or 'loc'(Local)..");
// }

// console.log(TAG + " " + "Deployment Environment is: " + env);

// set config based on the environment.
// var dbConfig = {
//     "prd": {
//         "type": "singleInstance",
//         "user": "",
//         "pwd": "",
//         "mongod": ["mongo"],
//         "database": "FindHotel"
//     },
//     "loc": {
//         "type": "singleInstance",
//         "user": "",
//         "pwd": "",
//         "mongod": ["mongo"],
//         "database": "FindHotel"
//     }
// };


var getBbConnUrl = (inputDbConfig) => {

    var connParams = inputDbConfig;
    var mongod = connParams.mongod;
    // var mongoDbConn = null;
    var hosts = null;

    // To get the mongo hosts dynamically for both single instance or replica sets.
    for (var i = 0; i < mongod.length; i++) {
        if (i === 0) {
            hosts = mongod[0];
        } else {
            hosts = hosts + ',' + mongod[i];
        }
    }

    // set mongo connection url.
    var dbConnUrl = null;
    if (!(connParams.user === "" && connParams.pwd === "")) {
        dbConnUrl = 'mongodb://' + connParams.user + ':' + connParams.pwd + '@' + hosts + '/' + connParams.database;
        console.log(dbConnUrl);
    } else {
        dbConnUrl = 'mongodb://' + hosts + '/' + connParams.database;
    }

    return dbConnUrl;
};

// create and export mongo connection.
exports.createMongoConn = function (inputDbConfig, callback) {

    exports.ipDetailsColl = inputDbConfig.ipDetailsColl;

    var dbConnUrl = getBbConnUrl(inputDbConfig);
    mongoClient.connect(dbConnUrl, function (err, database) {
        if (err) {
            callback(err);
        } else {
            console.log('Connection established to: ', dbConnUrl);
            exports.mongoDbConn = database;
            console.log('DB connection successfull.');
            callback(false);
        }
    });
};

exports.createUniqueIndex = function (db, callback) {
    var collection = db.collection(ipDetailsColl);
    // Create the index
    collection.createIndex({
            ip_address: 1
        }, {
            unique: true
        },
        function (err, result) {
            console.log(result);
            callback(result);
        });
};