var util = require('util');

module.exports = function (app) {

	app.get('/', function (req, res, next) {
		if (req.session.authenticated) {
			res.render('index');
		} else {
			res.render('login');
		}
	});

	app.get('/login', function (req, res, next) {
		res.render('login');
	});

	app.post('/login', function (req, res, next) {

		// you might like to do a database look-up or something more scalable here
		req.body.password = req.body.password.toLowerCase();

		if (req.body.password && req.body.password === 'hi2018') {
			req.session.authenticated = true;
			res.redirect('/');
		} else {
			res.redirect('/login');
		}

	});

	app.get('/logout', function (req, res, next) {
		delete req.session.authenticated;
		res.redirect('/');
	});

};
