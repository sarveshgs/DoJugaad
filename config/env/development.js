var port = 8080;

module.exports = {
	port: port,
	db: 'mongodb://localhost/dojugaad',
	facebook: {
		clientID: '1593285864278038',
		clientSecret: 'a231d50802f4290c76ff4904946aeda5',
		callbackURL: 'http://localhost:'+ port +'/auth/facebook/callback/'

	},
	google: {
		clientID: '724699266914-vo6f70jquh2kr9eef0eq8hfgithu0r27.apps.googleusercontent.com',
		clientSecret: 'uvJjU0hVhjNmq4SwOBwZPerb',
		callbackURL: 'http://localhost:'+ port +'/auth/google/callback/'
	}
};
