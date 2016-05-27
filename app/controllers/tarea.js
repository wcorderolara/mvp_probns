'use strict'
var models = require('../../models');
var service = require('../service/service');

exports.getTareasByAgencia = function(req, res, next){
	models.Tarea.findAll({
		where:{
			status: 1,
			estadoTareaId: 1,
			UsuarioId: req.params.agenciaId,
			$or: {
				InmuebleId: null,
				BuscadorId: null
			}
		},
		attributes:['id', 'descripcion', 'relacion', 'createdAt', 'BuscadorId', 'InmuebleId', 'estadoTareaId', 
		            'usuarioAsignadoId', 'usuarioAsignoId', 'UsuarioId'],
		include:[
			{
				model: models.Buscador,
				attributes: ['id', 'nombre', 'apellido','email', 'telefono1'],
				where:{
					status: 1
				},
				required: false
			},
			{
				model: models.Inmueble,
				attributes: ['id','direccionCorta','codigoInmueble','imagenPrincipal'],
				where:{
					status: 1
				},
				required: false
			},
			{
				model: models.estadoTarea,
				attributes: ['id','descripcion'],
				where:{
					status:1
				}
			},
			{
				model: models.Usuario,
				as: 'usuarioAsignado',
				attributes: ['id','userLogin','firstName','lastName'],
				where:{
					status:1
				}
			},
			{
				model: models.Usuario,
				as: 'usuarioAsigno',
				attributes: ['id','userLogin','firstName','lastName'],
				where:{
					status:1
				}	
			}
		],
		order: 'createdAt ASC'
	}).then(function (tareas){
		if(!tareas){
			service.sendJSONresponse(res, 500, {"type":false, "message":"Error al obtener los registros"});
		}else{
			service.sendJSONresponse(res, 200, {"type":true, "data": tareas});
		}
	})
};

exports.getTareasByAgente = function(req, res, next){
	models.Tarea.findAll({
		where:{
			status: 1,
			usuarioAsignadoId: req.params.usuarioAsignadoId
		},
		attributes:['id', 'descripcion', 'relacion', 'createdAt', 'BuscadorId', 'InmuebleId', 'estadoTareaId', 
		            'usuarioAsignadoId', 'usuarioAsignoId', 'UsuarioId'],
		include:[
			{
				model: models.Buscador,
				attributes: ['id', 'nombre', 'apellido','email', 'telefono1'],
				where:{
					status: 1
				},
				required: false
			},
			{
				model: models.Inmueble,
				attributes: ['id','direccionCorta','codigoInmueble','imagenPrincipal'],
				where:{
					status: 1
				},
				required: false
			},
			{
				model: models.estadoTarea,
				attributes: ['id','descripcion'],
				where:{
					status:1
				}
			},
			{
				model: models.Usuario,
				as: 'usuarioAsigno',
				attributes: ['id','userLogin','firstName','lastName'],
				where:{
					status:1
				}	
			}
		],
		order: 'createdAt DESC'
	}).then(function (tareas){
		if(!tareas){
			service.sendJSONresponse(res, 500, {"type": false, "message": "Error al obtener los registros"});
		}else{
			service.sendJSONresponse(res, 200, {"type": true, "data": tareas});
		}
	})
};

exports.postTarea = function(req, res, next){
	models.Tarea.create({
		descripcion: req.body.descripcion,
		relacion: req.body.relacion,
		estadoTareaId: req.body.estadoTareaId || 1,
		BuscadorId: req.body.BuscadorId || null,
		InmuebleId: req.body.InmuebleId || null,
		usuarioAsignadoId: req.body.usuarioAsignadoId,
		usuarioAsignoId: req.body.usuarioAsignoId,
		UsuarioId: req.body.UsuarioId || null
	}).then(function (tarea){
		if(!tarea){
			service.sendJSONresponse(res, 500, {"type": false, "message": "Error al crear la tarea", "data": tarea });
		}else{
			service.sendJSONresponse(res, 200, {"type": true, "message": "Tarea creada exitosamente"});
		}
	})
};

exports.putTarea = function(req, res, next){
	models.Tarea.findOne({
		where:{
			status: 1,
			id: req.params	.id
		}
	}).then(function (tarea){
		if(!tarea){
			service.sendJSONresponse(res, 404, {"type": false, "message": "Error al obtener el registro"});			
		}else{
			tarea.update({
				descripcion: req.body.descripcion,
				relacion: req.body.relacion,
				BuscadorId: req.body.BuscadorId || null,
				InmuebleId: req.body.InmuebleId || null,
				usuarioAsignadoId: req.body.usuarioAsignadoId,
				usuarioAsignoId: req.body.usuarioAsignoId,
				UsuarioId: req.body.UsuarioId || null
			}).then(function (_tarea){
				if(!_tarea){
					service.sendJSONresponse(res, 500, {"type": false, "message": "Error al actualizar el registro"});
				}else{
					service.sendJSONresponse(res, 200, {"type": false, "message": "Registro Actualizado."});
				}
			})
		}
	})	
};

exports.finalizarTarea = function(req,res,next){
	models.Tarea.findOne({
		where:{
			status: 1,
			id: req.params.id
		}
	}).then(function (tarea){
		if(!tarea){
			service.sendJSONresponse(res, 404, {"type": false, "message": "Error al obtener el registro"});			
		}else{
			tarea.update({
				estadoTareaId: 2,
				comentarioFinal: req.body.comentarioFinal || null
			}).then(function (_tarea){
				if(!_tarea){
					service.sendJSONresponse(res, 500, {"type": false, "message": "Error al actualizar el registro"});
				}else{
					service.sendJSONresponse(res, 200, {"type": false, "message": "Tarea finalizada."});
				}
			})
		}
	})
};

exports.deleteTarea = function (req, res, next){
	models.Tarea.findOne({
		where:{
			status: 1,
			id: req.params.id
		}
	}).then(function (tarea){
		if(!tarea){
			service.sendJSONresponse(res, 404, {"type": false, "message": "Error al obtener el registro"});			
		}else{
			tarea.update({
				status: 0
			}).then(function (_tarea){
				if(!_tarea){
					service.sendJSONresponse(res, 500, {"type": false, "message": "Error al actualizar el registro"});
				}else{
					service.sendJSONresponse(res, 200, {"type": false, "message": "Tarea Eliminada."});
				}
			})
		}
	})
};

