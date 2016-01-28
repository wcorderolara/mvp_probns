var models = require('../../models');

exports.getOperacionesInmueble = function(req, res, next){
	models.operacionInmueble.findAll({
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

exports.getOperacionInmuebleById = function(req, res, next){
	models.operacionInmueble.findOne({
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

exports.postOperacionInmueble = function(req, res, next){
	models.operacionInmueble.create({
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

exports.putOperacionInmueble = function(req, res, next){
	models.operacionInmueble.findOne({
		where:{
			id: req.params.id
		}
	}).then(function (operacionInmueble){
		if(!operacionInmueble){
			res.status(500);
			res.json({
				type: false,
				data: "Registro no encontrado..."
			});
		}else{
			operacionInmueble.update({
				descripcion: req.body.descripcion,
				status: req.body.status
			}).then(function (_operacionInmueble){
				if(!_operacionInmueble){
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

exports.deleteOperacionInmueble = function(req, res, next){
	models.operacionInmueble.findOne({
		where:{
			id: req.params.id
		}
	}).then(function (operacionInmueble){
		if(!operacionInmueble){
			res.status(500);
			res.json({
				type: false,
				data: "Registro no encontrado..."
			});
		}else{
			operacionInmueble.update({
				status: 0
			}).then(function (_operacionInmueble){
				if(!_operacionInmueble){
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
