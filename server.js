process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config = require('./config/config'),
	mongo = require('./config/mongo'),
	express = require('./config/express'),
	passport = require('./config/passport');

var db = mongo(),
	app = express(db),
	passport = passport(db);

app.listen(config.port);

module.exports = app;
console.log(process.env.NODE_ENV + ' server running at http://localhost:' + config.port);
