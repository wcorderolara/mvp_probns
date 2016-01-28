'use strict'
var models = require("../../models");
var moment = require('moment');
var cloudinary = require('cloudinary');
var settings = require('../../settings');

cloudinary.config({
	cloud_name: settings.cdn.cloud_name,
	api_key: settings.cdn.api_key,
	api_secret: settings.cdn.api_secret
})

exports.getClientes = function (req, res, next){
	models.Cliente.findAll({
		where: {
			status: 1
		},
		attributes: ['id','nombre','email','telefono1','telefono2','direccion','website','descripcion','fechaCreacion','status', 'tipoClienteId', 'PaiId', 'avatar'],
		include: [
			{
				model: models.tipoCliente,
				attributes: ['id','descripcion'],
				where:{
					status: 1
				}
			},
			{
				model: models.Pais,
				attributes: ['id', 'descripcion','fla'],
				where: {
					status: 1
				}
			}
		],
		order: 'PaiId'
	}).then(function (clientes){
		if(!clientes){
			res.status(500);
			res.json({
				type: false,
				data: "Error al obtener los clientes" + clientes
			});
		}else{
			res.status(200);
			res.json({
				type: true,
				data: clientes
			});
		};
	});
};

exports.uploadAvatar = function(req, res, next){
	cloudinary.uploader.upload(req.files.avatar, function(result, callback){
			return callback(result);
	});
}

exports.getClienteById = function (req, res, next){
	models.Cliente.findOne({
		where: {
			id: req.params.id,
			status: 1
		},
		include: [
			{
				model: models.tipoCliente,
				attributes: ['id','descripcion'],
				where:{
					status: 1
				}
			},
			{
				model: models.Pais,
				attributes: ['id', 'descripcion','fla'],
				where: {
					status: 1
				}
			}
		]
	}).then(function (cliente){
		if(!cliente){
			res.status(500);
			res.json({
				type: false,
				data: "Error al obtener el registro" + cliente
			});
		}else{
			res.status(200);
			res.json({
				type: false,
				data: cliente
			})
		}
	})
}

exports.postCliente = function (req, res, next){
	models.Cliente.create({
		nombre: req.body.nombre,
		email: req.body.email,
		password: req.body.password,
		token: req.body.token,
		telefono1: req.body.telefono1,
		telefono2: req.body.telefono2,
		direccion: req.body.direccion,
		website: req.body.website,
		descripcion: req.body.descripcion,
		avatar: req.body.avatar,
		verificadoEmail: 0,
		fechaCreacion: moment().format("DD-MM-YYYY"),
		status: 1,
		tipoClienteId: req.body.tipoClienteId,
		PaiId: req.body.Pai
	}).then(function (cliente){
		if(!cliente){
			res.status(500);
			res.json({
				type: false,
				data: "Error al crear el registro: " + cliente
			});
		}else{
			res.status(200);
			res.json({
				type: true,
				data: "Registro creado exitosamente"
			});
		};
	});
};

exports.putCliente = function(req, res, next){
	models.Cliente.findOne({
		where: {
			id: req.params.id
		}
	}).then(function (cliente){
		if(!cliente){
			res.status(500);
			res.json({
				type: false,
				data: "Registro no encontrado " + cliente
			});
		}else{
			cliente.update({
				nombre: req.body.nombre,
				email: req.body.email,
				telefono1: req.body.telefono1,
				telefono2: req.body.telefono2,
				direccion: req.body.direccion,
				website: req.body.website,
				descripcion: req.body.descripcion,
				avatar: req.body.avatar,
				tipoClienteId: req.body.tipoClienteId,
				PaiId: req.body.Pai
			}).then(function (_cliente){
				if(!_cliente){
					res.status(500);
					res.json({
						type: false,
						data: "Error al actualizar el registro " + _cliente
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

exports.changePassword = function (req, res, next){
	models.Cliente.findOne({
		where: {
			id: req.params.id
		}
	}).then(function (cliente){
		if(!cliente){
			res.status(500);
			res.json({
				type: false,
				data: "registro no encontrado"
			});
		}else{
			cliente.update({
				password: req.body.password
			}).then(function (_cliente){
				if(!_cliente){
					res.status(500);
					res.json({
						type: false,
						data: "Hubo un error al actualizar su Password"
					});
				}else{
					res.status(200);
					res.json({
						type: true,
						data: "Se ha cambiado el password exitosamente"
					});
				};
			});
		};
	});
};

exports.deleteCliente = function (req, res, next){
	models.Cliente.findOne({
		where: {
			id: req.params.id
		}
	}).then(function (cliente){
		if(!cliente){
			res.status(500);
			res.json({
				type: false,
				data: "Registro no encontrado " + cliente
			});
		}else{
			cliente.update({
				status: 0
			}).then(function (_cliente){
				if(!_cliente){
					res.status(500);
					res.json({
						type: false,
						data: "Error al eliminar el registro " + _cliente
					});
				}else{
					res.status(200);
					res.json({
						type: true,
						data: "Registro Eliminado exitosamente..."
					});
				};
			});
		};
	});
};
