var models = require('../../models');

exports.getTipoCliente = function(req, res, next){
	models.tipoCliente.findAll({
		where:{
			status: 1
		},
		attributes: ['id', 'descripcion', 'status']
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

exports.getTipoClienteById = function(req, res, next){
	models.tipoCliente.findOne({
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

exports.postTipoCliente = function(req, res, next){
	models.tipoCliente.create({
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

exports.putTipoCliente = function(req, res, next){
	models.tipoCliente.findOne({
		where:{
			id: req.params.id
		}
	}).then(function (tipoCliente){
		if(!tipoCliente){
			res.status(500);
			res.json({
				type: false,
				data: "Registro no encontrado..."
			});
		}else{
			tipoCliente.update({
				descripcion: req.body.descripcion,
				status: req.body.status
			}).then(function (_tipoCliente){
				if(!_tipoCliente){
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

exports.deleteTipoCliente = function(req, res, next){
	models.tipoCliente.findOne({
		where:{
			id: req.params.id
		}
	}).then(function (tipoCliente){
		if(!tipoCliente){
			res.status(500);
			res.json({
				type: false,
				data: "Registro no encontrado..."
			});
		}else{
			tipoCliente.update({
				status: 0
			}).then(function (_tipoCliente){
				if(!_tipoCliente){
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
