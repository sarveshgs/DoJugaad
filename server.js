#!/bin/env node

var config = require('./config/config'),
	mongo = require('./config/mongo'),
	express = require('./config/express'),
	passport = require('./config/passport');

var db = mongo(),
	app = express(db),
	passport = passport(db);

app.get('/env',function(req, res){
   res.json(process.env);
});

//app.listen(config.port);

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port      = process.env.OPENSHIFT_NODEJS_PORT || 8080;

app.listen(port, ipaddress);

module.exports = app;
console.log('Server running at '+ ipaddress + 'port:' + port);
