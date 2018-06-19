var express = require('express');
var port = 8999;

var app = express.createServer();

app.configure(function () {
	app.use(express.bodyParser());
	app.use(app.router);
	app.use(express.static(__dirname + "/public"));
	app.set('view engine', 'ejs');
	app.set('view options', { layout: false });

});

require('./lib/routes.js')(app);

app.listen(process.env.PORT || port);
