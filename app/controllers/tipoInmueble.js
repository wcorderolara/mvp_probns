var models = require('../../models');

exports.getTipoInmueble = function(req, res, next){
	models.tipoInmueble.findAll({
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

exports.getTipoInmuebleById = function(req, res, next){
	models.tipoInmueble.findOne({
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

exports.postTipoInmueble = function(req, res, next){
	models.tipoInmueble.create({
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

exports.putTipoInmueble = function(req, res, next){
	models.tipoInmueble.findOne({
		where:{
			id: req.params.id
		}
	}).then(function (tipoInmueble){
		if(!tipoInmueble){
			res.status(500);
			res.json({
				type: false,
				data: "Registro no encontrado..."
			});
		}else{
			tipoInmueble.update({
				descripcion: req.body.descripcion,
				status: req.body.status
			}).then(function (_tipoInmueble){
				if(!_tipoInmueble){
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

exports.deleteTipoInmueble = function(req, res, next){
	models.tipoInmueble.findOne({
		where:{
			id: req.params.id
		}
	}).then(function (tipoInmueble){
		if(!tipoInmueble){
			res.status(500);
			res.json({
				type: false,
				data: "Registro no encontrado..."
			});
		}else{
			tipoInmueble.update({
				status: 0
			}).then(function (_tipoInmueble){
				if(!_tipoInmueble){
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