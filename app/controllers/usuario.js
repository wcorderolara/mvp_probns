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

exports.getUsuarios = function (req, res, next){
	models.Usuario.findAll({
		where: {
			status: 1
		},
		attributes: ['id','padreId','userLogin','firstName','lastName','email','telefono1','telefono2','direccion',
							   'website','descripcion','createAt','status', 'tipoUsuarioId', 'PaiId','estadoUsuarioId',
								 'avatar'],
		include: [
			{
				model: models.tipoUsuario,
				attributes: ['id','descripcion'],
				where:{
					status: 1
				}
			},
			{
				model: models.Pais,
				attributes: ['id', 'descripcion','flag'],
				where: {
					status: 1
				}
			},
			{
				model: models.estadoUsuario,
				attributes: ['id','descripcion'],
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

exports.getUsuarioById = function (req, res, next){
	models.Usuario.findOne({
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
				attributes: ['id', 'descripcion','flag'],
				where: {
					status: 1
				}
			},
			{
				model: models.estadoUsuario,
				attributes: ['id','descripcion'],
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

function genToken(){
	var token = Math.random().toString(32).substring(2);
console.log(token);
	return token;
}

exports.postCliente = function (req, res, next){
	models.Usuario.create({
		userLogin: req.body.userLogin,
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.userLogin,
		password: req.body.password,
		token: genToken(),
		verificadoEmail: 0,
		status: 1,
		tipoUsuarioId: req.body.tipoUsuarioId,
		PaiId: req.body.Pai,
		estadoUsuarioId: 1
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

exports.postVendedor = function(req,res,next){
	models.Usuario.create({
		userLogin: req.body.userLogin,
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.userLogin,
		password: req.body.password,
		token: genToken(),
		verificadoEmail: 0,
		status: 1,
		tipoUsuarioId: req.body.tipoUsuarioId,
		PaiId: req.body.Pai,
		estadoUsuarioId: null,
		padreId: req.body.padreId
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

exports.putVerificarEmailUsuario = function (req, res, next){
	models.Usuario.findOne({
		where: {
			id: req.params.id
		}
	}).then(function (cliente){
		if(!cliente){
			res.status(500);
			res.json({
				type: false,
				data: "Imposible verificar el Correo Electronico, usuaro no existe..."
			});
		}else{
			cliente.update({
				verificadoEmail: 1
			}).then(function (_cliente){
				if(!_cliente){
					res.status(500);
					res.json({
						type: false,
						data: "Error al intentar verificar el correo Electronico"
					});
				}else{
					res.status(200);
					res.json({
						type: true,
						data: "Email verificado..."
					});
				};
			});
		};
	});
};

exports.putUsuario = function(req, res, next){
	models.Usuario.findOne({
		where: {
			id: req.params.id
		}
	}).then(function (usuario){
		if(!usuario){
			res.status(500);
			res.json({
				type: false,
				data: "Registro no encontrado " + usuario
			});
		}else{
			Usuario.update({
				userLogin: req.body.userLogin,
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				email: req.body.email,
				telefono1: req.body.telefono1,
				telefono2: req.body.telefono2,
				direccion: req.body.direccion,
				website: req.body.website,
				descripcion: req.body.descripcion,
				avatar: req.body.avatar,
				padreId: req.body.padreId,
			}).then(function (_usuario){
				if(!_usuario){
					res.status(500);
					res.json({
						type: false,
						data: "Error al actualizar el registro " + _usuario
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
	models.Usuario.findOne({
		where: {
			id: req.params.id
		}
	}).then(function (usuario){
		if(!usuario){
			res.status(500);
			res.json({
				type: false,
				data: "registro no encontrado"
			});
		}else{
			Usuario.update({
				password: req.body.password
			}).then(function (_usuario){
				if(!_usuario){
					res.status(500);
					res.json({
						type: false,
						data: "Hubo un error al actualizar su Password: " + _usuario
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

exports.deleteUsuario = function (req, res, next){
	models.Usuario.findOne({
		where: {
			id: req.params.id
		}
	}).then(function (usuario){
		if(!usuario){
			res.status(500);
			res.json({
				type: false,
				data: "Registro no encontrado " + usuario
			});
		}else{
			Usuario.update({
				status: 0
			}).then(function (_usuario){
				if(!_usuario){
					res.status(500);
					res.json({
						type: false,
						data: "Error al eliminar el registro " + _usuario
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
