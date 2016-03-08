var models = require('../../models');

exports.getAccionesMensaje = function(req, res, next){
	models.accionesBuscador.findAll({
		where:{
			status: 1
		}
	}).then(function (response){
		if(!response){
			res.status(500);
			res.json({
				type:false,
				data: "Error al obtener las acciones para Mensajes: " + response
			});
		}else{
			res.status(200);
			res.json({
				type: true,
				data: response
			});
		};
	});
};

exports.getAccionMensajeById = function(req, res, next){
	models.accionesBuscador.findOne({
		where:{
			id: req.params.id
		}
	}).then(function (response){
		if(!response){
			res.status(500);
			res.json({
				type: false,
				data: "Error al obtener la accion de mensaje solicitada"
			});
		}else{
			res.status(200);
			res.json({
				type: true,
				data: response
			});
		};
	});
};

exports.postAccionMensaje = function(req, res, next){
	models.accionesBuscador.create({
		descripcion: req.body.descripcion,
		status: 1
	}).then(function (response){
		if(!response){
			res.status(500);
			res.json({
				type: false,
				data: "Ha ocurrido un Error: " + response
			});
		}else{
			res.status(200);
			res.json({
				type: true,
				data: "Accion de Mensaje creada Exitosamente"
			});
		};
	});
};

exports.putAccionMensaje = function(req, res, next){
	models.accionesBuscador.findOne({
		where:{
			id: req.params.id,
			status: 1
		}
	}).then(function (accionMensaje){
		if(!accionesBuscador){
			res.status(500);
			res.json({
				type: false,
				data: "Accion de mensaje no encontrada"
			});
		}else{
			accionesBuscador.update({
				descripcion: req.body.descripcion,
				status: req.body.status
			}).then(function (_accionesBuscador){
				if(!_accionesBuscador){
					res.status(500);
					res.json({
						type: false,
						data: "Error al actualizar la Accion de Mensaje: " + accionMensaje
					});
				}else{
					res.status(200);
					res.json({
						type: true,
						data: "Accion de Mensaje actualizada Exitosamente..."
					});
				};
			});
		};
	});
};

exports.deleteTipoUsuario = function(req, res, next){
	models.accionesBuscador.findOne({
		where:{
			id: req.params.id,
			status: 1
		}
	}).then(function (accionesBuscador){
		if(!accionesBuscador){
			res.status(500);
			res.json({
				type: false,
				data: "Error al encontrar la Accion de Mensaje"
			});
		}else{
			accionesBuscador.update({
				status: 0
			}).then(function (_accionesBuscador){
				if(!_accionesBuscador){
					res.status(500);
					res.json({
						type: false,
						data: "Ocurrio un error al intentar eliminar el registro..."
					});
				}else{
					res.status(200);
					res.json({
						type: true,
						data: "Registro eliminado exitosamente..."
					});
				};
			});
		};
	});
};