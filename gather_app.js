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
//mongoose.connect(dbDevURL);
app.use(express.static(__dirname + '/public'));
app.use(logger('dev'));
app.use(bodyParser());

// define model
var Emails = mongoose.model('Emails', {
	name	: String,
	e_mail	: String,
	gender	: String,
	rstatus : String,
	city	: String,
	neighborhood : String
})

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
		gender 	: req.body.gender,
		rstatus : req.body.rstatus, 
		city	: req.body.city,
		neighborhood: req.body.neighborhood,
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

app.get('/about', function(req,res) {
	res.sendfile(__dirname + '/public/about.html');
});

app.get('/emails', function(req,res) {
	res.sendfile(__dirname + '/public/list.html');
});


//listen
app.listen(port);
console.log('App listening on port ' + port);