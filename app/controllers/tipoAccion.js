var models = require('../../models');

exports.getTiposAccion = function(req, res, next){
	models.tipoAccion.findAll({
		where:{
			status: 1
		}
	}).then(function (response){
		if(!response){
			res.status(500);
			res.json({
				type:false,
				data: "Error al obtener los registros: " + response
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

exports.getTipoAccionById = function(req, res, next){
	models.tipoAccion.findOne({
		where:{
			id: req.params.id
		}
	}).then(function (response){
		if(!response){
			res.status(500);
			res.json({
				type: false,
				data: "Error al obtener el registro solicitado..." + response
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

exports.postTipoAccion = function(req, res, next){
	models.tipoAccion.create({
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
				data: "Registro creado Exitosamente"
			});
		};
	});
};

exports.putTipoAccion = function(req, res, next){
	models.tipoAccion.findOne({
		where:{
			id: req.params.id
		}
	}).then(function (tipoAccion){
		if(!tipoAccion){
			res.status(500);
			res.json({
				type: false,
				data: "Registro no encontrado"
			});
		}else{
			tipoAccion.update({
				descripcion: req.body.descripcion
			}).then(function (_tipoAccion){
				if(!_tipoAccion){
					res.status(500);
					res.json({
						type: false,
						data: "Error al actualizar el Registro: " + _tipoAccion
					});
				}else{
					res.status(200);
					res.json({
						type: true,
						data: "Registro Actualizado Exitosamente..."
					});
				};
			});
		};
	});
};

exports.deleteTipoAccion = function(req, res, next){
	models.tipoAccion.findOne({
		where:{
			id: req.params.id
		}
	}).then(function (tipoAccion){
		if(!tipoAccion){
			res.status(500);
			res.json({
				type: false,
				data: "Error al encontrar el registro"
			});
		}else{
			tipoAccion.update({
				status: 0
			}).then(function (_tipoAccion){
				if(!_tipoAccion){
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
