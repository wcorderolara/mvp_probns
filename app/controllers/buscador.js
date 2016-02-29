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

exports.getBuscadoresByAgencia = function (req, res, next){
	models.Buscador.findAll({
		where: {
			status: 1,
			agenciaAsociadaId: req.params.agenciaAsociadaId
		},
		attributes: ['id','nombre','apellido','email','telefono1','direccion','presupuesto'],
		include:[
			{
				model: models.tipoBuscador,
				attributes: ['id','descripcion'],
				where:{
					status: 1
				}
			},
			{
				model: models.Usuario,
				as: 'agenciaAsociada',
				attributes: ['id', 'firstName', 'lastName'],
				where: {
					status: 1
				}
			},
			{
				model: models.Usuario,
				as: 'vendedorAsignado',
				attributes: ['id','firstName','lastName'],
				where: {
					status: 1
				}
			},
			{
				model: models.estadoBuscador,
				attributes: ['id','descripcion'],
				where: {
					status: 1
				}
			}
		]
	}).then(function (buscadores){
		if(!buscadores){
			res.status(500);
			res.json({
				type: false,
				data: "Error al obtener los buscadores: " + buscadores
			});
		}else{
			res.status(200);
			res.json({
				type: true,
				data: buscadores
			});
		};
	});
};

exports.getBuscadorById = function(req, res, next){
	models.Buscador.findOne({
		where:{
			id: req.params.id,
			status: 1,
		},
		include:[
			{
				model: models.tipoBuscador,
				attributes: ['id','descripcion'],
				where:{
					status: 1
				}
			},
			{
				model: models.Usuario,
				as: 'agenciaAsociada',
				attributes: ['id', 'firstName', 'lastName'],
				where: {
					status: 1
				}
			},
			{
				model: models.Usuario,
				as: 'vendedorAsignado',
				attributes: ['id','firstName','lastName'],
				where: {
					status: 1
				}
			},
			{
				model: models.estadoBuscador,
				attributes: ['id','descripcion'],
				where: {
					status: 1
				}
			}
		]
	}).then(function (buscador){
		if(!buscador){
			res.status(500);
			res.json({
				type: false,
				data: "Error al obtener el registro: " + buscador
			});
		}else{
			res.status(200);
			res.json({
				type: true,
				data: buscador
			});
		};
	});
};

exports.postBuscador = function (req, res, next){
	models.Buscador.create({
		nombre: req.body.nombre,
		apellido: req.body.apellido,
		email: req.body.email,
		telefono1: req.body.telefono1,
		telefono2: req.body.telefono2 || null,
		direccion: req.body.direccion,
		presupuesto: req.body.presupuesto || 0,
		ultimaAccion: req.body.ultimaAccion || "creacion",
		tipoBuscadorId: req.body.tipoBuscadorId,
		agenciaAsociadaId: req.body.agenciaAsociadaId,
		vendedorAsignadoId: req.body.vendedorAsignadoId,
		estadoBuscadorId: req.body.estadoBuscadorId
	}).then(function (buscador){
		if(!buscador){
			res.status(500);
			res.json({
				type: false,
				data: "Error al crear el registro: " + buscador
			});
		}else{
			res.status(200);
			res.json({
				type: true,
				data: buscador
			});
		};
	});
};

exports.putBuscador = function (req, res, next){
	models.Buscador.findOne({
		where:{
			id: req.params.id,
			status: 1
		},
		include:[
			{
				model: models.tipoBuscador,
				attributes: ['id','descripcion'],
				where:{
					status: 1
				}
			},
			{
				model: models.Usuario,
				as: 'agenciaAsociada',
				attributes: ['id', 'firstName', 'lastName'],
				where: {
					status: 1
				}
			},
			{
				model: models.Usuario,
				as: 'vendedorAsignado',
				attributes: ['id','firstName','lastName'],
				where: {
					status: 1
				}
			},
			{
				model: models.estadoBuscador,
				attributes: ['id','descripcion'],
				where: {
					status: 1
				}
			}
		]
	}).then(function (buscador){
		if(!buscador){
			res.status(500);
			res.json({
				type: false,
				data: "Error al obtener el registro: " + buscador
			});
		}else{
			buscador.update({
				nombre: req.body.nombre,
				apellido: req.body.apellido,
				email: req.body.email,
				telefono2: req.body.telefono2 || null,
				direccion: req.body.direccion,
				presupuesto: req.body.presupuesto || 0,
				ultimaAccion: req.body.ultimaAccion || "creacion",
				tipoBuscadorId: req.body.tipoBuscadorId,
				agenciaAsociadaId: req.body.agenciaAsociadaId,
				vendedorAsignadoId: req.body.vendedorAsignadoId,
				estadoBuscadorId: req.body.estadoBuscadorId
			}).then(function (_buscador){
				if(!_buscador){
					res.status(500);
					res.json({
						type: false,
						data: "Error al actualizar el registro: " + _buscador
					});
				}else{
					res.status(200);
					res.json({
						type: false,
						message: "Registro Actualizado exitosamente",
						data: _buscador
					});
				};
			});
		};
	});
};

exports.deleteBuscador = function (req, res, next){
	models.Buscador.findOne({
		where: {
			id: req.params.id,
			status: 1
		},
		attributes: ['id','nombre','apellido','email','telefono1','direccion','presupuesto','status']
	}).then(function (buscador){
		if(!buscador){
			res.status(500);
			res.json({
				type: false,
				data: "Error al obtener el registro: " + buscador
			});
		}else{
			buscador.update({
				status: 0
			}).then(function (_buscador){
				if(!_buscador){
					res.status(500);
					res.json({
						type: false,
						data: "Error al actualizar el registro: " + _buscador
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