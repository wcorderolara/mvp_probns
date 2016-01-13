var models = require('../../models');

exports.getTiposMensaje = function(req, res, next){
	models.tipoMensaje.findAll({
		where:{
			status: 1
		}
	}).then(function (response){
		if(!response){
			res.status(500);
			res.json({
				type:false,
				data: "Error al obtener los registros..."
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

exports.getTipoMensajeById = function(req, res, next){
	models.tipoMensaje.findOne({
		where:{
			id: req.params.id
		}
	}).then(function (response){
		if(!response){
			res.status(500);
			res.json({
				type: false,
				data: "Error al obtener el registro..."
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

exports.postTipoMensaje = function(req, res, next){
	models.tipoMensaje.create({
		descripcion: req.body.descripcion,
		status: 1
	}).then(function (response){
		if(!response){
			res.status(500);
			res.json({
				type: false,
				data: "Error al intentar guardar el registro..."
			});
		}else{
			res.status(200);
			res.json({
				type: true,
				data: "Registro creado exitosamente..."
			});
		};
	});
};

exports.putTipoMensaje = function(req, res, next){
	models.tipoMensaje.findOne({
		where:{
			id: req.params.id
		}
	}).then(function (tipoMensaje){
		if(!tipoMensaje){
			res.status(500);
			res.json({
				type: false,
				data: "Registro no encontrado..."
			});
		}else{
			tipoMensaje.update({
				descripcion: req.body.descripcion,
				status: req.body.status
			}).then(function (_tipoMensaje){
				if(!_tipoMensaje){
					res.status(500);
					res.json({
						type: false,
						data: "Error al intentar actualizar el registro..."
					});
				}else{
					res.status(200);
					res.json({
						type: true,
						data: "Registro Actualizado exitosamente..."
					});
				};
			});
		};
	});
};

exports.deleteTipoMensaje = function(req, res, next){
	models.tipoMensaje.findOne({
		where:{
			id: req.params.id
		}
	}).then(function (tipoMensaje){
		if(!tipoMensaje){
			res.status(500);
			res.json({
				type: false,
				data: "Registro no encontrado..."
			});
		}else{
			tipoMensaje.update({
				status: 0
			}).then(function (_tipoMensaje){
				if(!_tipoMensaje){
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