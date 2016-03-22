require('dotenv').load();
var restify = require('restify');
var models = require('./models');
var passport = require('passport');
var cors = require('cors');
var bodyParser = require('body-parser');
var routesApi = require('./app/api/routes');

require('./config/passport');

var server = restify.createServer();
server.use(restify.fullResponse());
server.use(cors());

restify.CORS.ALLOW_HEADERS.push('accept');
restify.CORS.ALLOW_HEADERS.push('sid');
restify.CORS.ALLOW_HEADERS.push('lang');
restify.CORS.ALLOW_HEADERS.push('origin');
restify.CORS.ALLOW_HEADERS.push('withcredentials');
restify.CORS.ALLOW_HEADERS.push('x-requested-with');

server.use(restify.urlEncodedBodyParser({ mapParams : false }));
server.use(passport.initialize());

routesApi(server);

models.sequelize.sync();

var port = process.env.PORT || 3000;

server.listen(port, function(err){
	if(err){
		console.error(err);
	}else{
		console.log('%s listening at %s', server.name, server.url);
	}
})
