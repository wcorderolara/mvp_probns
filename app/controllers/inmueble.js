'use strict'
var models = require("../../models");
var moment = require('moment');
var cloudinary = require('cloudinary');
var settings = require('../../settings');
var Sequelize = require('sequelize');

cloudinary.config({
	cloud_name: process.env.CDN_NAME,
	api_key: process.env.CDN_API_KEY,
	api_secret: process.env.CDN_API_SECRET
})

var sendJSONresponse = function(res, status, content){
	res.status(status);
	res.json(content);
}
//Inmuebles
exports.uploadImage = function(req, res, next){
	cloudinary.uploader.upload(req.files.img_property, function(result, callback){
		sendJSONresponse(res,200, {"image": result});
	});
}

exports.postInmueble = function (req, res, next){
	models.Inmueble.create({
		descripcion: req.body.descripcion || "",
		precioPropiedad: req.body.precioPropiedad,
		direccionCorta: req.body.direccionCorta,
		direccion: req.body.direccion,
		latitud: req.body.latitud || "",
		longitud: req.body.longitud || "",
		extensionPropiedad: req.body.extensionPropiedad || "",
		areaConstruccion: req.body.areaConstruccion || "",
		anioConstruccion: req.body.anioConstruccion || "",
		observaciones: req.body.observaciones || "",
		DepartamentoId: req.body.DepartamentoId,
		estadoInmuebleId: req.body.estadoInmuebleId,
		tipoInmuebleId: req.body.tipoInmuebleId,
		operacionInmuebleId: req.body.operacionInmuebleId,
		PaiId: req.body.PaiId,
		MunicipioId: req.body.MunicipioId
	}).then(function (inmueble){
		if(!inmueble){			
			sendJSONresponse(res, 400, {"type": false, "data": "Error al agregar la propiedad: " + inmueble});
		}else{
			// models.Usuario.findOne({
			// 	where: {
			// 		id: req.body.userId
			// 	}
			// }).then(function (user){
			// 	user.addInmuebles(inmueble, {status: 1})
			// })
			models.Usuario.addInmuebles(inmueble, {status: 1, usuarioId: req.body.userId});
			uploadImagenesInmueble(res, JSON.parse(req.body.imagenesInmueble), inmueble.id);
			uploadAmenitiesInmueble(res, JSON.parse(req.body.amenitiesInmueble), inmueble.id);
			sendJSONresponse(res,200, {"type":true, "data": inmueble, "message": "Propiedad creada exitosamente"})
		}
	})
}

function uploadImagenesInmueble (res, imagenesInmuebleArray, inmuebleId){
	var arrayImagenes = [];
	arrayImagenes = imagenesInmuebleArray;
	arrayImagenes.forEach(function (item){
		models.imagenInmueble.create({
			cdnId: item.public_id,
			path: item.img_url,
			descripcion: item.descripcion || "",
			status: 1,
			InmuebleId: inmuebleId
		}).then(function (imagen){
			if(!imagen){
				sendJSONresponse(res,400,{"type":false, "message": "Error al agregar la imagen", "data": imagen});
			}
		})
	})
}

function uploadAmenitiesInmueble (res, amenitiesInmuebleArray, inmuebleId){
	var arrayAmenities = [];
	arrayAmenities = amenitiesInmuebleArray;
	arrayAmenities.forEach(function (item){
		models.amenityInmueble.create({
			descripcion: item.descripcion,
			cantidad: item.cantidad,
			status: 1,
			InmuebleId: inmuebleId
		}).then(function (amenity){
			if(!amenity){
				sendJSONresponse(res,400,{"type":false, "message": "Error al agregar la amenidad", "data" : amenity});
			}
		})
	})
}

exports.getInmuebleById = function(req, res, next){
	models.Inmueble.findOne({
		where: {
			id: req.params.id,
			status: 1
		},
		include: [
			{
				model: models.Usuario,
				attributes: ['id', 'userLogin', 'firstName', 'lastName'],
			},
			{
				model: models.tipoInmueble,
				attributes: ['id','descripcion'],
				where:{
					status: 1
				}
			},
			{
				model: models.estadoInmueble,
				attributes: ['id', 'descripcion'],
				where: {
					status: 1
				}
			},
			{
				model: models.operacionInmueble,
				attributes: ['id', 'descripcion'],
				where:{
					status: 1
				}
			},
			{
				model: models.Pais,
				attributes: ['id', 'descripcion'],
				where: {
					status: 1
				}
			},
			{
				model: models.Departamento,
				attributes: ['id', 'descripcion'],
				where: {
					status: 1
				}
			},
			{
				model: models.Municipio,
				attributes: ['id', 'descripcion'],
				where: {
					status: 1
				}
			}
		],
	}).then(function (response){
		if(!response){
			sendJSONresponse(res, 500, {"type": false, "message": "Error al obtener el registro", "data": response});
		}else{
			sendJSONresponse(res, 200, {"type": true, "data": response});
		};
	});
}

exports.getInmueblesUsuario = function (req, res, next){
	models.Inmueble.findAll({
		where: {
			status: 1
		},
		include: [
			{
				model: models.Usuario,
				attributes: ['id', 'userLogin', 'firstName', 'lastName'],
				where: {id: req.params.id}								
			},
			{
				model: models.tipoInmueble,
				attributes: ['id','descripcion'],
				where:{
					status: 1
				}
			},
			{
				model: models.estadoInmueble,
				attributes: ['id', 'descripcion'],
				where: {
					status: 1
				}
			},
			{
				model: models.operacionInmueble,
				attributes: ['id', 'descripcion'],
				where:{
					status: 1
				}
			},
			{
				model: models.Pais,
				attributes: ['id', 'descripcion'],
				where: {
					status: 1
				}
			},
			{
				model: models.Departamento,
				attributes: ['id', 'descripcion'],
				where: {
					status: 1
				}
			},
			{
				model: models.Municipio,
				attributes: ['id', 'descripcion'],
				where: {
					status: 1
				}
			}
		],
		order: 'createdAt DESC'
		/*order: [
			['createdAt','DESC'],
			[Sequelize.fn('max', Sequelize.col('numeroVisitas')), 'DESC'],
		]*/
	}).then(function (response){
		if(!response){
			sendJSONresponse(res, 500, {"type": false, "message": "Error al obtener los registros", "data": response});
		}else{
			sendJSONresponse(res, 200, {"type": true, "data": response});
		};
	});
};

/*
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
};*/
