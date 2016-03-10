require('dotenv').load();
var restify = require('restify');
var fs = require('fs');
var models = require('./models');
var passport = require('passport');
var middleware = require('./app/middlewares/middleware');
var jwt = require('restify-jwt');
var auth = jwt({
	secret: process.env.JWT_SECRET,
	requestProperty: 'payload'
});
var controllers = {},
	controllers_path = process.cwd() + '/app/controllers';

fs.readdirSync(controllers_path).forEach(function (file){
	if(file.indexOf('.js') != -1){
		controllers[file.split('.')[0]] = require(controllers_path + '/' + file)
	}
})
require('./config/passport');

var server = restify.createServer();
server.use(restify.fullResponse());

restify.CORS.ALLOW_HEADERS.push('accept');
restify.CORS.ALLOW_HEADERS.push('sid');
restify.CORS.ALLOW_HEADERS.push('lang');
restify.CORS.ALLOW_HEADERS.push('origin');
restify.CORS.ALLOW_HEADERS.push('withcredentials');
restify.CORS.ALLOW_HEADERS.push('x-requested-with');

server.use(restify.urlEncodedBodyParser({ mapParams : false }));
/*server.use(passport.initialize());
server.use(function (err, req, res, next){
	if(err.name === 'UnauthorizedError'){
		res.status(401);
		res.json({
			"message": err.name + ": " + err.message
		})
	}
})*/

//Paises
server.get("/paises", controllers.pais.getPaises);
server.get("/paises/:id", controllers.pais.getPaisById);
server.post("/paises", controllers.pais.postPais);
server.put("/update/paises/:id", controllers.pais.putPais);
server.put("/del/paises/:id", controllers.pais.deletePais);

//Departamentos
server.get("/departamentos/all/:paisId", controllers.departamento.getDepartamentos);
server.get("/departamentos/:id", controllers.departamento.getDepartamentoById);
server.post("/departamentos", controllers.departamento.postDepartamento);
server.put("/update/departamentos/:id", controllers.departamento.putDepartamento);
server.put("/del/departamentos/:id", controllers.departamento.deleteDepartamento);

//Municipios
server.get("/municipios/all/:DepartamentoId", controllers.municipio.getMunicipios);
server.get("/municipios/:id", controllers.municipio.getMunicipioById);
server.post("/municipios", controllers.municipio.postMunicipio);
server.put("/update/municipios/:id", controllers.municipio.putMunicipio);
server.put("/del/municipios/:id", controllers.municipio.deleteMunicipio);


//TipoUsuario
server.get("/tiposusuario", controllers.tipoUsuario.getTiposUsuario);
server.get("/tipousuario/:id", controllers.tipoUsuario.getTipoUsuarioById);
server.post("/tipousuario", controllers.tipoUsuario.postTipoUsuario);
server.put("/tipousuario", controllers.tipoUsuario.putTipoUsuario);
server.put("/tipousuario", controllers.tipoUsuario.deleteTipoUsuario);

//Cliente
server.get("/usuario/all/getClientes", controllers.usuario.getUsuarios);
server.get("/usuario/all/getVendedores/:padreId", controllers.usuario.getVendedoresByPadre);
server.get("/usuario/get/clienteById/:id", controllers.usuario.getUsuarioById);
server.get("/usuario/getVendedor/:padreId/:id", controllers.usuario.getVendedorById);
server.post("/usuario/post/cliente", controllers.usuario.postCliente);
server.post("/usuario/post/vendedor", controllers.usuario.postVendedor);
server.post("auth/login", controllers.usuario.loginUser);
server.post("/usuario/upload/avatar", controllers.usuario.uploadAvatar);
server.put("/usuario/verificaEmail/:id", controllers.usuario.putVerificarEmailUsuario);
server.put("/usuario/update/:id", controllers.usuario.putUsuario);
server.put("/usuario/changePassword/:id", controllers.usuario.changePassword);
server.put("/usuario/delete/:id", controllers.usuario.deleteUsuario);

//Inmuebles
server.post("/inmuebles/post/inmueble", controllers.inmueble.postInmueble);
server.post("/inmuebles/image", controllers.inmueble.uploadImage);
server.get("/inmuebles/get/all/:usuarioId", controllers.inmueble.getInmueblesUsuario);
server.get("/inmuebles/get/:id",middleware.trackingInmueble, controllers.inmueble.getInmuebleById);
server.get("/inmuebles/get/all/count/:usuarioId",controllers.inmueble.getTotalInmueblesUsuario);
server.put("/inmuebles/put/:id",controllers.inmueble.putInmueble);
server.put("/inmuebles/delete/:id", controllers.inmueble.deleteInmueble);

//Buscador
server.get("/buscador/get/all/:agenciaAsociadaId",controllers.buscador.getBuscadoresByAgencia);
server.get("/buscador/get/:id", controllers.buscador.getBuscadorById);
server.get("/buscador/get/inmuebles/:buscadorId", controllers.buscador.getInmueblesBuscador);
server.get("/buscador/get/all/count/:agenciaAsociadaId", controllers.buscador.getTotalBuscadoresCliente);
server.post("/buscador/post", controllers.buscador.postBuscador);
server.post("/buscador/add/inmuble/:inmuebleId", controllers.buscador.addInmuebleBuscador);
server.put("/buscador/put/:id", controllers.buscador.putBuscador);
server.put("/buscador/delete/:id", controllers.buscador.deleteBuscador);



models.sequelize.sync();

var port = process.env.PORT || 3000;

server.listen(port, function(err){
	if(err){
		console.error(err);
	}else{
		console.log('%s listening at %s', server.name, server.url);
	}
})
