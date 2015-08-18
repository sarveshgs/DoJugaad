var config = require('./config'),
             mongojs = require('mongojs');

module.exports = function() {
    var mongodbConnectionString = process.env.OPENSHIFT_MONGODB_DB_URL;
    if (typeof mongodbConnectionString == "undefined")
     {
        mongodbConnectionString = "dojugaad";
     }
    var db = mongojs(mongodbConnectionString, ["postData","userData","sessionData"]);
    return db;
};
