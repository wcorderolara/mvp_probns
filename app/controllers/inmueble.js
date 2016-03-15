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
		sendJSONresponse(res,200, {"type":true,"data": result});
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
			models.Usuario.findOne({
				where: {
					id: req.body.userId
				}
			}).then(function (user){
				user.addInmuebles(inmueble, {status: 1})
			})
			//models.Usuario.addInmuebles(inmueble, {status: 1, usuarioId: req.body.userId});
			//inmueble.addAnunciantes(JSON.parse(req.body.anunciantesInmueble), {status: 1, inmuebleId: inmueble.id});
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
			status: item.status,
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
			status: item.status,
			InmuebleId: inmuebleId
		}).then(function (amenity){
			if(!amenity){
				sendJSONresponse(res,400,{"type":false, "message": "Error al agregar la amenidad", "data" : amenity});
			}
		})
	})
}

exports.putInmueble = function (req, res, next){
	models.Inmueble.findOne({
		where: {
			id: req.params.id,
			status: 1
		}
	}).then(function (inmueble){
		if(!inmueble){
			sendJSONresponse(res, 400, {"type": false, "message": "Error al obtener el registro", "data": inmueble});
		}else{
			inmueble.update({
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
			}).then(function (_inmueble){
				uploadImagenesInmueble(res, JSON.parse(req.body.imagenesInmueble), _inmueble.id);
				uploadAmenitiesInmueble(res, JSON.parse(req.body.amenitiesInmueble), _inmueble.id);
				sendJSONresponse(res, 200, {"type":true, "message":"Inmueble actualizado con exito"});
			})
		}
	})
}

exports.deleteInmueble = function (req, res, next){
	models.Inmueble.findOne({
		where: {
			id: req.params.id,
			status: 1
		}
	}).then(function (inmueble){
		if(!inmueble){
			sendJSONresponse(res, 400, {"type": false, "message": "Error al obtener el registro", "data": inmueble});
		}else{
			inmueble.update({
				status: 0
			}).then(function (_inmueble){				
				sendJSONresponse(res, 200, {"type":true, "message":"Inmueble eliminado con exito"});
			})
		}
	})
}

exports.getTotalInmueblesUsuario = function (req, res, next){
	models.Inmueble.findAndCountAll({
		where: {
			status: 1
		},
		include: [
			{
				model: models.Usuario,
				attributes: ['id', 'userLogin', 'firstName', 'lastName'],
				where:{
					status: 1,
					id: req.params.usuarioId
				}
			}
		]
	}).then(function (inmuebles){
		if(!inmuebles){
			sendJSONresponse(res, 400, {"type":false,"message":"Error al obtener los registros","data":inmuebles});
		}else{
			sendJSONresponse(res, 200, {"type":true,"data": inmuebles.count});
		}
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
				where:{
					status: 1
				}
			},
			// {
			// 	model: models.Anunciantes,
			// 	attributes: ['id','descripcion'],
			// 	where:{
			// 		status: 1
			// 	}
			// },
			{
				model: models.imagenInmueble,
				attributes: ['cdnId','path','descripcion'],
				where:{
					status: 1,
					InmuebleId: req.params.id
				}

			},
			{
				model: models.amenityInmueble,
				attributes: ['id', 'descripcion', 'cantidad'],
				where:{
					status: 1,
					InmuebleId: req.params.id
				}
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
				where: {id: req.params.usuarioId}								
			},
			// {
			// 	model: models.Anunciantes,
			// 	attributes: ['id','descripcion'],
			// 	where:{
			// 		status: 1
			// 	}
			// },
			{
				model: models.imagenInmueble,
				attributes: ['cdnId','path','descripcion'],
				where:{
					status: 1
				}
			},
			{
				model: models.amenityInmueble,
				attributes: ['id', 'descripcion', 'cantidad'],
				where:{
					status: 1
				}
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
		order: 'numeroVisitas DESC'
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
