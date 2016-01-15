'use strict'
var models = require("../../models");

exports.getClientes = function (req, res, next){
	models.Cliente.findAll({
		include: [models.tipoCliente, models.Usuario],
		where: {
			idVendedorAsignado: req.params.idVendedorAsignado,
			status: 1
		}
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

exports.getClienteById = function (req, res, next){
	models.Cliente.findOne({
		include: [models.tipoCliente, models.Usuario],
		where: {
			id: req.params.id,
			status: 1
		}
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
		idTipoCliente: req.body.idTipoCliente,
		nombre: req.body.nombre,
		telefono: req.body.telefono, 
		celular: req.body.celular,
		direccion: req.body.direccion,
		email: req.body.email,
		idEstadoCliente: 1,
		ultimaAccion: req.body.ultimaAccion,
		idVendedorAsignado: req.body.idVendedorAsignado,
		status: 1
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
				idTipoCliente: req.body.idTipoCliente,
				nombre: req.body.nombre,
				telefono: req.body.telefono, 
				celular: req.body.celular,
				direccion: req.body.direccion,
				email: req.body.email,
				idEstadoCliente: req.body.idEstadoCliente,
				ultimaAccion: req.body.ultimaAccion,
				idVendedorAsignado: req.body.idVendedorAsignado,
				status: req.body.status
			}).then(function (_cliente){
				if(!_cliente){
					res.status(500);
					res.json({
						type: false,
						data: "Error al actualizar el registro " + _cliente`
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
						data: "Error al eliminar el registro " + _cliente`
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