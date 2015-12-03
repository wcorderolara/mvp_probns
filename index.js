var restify = require('restify');
var fs = require('fs');
var models = require('./models');

var controllers = {},
	controllers_path = process.cwd() + '/app/controllers';

fs.readdirSync(controllers_path).forEach(function (file){
	if(file.indexOf('.js') != -1){
		controllers[file.split('.')[0]] = require(controllers_path + '/' + file)
	}
})


var server = restify.createServer();
server.use(restify.fullResponse());
server.use(restify.bodyParser());

//Paises
server.get("/countries", controllers.pais.getPaises);
server.get("/countries/:id", controllers.pais.getPaisById);
server.post("/countries", controllers.pais.postPais);
server.put("/countries", controllers.pais.putPais);
server.put("/countries", controllers.pais.deletePais);


//Comments
// server.post("/comments", controllers.comment.createComment);
// server.put("/comments/:id", controllers.comment.viewComment);
// server.del("/comments/:id", controllers.comment.deleteComment);
// server.get("/comments/:id", controllers.comment.viewComment);

models.sequelize.sync();

var port = process.env.PORT || 3000;

server.listen(port, function(err){
	if(err){
		console.error(err);
	}else{
		console.log('%s listening at %s', server.name, server.url);
	}
})
