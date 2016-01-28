var models = require('../../models');

exports.getEstadosBuscador = function(req, res, next){
	models.estadoBuscador.findAll({
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

exports.getEstadoBuscadorById = function(req, res, next){
	models.estadoBuscador.findOne({
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

exports.postEstadoBuscador = function(req, res, next){
	models.estadoBuscador.create({
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

exports.putEstadoBuscador = function(req, res, next){
	models.estadoBuscador.findOne({
		where:{
			id: req.params.id
		}
	}).then(function (estadoBuscador){
		if(!estadoBuscador){
			res.status(500);
			res.json({
				type: false,
				data: "Registro no encontrado..."
			});
		}else{
			estadoBuscador.update({
				descripcion: req.body.descripcion
			}).then(function (_estadoVendedor){
				if(!_estadoVendedor){
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

exports.deleteEstadoBuscador = function(req, res, next){
	models.estadoBuscador.findOne({
		where:{
			id: req.params.id
		}
	}).then(function (estadoBuscador){
		if(!estadoBuscador){
			res.status(500);
			res.json({
				type: false,
				data: "Registro no encontrado..."
			});
		}else{
			estadoBuscador.update({
				status: 0
			}).then(function (_estadoBuscador){
				if(!_estadoBuscador){
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
