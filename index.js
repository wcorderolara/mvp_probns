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
server.get("/paises", controllers.pais.getPaises);
server.get("/paises/:id", controllers.pais.getPaisById);
server.post("/paises", controllers.pais.postPais);
server.put("/paises", controllers.pais.putPais);
server.put("/paises", controllers.pais.deletePais);


//TipoUsuario
server.get("/tiposusuario", controllers.tipoUsuario.getTiposUsuario);
server.get("/tipousuario/:id", controllers.tipoUsuario.getTipoUsuarioById);
server.post("/tipousuario", controllers.tipoUsuario.postTipoUsuario);
server.put("/tipousuario", controllers.tipoUsuario.putTipoUsuario);
server.put("/tipousuario", controllers.tipoUsuario.deleteTipoUsuario);

models.sequelize.sync();

var port = process.env.PORT || 3000;

server.listen(port, function(err){
	if(err){
		console.error(err);
	}else{
		console.log('%s listening at %s', server.name, server.url);
	}
})
