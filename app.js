var express = require('express');
var cookie = require('cookie-session');
var port = 8999;

var app = express.createServer();

function checkAuth (req, res, next) {
	// don't serve /secure to those not logged in
	// you should add to this list, for each and every secure url
	if (req.url === '/secure' && (!req.session || !req.session.authenticated)) {
		res.render('login', { status: 403 });
		return;
	}

	next();
}

app.configure(function () {

	app.use(express.cookieParser());
	app.use(cookie({ secret: 'example' }));
	app.use(express.bodyParser());
	app.use(checkAuth);
	app.use(app.router);
	app.use(express.static(__dirname + "/public"));
	app.set('view engine', 'ejs');
	app.set('view options', { layout: false });

});

require('./lib/routes.js')(app);

app.listen(process.env.PORT || port);
