var importcsv = require('./importcsv.js');
var getIPDetails1 = require('./getIPDetails');
var V = require('jsonschema').Validator;
var validator = new V();
var dbConfigValidation = require('./validation.js').dbConfigValidation;
var util = require('./util.js');

exports.getIPDetails = (inputDbConfig, ip, cb) => {
    if (!ip || ip.toString().trim().length == 0)
        return cb(true, "Invalid IP");
    getIPDetails1.getIPDetails(inputDbConfig,ip, (err, res) => {
        return cb(err, res);
    });
};

exports.importData = (dbConfig, filePath, cb) => {
    console.log("isnide importData");
    var validation_result = validator.validate(dbConfig, dbConfigValidation);

    var errors = [];

    if (validation_result.errors.length > 0) {
        console.log(1);
        errors = util.makeErrorObject(validation_result.errors);
        console.log(11);
        console.log(errors);
        console.log(12);
    }

    if (!filePath || filePath.toString().trim().length == 0) {
        console.log(2);

        errors.push("Invalid File Path");
    }
    console.log(3);
    if (errors.length > 0) {
        console.log(4);

        console.log("errors");
        return cb(true, errors)
    } else {
        console.log(5);

        importcsv.importData(dbConfig, filePath, (err, res) => {
            return cb(err, res);
        });
    }

};