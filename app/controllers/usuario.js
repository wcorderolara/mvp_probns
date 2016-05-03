'use strict'
var models = require("../../models");
var moment = require('moment');
var cloudinary = require('cloudinary');
var crypto = require('crypto');
var settings = require('../../settings');
var service = require('../service/service');
var passport = require('passport');

cloudinary.config({
	cloud_name: process.env.CDN_NAME,
	api_key: process.env.CDN_API_KEY,
	api_secret: process.env.CDN_API_SECRET
})

var sendJSONresponse = function(res, status, content){
	res.status(status);
	res.json(content);
}

exports.getUsuarios = function (req, res, next){
	models.Usuario.findAll({
		where: {
			status: 1,
			padreId: null
		},
		attributes: ['id','padreId','userLogin','firstName','lastName','email','telefono1','telefono2','direccion',
					 'website','descripcion','createdAt','status', 'tipoUsuarioId', 'PaiId','estadoUsuarioId',
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
			sendJSONresponse(res,500, {"type":false, "message":"Error al obtener los clientes", "data": clientes});
		}else{
			sendJSONresponse(res,200,{"type":true,"data":clientes});
		};
	});
};

exports.getTotalVendedoresAgencia = function(req, res, next){
	models.Usuario.findAndCountAll({
		where: {
			status: 1,
			padreId: req.params.padreId
		}
	}).then(function (result){
		if(!result){
			service.sendJSONresponse(res,400,{"type":false,"message":"Error al obtener los registros", "data":result});
		}else{
			service.sendJSONresponse(res,200,{"type":true,"data":result.count});
		}
	})
}

exports.getVendedoresByPadre = function (req, res, next){
	models.Usuario.findAll({
		where: {
			status: 1,
			padreId: req.params.padreId
		},
		attributes: ['id','padreId','userLogin','firstName','lastName','email','telefono1',
					 'createdAt','status', 'PaiId','avatar'],
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
			},
			{
				model: models.Usuario,
				as: 'Padre',
				attributes: ['id', 'firstName', 'userLogin'],
				where: {
					status: 1
				}
			}
		]
	}).then(function (clientes){
		if(!clientes){
			sendJSONresponse(res,500,{"type":false,"message":"Error al obtener los clientes", "data":clientes});
		}else{
			sendJSONresponse(res,200,{"type":true,"data":clientes});
		};
	});
};

exports.getUsuarioById = function (req, res, next){
	models.Usuario.findOne({
		where: {
			id: req.params.id,
			status: 1
		},
		attributes: ['id','padreId','userLogin','firstName','lastName','email','telefono1','telefono2','direccion',
					 'website','descripcion','createdAt','status', 'tipoUsuarioId', 'PaiId','estadoUsuarioId',
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
		]
	}).then(function (cliente){
		if(!cliente){
			sendJSONresponse(res,500,{"type":false,"message":"Error al obtener el registro","data":cliente});
		}else{
			sendJSONresponse(res,200,{"type":true,"data":cliente});
		}
	})
}

exports.getVendedorById = function (req, res, next){
	models.Usuario.findOne({
		where: {
			id: req.params.id,
			padreId: req.params.padreId,
			status: 1
		},
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
			},
			{
				model: models.Usuario,
				as: 'Padre',
				attributes: ['id', 'firstName', 'userLogin'],
				where: {
					status: 1
					
				}
			}
		]
	}).then(function (cliente){
		if(!cliente){
			sendJSONresponse(res,500,{"type":false,"message":"Error al obtener el registro","data":cliente});
		}else{
			sendJSONresponse(res,200,{"type":true,"data":cliente});
		}
	})
}


exports.postCliente = function (req, res, next){
	// var _req = JSON.parse(req.body);

	models.Usuario.create({
		userLogin: req.body.userLogin,
		salt: crypto.randomBytes(16).toString('hex'),
		email: req.body.userLogin,
		verificadoEmail: 0,
		status: 1,
		tipoUsuarioId: req.body.tipoUsuarioId,
		PaiId: req.body.PaiId,
		estadoUsuarioId: req.body.estadoUsuarioId || 1
	}).then(function (user){
		if(!user){
			sendJSONresponse(res,500,{"type":false,"message":"Error al crear el registro","data":user});
		}else{
			var _token = service.createToken(user);
			user.update({
				hash: crypto.pbkdf2Sync(req.body.password, user.salt, 1000, 64).toString('hex')
			}).then(function(){
				sendJSONresponse(res, 200, {"type": true, "data": "Registro creado exitosamente", "token": _token})
			})
		};
	});
};

exports.postVendedor = function(req,res,next){
	// var _req = JSON.parse(req.body);
	models.Usuario.create({
		userLogin: req.body.userLogin,		
		firstName: req.body.firstName,
		lastName: req.body.lastName || null,
		telefono1: req.body.telefono1 || null,
		salt: crypto.randomBytes(16).toString('hex'),
		email: req.body.userLogin,
		avatar: req.body.avatar || null,
		verificadoEmail: 0,
		status: 1,
		tipoUsuarioId: req.body.tipoUsuarioId || 2,
		PaiId: req.body.PaiId,
		estadoUsuarioId: req.body.estadoUsuarioId || 1,
		padreId: req.body.padreId
	}).then(function (user){
		if(!user){
			sendJSONresponse(res,500,{"type":false,"message":"Error al crear el registro","data":user});
		}else{
			// var _token = service.createToken(user);
			user.update({
				hash: crypto.pbkdf2Sync(req.body.password, user.salt, 1000, 64).toString('hex')
			}).then(function(){
				sendJSONresponse(res, 200, {"type": true, "message": "Registro creado exitosamente"})
			})
		};
	});
};

exports.loginUser = function(req, res, next){
	if(!req.body.userLogin ||  !req.body.password){
		sendJSONresponse(res, 400, {"type": false, "data": "Todos los campos son requeridos"});
		return;
	}

	passport.authenticate('local', function(err, user, info){
		var _token;
		if(err){
			sendJSONresponse(res,404,{"type":false, "data":err,"dataType": "Error"});
			return;
		}

		if(user){
			_token = service.createToken(user);
			sendJSONresponse(res,200, {"type":true, "token": _token});
		}else{
			sendJSONresponse(res,401,{"type":false, "data": info, "dataType": "Info"});
		}
	})(req, res);
}

exports.putVerificarEmailUsuario = function (req, res, next){
	models.Usuario.findOne({
		where: {
			id: req.params.id
		}
	}).then(function (cliente){
		if(!cliente){
			sendJSONresponse(res,500,{"type":false,"message":"Imposible verificar el Correo Electronico, usuaro no existe...","data":cliente});
		}else{
			cliente.update({
				verificadoEmail: 1
			}).then(function (_cliente){
				if(!_cliente){
					sendJSONresponse(res,500,{"type":false,"message":"Error al intentar verificar el correo Electronico","data":_cliente});
				}else{
					sendJSONresponse(res,200,{"type":true,"message":"Email verificado...","data":_cliente});
				};
			});
		};
	});
};

exports.putUsuario = function(req, res, next){
	models.Usuario.update(
		{
			userLogin: req.body.userLogin || null,
			firstName: req.body.firstName || null,
			lastName: req.body.lastName || null,
			email: req.body.userLogin || null,
			telefono1: req.body.telefono1 || null,
			telefono2: req.body.telefono2 || null,
			direccion: req.body.direccion || null,
			website: req.body.website || null,
			descripcion: req.body.descripcion || null
		},
		{
			where:{
				id: req.params.id
			}
		}
	).then(function (result){
		if(!result){
			sendJSONresponse(res,500,{"type":false,"message":"error al encontrar el registro", "data":result});
		}else{
			sendJSONresponse(res,200,{"type":true,"message":"Registro Actualizado exitosamente...", "data":result});
		}
	})
};

exports.putVendedor = function(req, res, next){
	models.Usuario.update(
		{
			userLogin: req.body.userLogin,
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			telefono1: req.body.telefono1,
			email: req.body.userLogin,
			avatar: req.body.avatar
		},
		{
			where:{
				id: req.params.id
			}
		}
	).then(function (result){
		if(!result){
			sendJSONresponse(res,500,{"type":false,"message":"error al encontrar el registro", "data":result});
		}else{
			sendJSONresponse(res,200,{"type":true,"message":"Registro Actualizado exitosamente...", "data":result});
		}
	})
};

exports.uploadAvatar = function(req, res, next){
	cloudinary.uploader.upload(req.files.file.path, function(result, callback){
		sendJSONresponse(res,200,{"type":true,"data":result});
	});
}

exports.putAvatar = function(req, res, next){
	models.Usuario.update(
		{
			avatar: req.body.avatar
		},
		{
			where:{
				id: req.params.id
			}
		}
	).then(function (result){
		if(!result){
			sendJSONresponse(res,500,{"type":false,"message":"error al encontrar el registro", "data":result});
		}else{
			sendJSONresponse(res,200,{"type":true,"message":"Imagen de Perfil Actualizada exitosamente...", "data":result});
		}
	})

}

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
			models.Usuario.update(
				{
					hash: crypto.pbkdf2Sync(req.body.password, usuario.salt, 1000, 64).toString('hex')	
				},
				{
					where: {
						id: req.params.id
					}
				}
			).then(function (result){
				if(!result){
					sendJSONresponse(res,500,{"type":false,"message":"error al encontrar el registro", "data":result});
				}else{
					sendJSONresponse(res,200,{"type":true,"message":"Contraseña <b>Actualizada</b> exitosamente"});
				}
			})
		};
	});
};

exports.deleteUsuario = function (req, res, next){
	models.Usuario.update(
		{
			status: 0
		},
		{
			where: {
				id: req.params.id
			}
		}
	).then(function (result){
		if(!result){
			sendJSONresponse(res,500,{"type":false,"message":"error al encontrar el registro", "data":result});
		}else{
			sendJSONresponse(res,200,{"type":true,"message":"Registro <b>Eliminado</b> exitosamente..."});
		}
	})
};
