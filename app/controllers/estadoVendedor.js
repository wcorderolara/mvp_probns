var models = require('../../models');

exports.getEstadosVendedor = function(req, res, next){
	models.estadoVendedor.findAll({
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

exports.getEstadoVendedorById = function(req, res, next){
	models.estadoVendedor.findOne({
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

exports.postEstadoCliente = function(req, res, next){
	models.estadoVendedor.create({
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

exports.putEstadoVendedor = function(req, res, next){
	models.estadoVendedor.findOne({
		where:{
			id: req.params.id
		}
	}).then(function (estadoVendedor){
		if(!estadoVendedor){
			res.status(500);
			res.json({
				type: false,
				data: "Registro no encontrado..."
			});
		}else{
			estadoVendedor.update({
				descripcion: req.body.descripcion,
				status: req.body.status
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

exports.deleteEstadoVendedor = function(req, res, next){
	models.estadoVendedor.findOne({
		where:{
			id: req.params.id
		}
	}).then(function (estadoVendedor){
		if(!estadoVendedor){
			res.status(500);
			res.json({
				type: false,
				data: "Registro no encontrado..."
			});
		}else{
			estadoVendedor.update({
				status: 0
			}).then(function (_estadoVendedor){
				if(!_estadoVendedor){
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
