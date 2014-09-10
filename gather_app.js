//server.js

// set up
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var logger = require('morgan');
var port = process.env.PORT || 8080;

//configuration
mongoose.connect(String(process.env.MONGOHQ_URL));
app.use(express.static(__dirname + '/public'));
app.use(logger('dev'));
app.use(bodyParser());

// define model
var Emails = mongoose.model('Emails', {
	name	: String,
	e_mail	: String,
	city	: String,
	hometown : String, 
	industry : String,
	SO		: String,
	PI 		: String,
	rstatus : String,
	kids	: String,
	pref	: String,
	aHH		: String,
	aDrinks	: String,
	aDinner	: String,
	aBrunch	: String,
	aPark	: String,
	aHike	: String,
	aMusGal	: String,
	aConcert : String,
	aCoffee	: String
});

//routes
//api
//get all todos
app.get('/api/emails', function(req,res) {
	//get all todos in database
	Emails.find(function(err,emails) {
		if(err)
			res.send(err)

		res.json(emails);
	});
});

//create todo and send back all after creation
app.post('/api/emails', function(req,res) {
	Emails.create({
		name	: req.body.name,
		e_mail	: req.body.e_mail,
		prof 	: req.body.prof,
		city	: req.body.city,
		hometown : req.body.hometown,
		industry : req.body.industry,
		SO		: req.body.SO,
		PI 		: req.body.PI,
		rstatus : req.body.rstatus, 
		kids	: req.body.kids,
		pref	: req.body.pref,
		aHH		: req.body.aHH,
		aDrinks	: req.body.aDrinks,
		aDinner	: req.body.aDinner,
		aBrunch	: req.body.aBrunch,
		aPark	: req.body.aPark,
		aHike	: req.body.aHike,
		aMusGal	: req.body.aMusGal,
		aConcert : req.body.aConcert,
		aCoffee : req.body.aCoffee,
		done	: false
	}, function(err,todo) {
		if(err)
			res.send(err)

		res.send(200);
	});
});

//application
app.get('/', function(req,res) {
	res.sendfile('/public/index.html');
});

app.get('/join', function(req,res) {
	res.sendfile(__dirname + '/public/join.html');
});

app.get('/about', function(req,res) {
	res.sendfile(__dirname + '/public/about.html');
});

app.get('/emails', function(req,res) {
	res.sendfile(__dirname + '/public/list.html');
});


//listen
app.listen(port);
console.log('App listening on port ' + port);