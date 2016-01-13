'use strict'
var models = require('../../models');

exports.getAmenities = function (req, res, next){
	models.Amenity.findAll({
		where:{
			status: 1
		}
	}).then(function (amenities){
		if(!amenities){
			res.status(500);
			res.json({
				type: false,
				data: "Hubo un error al intentar obtener los registros..."
			});
		}else{
			res.status(200),
			res.json({
				type: true,
				data: amenities
			});
		};
	});
};

exports.getAmenityById = function(req, res, next){
	models.Amenity.findOne({
		where: {
			id: req.params.id,
			status: 1
		}
	}).then(function (amenity){
		if(!amenity){
			res.status(500);
			res.json({
				type: false,
				data: "Hubo un error al intentar recuperar el registro"
			});
		}else{
			res.status(200);
			res.json({
				type: true,
				data: amenity
			});
		};
	});
};

exports.postAmenity = function(req, res, next){
	models.Amenity.create({
		idDivisionAmenity: req.body.idDivisionAmenity,
		descripcion: req.body.descripcion,
		status: 1
	}).then(function (amenity){
		if(!amenity){
			res.status(500);
			res.json({
				type: false,
				data: "Hubo un error al agregar el registro..."
			});
		}else{
			res.status(200);
			res.json({
				type: true,
				data: "Registro agregado exitosamente..."
			});
		};
	});
};

exports.putAmenity = function(req, res, next){
	models.Amenity.findOne({
		where: {
			id: req.params.id
		}
	}).then(function (amenity){
		if(!amenity){
			res.status(500);
			res.json({
				type: false,
				data: "Error, registro no encontrado..."
			});
		}else{
			amenity.update({
				idDivisionAmenity: req.body.idDivisionAmenity,
				descripcion: req.body.descripcion,
				status: req.body.status
			}).then(function (_amenity){
				if(!_amenity){
					res.status(500);
					res.json({
						type: false,
						data: "Error al intentar actualizar el registro..."
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

exports.deleteAmenity = function(req, res, next){
	models.Amenity.findOne({
		where: {
			id: req.params.id
		}
	}).then(function (amenity){
		if(!amenity){
			res.status(500);
			res.json({
				type: false,
				data: "Error, registro no encontrado..."
			});
		}else{
			amenity.update({
				status: 0
			}).then(function (_amenity){
				if(!_amenity){
					res.status(500);
					res.json({
						type: false,
						data: "Error al intentar eliminar el registro..."
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
