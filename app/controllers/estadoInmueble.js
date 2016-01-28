var models = require('../../models');

exports.getEstadosInmueble = function(req, res, next){
	models.estadoInmueble.findAll({
		where:{
			status: 1
		},
		attributes: ['id', 'descripcion']
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

exports.getEstadoInmuebleById = function(req, res, next){
	models.estadoInmueble.findOne({
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

exports.postEstadoInmueble = function(req, res, next){
	models.estadoInmueble.create({
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

exports.putEstadoInmueble = function(req, res, next){
	models.estadoInmueble.findOne({
		where:{
			id: req.params.id
		}
	}).then(function (estadoInmueble){
		if(!estadoInmueble){
			res.status(500);
			res.json({
				type: false,
				data: "Registro no encontrado..."
			});
		}else{
			estadoInmueble.update({
				descripcion: req.body.descripcion,
				status: req.body.status
			}).then(function (_estadoInmueble){
				if(!_estadoInmueble){
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

exports.deleteEstadoInmueble = function(req, res, next){
	models.estadoInmueble.findOne({
		where:{
			id: req.params.id
		}
	}).then(function (estadoInmueble){
		if(!estadoInmueble){
			res.status(500);
			res.json({
				type: false,
				data: "Registro no encontrado..."
			});
		}else{
			estadoInmueble.update({
				status: 0
			}).then(function (_estadoInmueble){
				if(!_estadoInmueble){
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
