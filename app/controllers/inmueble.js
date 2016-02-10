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

//Inmuebles
exports.getInmuebles = function (req, res, next){
	models.Inmueble.findAll({
		where: {
			status: 1
		},
		attributes: ['id','nombre', 'apellido','email','telefono','avatar','fechaCreacion','createdAt',
					 'status', 'ClienteId', 'estadoVendedorId'],
		include: [
			{
				model: models.Cliente,
				attributes: ['id','nombre'],
				where:{
					status: 1
				}
			},
			{
				model: models.estadoVendedor,
				attributes: ['id', 'descripcion'],
				where: {
					status: 1
				}
			}
		],
		order: 'apellido'
	}).then(function (response){
		if(!response){
			res.status(500);
			res.json({
				type: false,
				data: "Error al obtener los registros..." + response
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

exports.uploadAvatar = function(req, res, next){
	cloudinary.uploader.upload(req.files.avatar, function(result, callback){
			return callback(result);
	});
}

exports.getVendedorById = function (req, res, next){
	models.Cliente.findOne({
		where: {
			id: req.params.id,
			status: 1
		},
    include: [
			{
				model: models.Cliente,
				attributes: ['id','nombre'],
				where:{
					status: 1
				}
			},
			{
				model: models.estadoVendedor,
				attributes: ['id', 'descripcion'],
				where: {
					status: 1
				}
			}
		],
	}).then(function (vendedor){
		if(!vendedor){
			res.status(500);
			res.json({
				type: false,
				data: "Error al obtener el registro" + vendedor
			});
		}else{
			res.status(200);
			res.json({
				type: false,
				data: vendedor
			})
		}
	})
}

exports.postVendedor = function (req, res, next){
	models.Vendedor.create({
		nombre: req.body.nombre,
    apellido: req.body.apellido,
		email: req.body.email,
		password: req.body.password,
		token: req.body.token,
		telefono: req.body.telefono,
		avatar: req.body.avatar,
		verificadoEmail: 0, //servira para enviarle al vendedor una invitacion cuando la agencia le cree su usuario
		fechaCreacion: moment().format("DD-MM-YYYY"),
		status: 1,
		ClienteId: req.params.ClienteId,
		estadoVendedor: 1 //pendiente verificacion, cuando verifique el email se cambiara el estado a disponible
	}).then(function (vendedor){
		if(!vendedor){
			res.status(500);
			res.json({
				type: false,
				data: "Error al crear el registro: " + vendedor
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

exports.putVerificarEmailVendedor = function (req, res, next){
	models.Vendedor.findOne({
		where: {
			id: req.params.id,
			token: req.params.token
		}
	}).then(function (vendedor){
		if(!vendedor){
			res.status(500);
			res.json({
				type: false,
				data: "Imposible verificar el Correo Electronico, usuaro no existe..."
			});
		}else{
			vendedor.update({
				verificadoEmail: 1
			}).then(function (_vendedor){
				if(!_vendedor){
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

exports.putVendedor = function(req, res, next){
	models.Vendedor.findOne({
		where: {
			id: req.params.id
		}
	}).then(function (vendedor){
		if(!vendedor){
			res.status(500);
			res.json({
				type: false,
				data: "Registro no encontrado " + vendedor
			});
		}else{
			vendedor.update({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
    		email: req.body.email,
    		telefono: req.body.telefono,
    		avatar: req.body.avatar,
    		status: req.body.status,
    		ClienteId: req.body.ClienteId,
    		estadoVendedor: req.body.estadoVendedor
			}).then(function (_vendedor){
				if(!_vendedor){
					res.status(500);
					res.json({
						type: false,
						data: "Error al actualizar el registro " + _vendedor
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
	models.Vendedor.findOne({
		where: {
			id: req.params.id
		}
	}).then(function (vendedor){
		if(!vendedor){
			res.status(500);
			res.json({
				type: false,
				data: "registro no encontrado"
			});
		}else{
			vendedor.update({
				password: req.body.password
			}).then(function (_vendedor){
				if(!_vendedor){
					res.status(500);
					res.json({
						type: false,
						data: "Hubo un error al actualizar su Contraseña"
					});
				}else{
					res.status(200);
					res.json({
						type: true,
						data: "Se ha cambiado la Contraseña exitosamente"
					});
				};
			});
		};
	});
};

exports.deleteVendedor = function (req, res, next){
	models.Vendedor.findOne({
		where: {
			id: req.params.id
		}
	}).then(function (vendedor){
		if(!vendedor){
			res.status(500);
			res.json({
				type: false,
				data: "Registro no encontrado " + vendedor
			});
		}else{
			vendedor.update({
				status: 0
			}).then(function (_vendedor){
				if(!_vendedor){
					res.status(500);
					res.json({
						type: false,
						data: "Error al eliminar el registro " + _vendedor
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
