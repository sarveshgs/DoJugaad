var config = require('./config'),
	express = require('express'),
	bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
	passport = require('passport'),
	flash = require('connect-flash'),
	session = require('express-session'),
    nodemailer = require("nodemailer"),
	mongojs = require('mongojs');

module.exports = function(db) {
	var app = express();

	app.use(bodyParser.urlencoded({
		extended: true
	}));

	app.use(bodyParser.json());

	app.use(session({
		saveUninitialized: true,
		resave: true,
		secret: 'DoJugaadDoJugaad'
	}));

	app.set('views', './app/views');
	app.set('view engine', 'ejs');

	app.use(flash());
	app.use(passport.initialize());
	app.use(passport.session());

	require('../app/routes/routes.js')(app,passport,db,mongojs,nodemailer);


	//app.use(express.static('./public'));
	app.use(express.static('./public'));

	return app;
};
