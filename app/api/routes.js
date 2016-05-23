var express = require('express');
var router = express.Router();
var fs = require('fs');
var middleware = require('../middlewares/middleware');
var jwt = require('express-jwt');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var auth = jwt({
	secret: process.env.JWT_SECRET,
	userProperty: 'payload'
});
var controllers = {},
	controllers_path = process.cwd() + '/app/controllers';

fs.readdirSync(controllers_path).forEach(function (file){
	if(file.indexOf('.js') != -1){
		controllers[file.split('.')[0]] = require(controllers_path + '/' + file)
	}
})

var routesController = function (server){
	//Tipo Inmueble
	server.get("/tipoInmueble/get/all",controllers.tipoInmueble.getTipoInmueble);

	//Opearcion Inmueble
	server.get("/operacionInmueble/get/all", controllers.operacionInmueble.getOperacionesInmueble);

	//Paises
	server.get("/paises", controllers.pais.getPaises);
	server.get("/paises/:id", auth, controllers.pais.getPaisById);
	server.post("/paises", auth, controllers.pais.postPais);
	server.put("/update/paises/:id", auth, controllers.pais.putPais);
	server.put("/del/paises/:id", auth, controllers.pais.deletePais);

	//Departamentos
	server.get("/departamentos/all/:paisId", auth, controllers.departamento.getDepartamentos);
	server.get("/departamentos/:id", auth, controllers.departamento.getDepartamentoById);
	server.post("/departamentos", auth, controllers.departamento.postDepartamento);
	server.put("/update/departamentos/:id", auth, controllers.departamento.putDepartamento);
	server.put("/del/departamentos/:id", auth, controllers.departamento.deleteDepartamento);

	//Municipios
	server.get("/municipios/all/:DepartamentoId", auth, controllers.municipio.getMunicipios);
	server.get("/municipios/:id", auth, controllers.municipio.getMunicipioById);
	server.post("/municipios", auth, controllers.municipio.postMunicipio);
	server.put("/update/municipios/:id", auth, controllers.municipio.putMunicipio);
	server.put("/del/municipios/:id", auth, controllers.municipio.deleteMunicipio);


	//TipoUsuario
	server.get("/tiposusuario", controllers.tipoUsuario.getTiposUsuario);
	server.get("/tipousuario/:id", auth, controllers.tipoUsuario.getTipoUsuarioById);
	server.post("/tipousuario", auth, controllers.tipoUsuario.postTipoUsuario);
	server.put("/tipousuario", auth, controllers.tipoUsuario.putTipoUsuario);
	server.put("/tipousuario", auth, controllers.tipoUsuario.deleteTipoUsuario);

	//Cliente
	server.get("/usuario/all/getClientes", auth, controllers.usuario.getUsuarios);
	server.get("/usuario/all/getVendedores/:padreId", auth, controllers.usuario.getVendedoresByPadre);
	server.get("/usuario/all/vendedores/count/:padreId", auth, controllers.usuario.getTotalVendedoresAgencia);
	server.get("/usuario/get/clienteById/:id", auth, controllers.usuario.getUsuarioById);
	server.get("/usuario/getVendedor/:padreId/:id", auth, controllers.usuario.getVendedorById);
	server.post("/usuario/post/cliente", controllers.usuario.postCliente);
	server.post("/usuario/post/vendedor", auth, controllers.usuario.postVendedor);
	server.post("/auth/login", controllers.usuario.loginUser);
	server.post("/usuario/upload/avatar", multipartMiddleware, controllers.usuario.uploadAvatar);
	// server.post("/usuario/upload/avatar",restify.bodyParser(), controllers.usuario.uploadAvatar);
	server.put("/usuario/put/avatar/:id", auth, controllers.usuario.putAvatar);
	server.put("/usuario/verificaEmail/:id", auth, controllers.usuario.putVerificarEmailUsuario);
	server.put("/usuario/update/:id", auth, controllers.usuario.putUsuario);
	server.put("/usuario/agente/update/:id", auth, controllers.usuario.putVendedor);
	server.put("/usuario/changePassword/:id", auth, controllers.usuario.changePassword);
	server.put("/usuario/delete/:id", auth, controllers.usuario.deleteUsuario);

	//Inmuebles
	server.post("/inmuebles/post/inmueble", auth, controllers.inmueble.postInmueble);
	server.post("/inmuebles/image", multipartMiddleware, controllers.inmueble.uploadImage);
	// server.post("/inmuebles/image", restify.bodyParser(), controllers.inmueble.uploadImage);
	server.post("/inmuebles/delete/image", auth, controllers.inmueble.deleteImage);
	server.get("/inmuebles/get/all/:usuarioId", auth, controllers.inmueble.getInmueblesUsuario);
	server.get("/inmuebles/get/:id",auth, middleware.trackingInmueble, controllers.inmueble.getInmuebleById);
	server.get("/inmuebles/get/all/count/:usuarioId", auth,controllers.inmueble.getTotalInmueblesUsuario);
	server.put("/inmuebles/put/:id", auth,controllers.inmueble.putInmueble);
	server.put("/inmuebles/delete/:id", auth, controllers.inmueble.deleteInmueble);

	server.get("/inmuebles/get/top/:usuarioId", auth, controllers.inmueble.getTopInmuebles);
	server.get("/inmuebles/search/code/:codigoInmueble", auth, controllers.inmueble.searchInmuebleByCodigoInmueble);

	// tipoBuscador
	server.get("/tipoBuscador/get/all", auth, controllers.tipoBuscador.getTiposBuscador);

	//Buscador
	server.get("/buscador/get/all/:agenciaAsociadaId", auth, controllers.buscador.getBuscadoresByAgencia);
	server.get("/buscador/get/all/agente/:vendedorAsignadoId", auth, controllers.buscador.getBuscadoresAgente);
	server.get("/buscador/get/:id", auth, controllers.buscador.getBuscadorById);
	server.get("/buscador/get/inmuebles/:buscadorId", auth, controllers.buscador.getInmueblesBuscador);
	server.get("/buscador/get/all/count/:agenciaAsociadaId", auth, controllers.buscador.getTotalBuscadoresCliente);
	server.post("/buscador/post", auth, controllers.buscador.postBuscador);
	server.post("/buscador/add/inmuble/:inmuebleId", auth, controllers.buscador.addInmuebleBuscador);
	server.put("/buscador/put/:id", auth, controllers.buscador.putBuscador);
	server.put("/buscador/delete/:id", auth, controllers.buscador.deleteBuscador);

	// Tareas
	server.get("/task/get/all/agencia/:agenciaId", auth, controllers.tarea.getTareasByAgencia);
	server.get("/task/get/all/agente/:usuarioAsignadoId", auth, controllers.tarea.getTareasByAgente);
	server.post("/task/post", auth, controllers.tarea.postTarea);
	server.put("/task/put/:id", auth, controllers.tarea.putTarea);
	server.put("/task/finalizar/:id", auth, controllers.tarea.finalizarTarea);
	server.put("/task/delete/:id", auth, controllers.tarea.deleteTarea);
}

module.exports = routesController;

