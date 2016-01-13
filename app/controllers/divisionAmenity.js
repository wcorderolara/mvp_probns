'use strict'
var models = require('../../models');

exports.getDivisionesAmenity = function (req, res, next){
	models.divisionAmenity.findAll({
		where: {
			status : 1
		}
	}).then(function (divisiones){
		if(!divisiones){
			res.status(500);
			res.json({
				type: false,
				data: "hubo un error al cargar las divisiones de los Amenities"
			});
		}else{
			res.status(200);
			res.json({
				type: true,
				data: divisiones
			});
		};
	});
};

exports.getDivisionAmenityById = function (req, res, next){
	models.divisionAmenity.findOne({
		where: {
			id: req.params.id,
			status: 1
		}
	}).then(function (division){
		if(!division){
			res.status(500);
			res.json({
				type: false,
				data: "No se encontro el Amenity solicitado"
			});
		}else{
			res.status(500);
			res.json({
				type: true,
				data: division
			});
		};
	});
};

exports.postDivisionAmenity = function (req, res, next){
	models.divisionAmenity.create({
		descripcion: req.params.descripcion,
		status: 1
	}).then(function (division){
		if(!division){
			res.status(500);
			res.json({
				type: false,
				data: "Hubo un error al crear el registro..."
			});
		}else{
			res.status(200);
			res.json({
				type: false,
				data: "Registro agregado exitosamente..."
			});
		};
	});
};

exports.putDivisionAmenity = function(req, res, next){
	models.divisionAmenity.findOne({
		where: {
			id: req.params.id
		}
	}).then(function(division){
		if(!division){
			res.status(500);
			res.json({
				type: false, 
				data: "Registro no encontrado..."
			});
		}else{
			division.update({
				descripcion: req.params.descripcion,
				status: parseInt(req.params.status)
			}).then(function (_division){
				if(!_division){
					res.status(500);
					res.json({
						type: false,
						data: "Error al intentar actualizar el registro"
					});
				}else{
					res.status(200);
					res.json({
						type: false,
						data: "Registro actualizado exitosamente..."
					});
				};
			});
		};
	});
};

exports.deleteDivisionAmenity = function(req, res, next){
	models.divisionAmenity.findOne({
		where: {
			id: req.params.id
		}
	}).then(function (division){
		if(division){
			res.status(500);
			res.json({
				type: false,
				data: "Registro no encontrado..."
			});
		}else{
			division.update({
				status: 0
			}).then(function (_division){
				if(!_division){
					res.status(500);
					res.json({
						type: false,
						data: "Error al intentar eliminar el registro..."
					});
				}else{
					res.status(200);
					res.json({
						type: false,
						data: "Registro eliminado exitosamente..."
					});
				};
			});
		};
	});
};