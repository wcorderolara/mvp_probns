var models = require('../../models');

exports.getTiposUsuario = function(req, res, next){
	models.tipoUsuario.findAll({
		where:{
			status: 1
		}
	}).then(function (response){
		if(!response){
			res.status(500);
			res.json({
				type:false,
				data: "Error al obtener los Tipos de Usuario: " + response
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

exports.getTipoUsuarioById = function(req, res, next){
	models.tipoUsuario.findOne({
		where:{
			id: req.params.id
		}
	}).then(function (response){
		if(!response){
			res.status(500);
			res.json({
				type: false,
				data: "Error al obtener el Tipo de Usuario"
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

exports.postTipoUsuario = function(req, res, next){
	models.tipoUsuario.create({
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
				data: "Tipo de Usuario creado Exitosamente"
			});
		};
	});
};

exports.putTipoUsuario = function(req, res, next){
	models.tipoUsuario.findOne({
		where:{
			id: req.params.id
		}
	}).then(function (tipoUsuario){
		if(!tipoUsuario){
			res.status(500);
			res.json({
				type: false,
				data: "Tipo de Usuario no encontrado"
			});
		}else{
			tipoUsuario.update({
				descripcion: req.body.descripcion,
				status: req.body.status
			}).then(function (_tipoUsuario){
				if(!_tipoUsuario){
					res.status(500);
					res.json({
						type: false,
						data: "Error al actualizar el Tipo de Usuario: " + tipoUsuario.descripcion
					});
				}else{
					res.status(200);
					res.json({
						type: true,
						data: "Tipo de Usuario Actualizado Exitosamente..."
					});
				};
			});
		};
	});
};

exports.deleteTipoUsuario = function(req, res, next){
	models.tipoUsuario.findOne({
		where:{
			id: req.params.id
		}
	}).then(function (tipoUsuario){
		if(!tipoUsuario){
			res.status(500);
			res.json({
				type: false,
				data: "Error al encontrar el Tipo de Usuario"
			});
		}else{
			tipoUsuario.update({
				status: 0
			}).then(function (_tipoUsuario){
				if(!_tipoUsuario){
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