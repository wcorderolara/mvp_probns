'use strict'
var models = require("../../models");
var moment = require('moment');
var service = require('../service/service');

//Obtener buscadores por Agencia Asociada
exports.getBuscadoresByAgencia = function (req, res, next){
	models.Buscador.findAll({
		where: {
			status: 1,
			agenciaAsociadaId: req.params.agenciaAsociadaId
		},
		attributes: ['id','nombre','apellido','email','telefono1','direccion','presupuestoMin', 'presupuestoMax'],
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
				attributes: ['id', 'firstName', 'lastName','userLogin'],
				where: {
					status: 1
				}
			},
			// {
			// 	model: models.Usuario,
			// 	as: 'vendedorAsignado',
			// 	attributes: ['id','firstName','lastName'],
			// 	where: {
			// 		status: 1
			// 	}
			// },
			{
				model: models.estadoBuscador,
				attributes: ['id','descripcion'],
				where: {
					status: 1
				}
			}
		],
		order: 'apellido ASC'
	}).then(function (buscadores){
		if(!buscadores){
			service.sendJSONresponse(res,500,{"type":false,"message":"Error al obtener los registros","data":buscadores})
		}else{
			service.sendJSONresponse(res,200,{"type":true,"data":buscadores});
		};
	});
};

// obtener todos los buscadores asignados a un agente
exports.getBuscadoresAgente = function (req, res, next){
	models.Buscador.findAll({
		where: {
			status: 1,
			vendedorAsignadoId: req.params.vendedorAsignadoId
		},
		attributes: ['id','nombre','apellido','email','telefono1','direccion','presupuestoMin', 'presupuestoMax'],
		include:[
			{
				model: models.tipoBuscador,
				attributes: ['id','descripcion'],
				where:{
					status: 1
				}
			},
			// {
			// 	model: models.Usuario,
			// 	as: 'agenciaAsociada',
			// 	attributes: ['id', 'firstName', 'lastName','userLogin'],
			// 	where: {
			// 		status: 1
			// 	}
			// },
			{
				model: models.Usuario,
				as: 'vendedorAsignado',
				attributes: ['id','firstName','lastName', 'email'],
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
		],
		order: 'apellido ASC'
	}).then(function (buscadores){
		if(!buscadores){
			service.sendJSONresponse(res,500,{"type":false,"message":"Error al obtener los registros","data":buscadores})
		}else{
			service.sendJSONresponse(res,200,{"type":true,"data":buscadores});
		};
	});
};


//obtener un buscador por ID
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
				attributes: ['id', 'firstName', 'lastName','userLogin'],
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
			service.sendJSONresponse(res,500,{"type":false,"message":"Error al obtener el registro","data": buscador});
		}else{
			service.sendJSONresponse(res,200,{"type":true,"data":buscador});
		};
	});
};

//agregar un buscador
exports.postBuscador = function (req, res, next){
	models.Buscador.create({
		nombre: req.body.nombre,
		apellido: req.body.apellido,
		email: req.body.email,
		telefono1: req.body.telefono1,
		direccion: req.body.direccion,
		presupuestoMin: req.body.presupuestoMin || 0,
		presupuestoMax: req.body.presupuestoMax || 0,
		ultimaAccion: req.body.ultimaAccion || "creacion",
		tipoBuscadorId: req.body.tipoBuscadorId,
		vendedorAsignadoId: req.body.vendedorAsignadoId || null,
		agenciaAsociadaId: req.body.agenciaAsociadaId,
		estadoBuscadorId: req.body.estadoBuscadorId || 1
	}).then(function (buscador){
		if(!buscador){
			service.sendJSONresponse(res,500,{"type":false,"message":"Error al crear el registro","data":buscador});
		}else{
			service.sendJSONresponse(res,200,{"type":true,"data":buscador, "message":"Cliente creado exitosasmente..."});
		};
	});
};

//Listado de Inmuebles por buscador
exports.getInmueblesBuscador = function(req, res, next){
	models.Buscador.findOne({
		where: {
			id: req.params.buscadorId,
			status: 1
		}
	}).then(function (buscador){
		if(!buscador){
			service.sendJSONresponse(res,500,{"type":false,"message":"error al obtener el cliente","data":buscador});			
		}else{
			buscador.getInmuebles().then(function (result){
				service.sendJSONresponse(res,200,{"type":true,"data":result});
			})
		}
	})
}

//total de Clientes por agencia
exports.getTotalBuscadoresCliente = function(req, res, next){
	models.Buscador.findAndCountAll({
		where: {
			agenciaAsociadaId: req.params.agenciaAsociadaId,
			status: 1
		}
	}).then(function (buscadores){
		if(!buscadores){
			service.sendJSONresponse(res, 400, {"type":false,"message":"Error al obtener los registros","data":buscadores});
		}else{
			service.sendJSONresponse(res, 200, {"type":true,"data": buscadores.count});
		}
	})
}

//Agregar inmuebles a un buscador
exports.addInmuebleBuscador = function (req, res, next){
	models.Inmueble.findOne({
		where: {
			id: req.params.inmuebleId,
			status: 1
		}
	}).then(function (inmueble){
		if(!inmueble){
			service.sendJSONresponse(res,500,{"type":false,"message":"Error al obtener el inmueble","data":inmueble});
			return;
		}else{
			models.Buscador.findOne({
				where: {
					id: req.body.buscadorId,
					status: 1
				}
			}).then(function (buscador){
				if(!buscador){
					return;
				}else{
					buscador.addInmuebles(inmueble, {
						descripcion: req.body.descripcion,
						status: 1,
						buscadorId: req.body.buscadorId
					});
				}
			})
			service.sendJSONresponse(res,200,{"type":true,"message":"Inmueble agregado exitosasmente"});
		}		
	})
}

//Modificar un Buscador
exports.putBuscador = function (req, res, next){
	models.Buscador.findOne({
		where:{
			id: req.params.id,
			status: 1
		}
	}).then(function (buscador){
		if(!buscador){
			service.sendJSONresponse(res,500,{"type":false,"message":"Error al obtener el registro","data":buscador});
		}else{
			buscador.update({
				nombre: req.body.nombre,
				apellido: req.body.apellido,
				email: req.body.email,
				telefono1: req.body.telefono1 || null,
				direccion: req.body.direccion,
				presupuestoMix: req.body.presupuestoMix,
				presupuestoMax: req.body.presupuestoMax, 
				ultimaAccion: req.body.ultimaAccion,
				tipoBuscadorId: req.body.tipoBuscadorId,
				vendedorAsignadoId: req.body.vendedorAsignadoId,
				agenciaAsociadaId: req.body.agenciaAsociadaId,
				estadoBuscadorId: req.body.estadoBuscadorId
			}).then(function (_buscador){
				if(!_buscador){
					service.sendJSONresponse(res,500,{"type":false,"messasge":"Error al actualizar el registro","data":_buscador});
				}else{
					service.sendJSONresponse(res,200,{"type":true,"message":"Registro Actualizado exitosamente"});
				};
			});
		};
	});
};

//Eliminar un Buscador
exports.deleteBuscador = function (req, res, next){
	models.Buscador.findOne({
		where: {
			id: req.params.id,
			status: 1
		}
	}).then(function (buscador){
		if(!buscador){
			service.sendJSONresponse(res,500,{"type":false,"message":"Error al obtener el registro","data":buscador});
		}else{
			buscador.update({
				status: 0
			}).then(function (_buscador){
				if(!_buscador){
					service.sendJSONresponse(res,500,{"type":false,"messasge":"Error al eliminar el registro","data":_buscador});
				}else{
					service.sendJSONresponse(res,200,{"type":true,"message":"Registro Eliminado exitosamente"});
				};
			});
		};
	});
};