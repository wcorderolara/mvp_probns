require('dotenv').load();
var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');

var models = require('./models');
var cors = require('cors');
var routesApi = require('./app/api/routes');

require('./config/passport');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use(passport.initialize());

routesApi(app);

models.sequelize.sync();

var port = process.env.PORT || 3000;

var server = app.listen(port, function(err){
	if(err){
		console.error(err);
	}else{
		console.log('%s listening at %s', server.name, server.url);
	}
})
