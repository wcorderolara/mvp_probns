var models = require('../../models');

exports.getEstadosUsuario = function(req, res, next){
	models.estadoUsuario.findAll({
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

exports.getEstadoUsuarioById = function(req, res, next){
	models.estadoUsuario.findOne({
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

exports.postEstadoUsuario = function(req, res, next){
	models.estadoUsuario.create({
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

exports.putEstadoUsuario = function(req, res, next){
	models.estadoUsuario.findOne({
		where:{
			id: req.params.id
		}
	}).then(function (estadoUsuario){
		if(!estadoUsuario){
			res.status(500);
			res.json({
				type: false,
				data: "Registro no encontrado..."
			});
		}else{
			estadoUsuario.update({
				descripcion: req.body.descripcion,
				status: req.body.status
			}).then(function (_estadoUsuario){
				if(!_estadoUsuario){
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

exports.deleteEstadoUsuario = function(req, res, next){
	models.estadoUsuario.findOne({
		where:{
			id: req.params.id
		}
	}).then(function (estadoUsuario){
		if(!estadoUsuario){
			res.status(500);
			res.json({
				type: false,
				data: "Registro no encontrado..."
			});
		}else{
			estadoUsuario.update({
				status: 0
			}).then(function (_estadoUsuario){
				if(!_estadoUsuario){
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
