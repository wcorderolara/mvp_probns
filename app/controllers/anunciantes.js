var models = require('../../models');

exports.getAnunciantes = function(req, res, next){
	models.Anunciantes.findAll({
		where:{
			status: 1
		},
		attributes: ['id', 'descripcion']
	}).then(function (response){
		if(!response){
			res.status(500);
			res.json({
				type:false,
				data: "Error al obtener los registros..."
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

exports.getAnuncianteById = function(req, res, next){
	models.Anunciantes.findOne({
		where:{
			id: req.params.id
		}
	}).then(function (response){
		if(!response){
			res.status(500);
			res.json({
				type: false,
				data: "Error al obtener el registro..."
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

exports.postAnunciantes = function(req, res, next){
	models.Anunciantes.create({
		descripcion: req.body.descripcion,
		status: 1
	}).then(function (response){
		if(!response){
			res.status(500);
			res.json({
				type: false,
				data: "Error al intentar guardar el registro..."
			});
		}else{
			res.status(200);
			res.json({
				type: true,
				data: "Registro creado exitosamente..."
			});
		};
	});
};

exports.putAnunciantes = function(req, res, next){
	models.Anunciantes.findOne({
		where:{
			id: req.params.id
		}
	}).then(function (anunciante){
		if(!anunciante){
			res.status(500);
			res.json({
				type: false,
				data: "Registro no encontrado..."
			});
		}else{
			anunciante.update({
				descripcion: req.body.descripcion,
				status: req.body.status
			}).then(function (_anunciante){
				if(!_anunciante){
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

exports.deleteAnunciantes = function(req, res, next){
	models.Anunciantes.findOne({
		where:{
			id: req.params.id
		}
	}).then(function (anunciante){
		if(!anunciante){
			res.status(500);
			res.json({
				type: false,
				data: "Registro no encontrado..."
			});
		}else{
			anunciante.update({
				status: 0
			}).then(function (_anunciante){
				if(!_anunciante){
					res.status(500);
					res.json({
						type: false,
						data: "Ocurrio un error al intentar eliminar el registro..."
					});
				}else{
					res.status(200);
					res.json({
						type: true,
						data: "Registro eliminado exitosamente..."
					});
				};
			});
		};
	});
};
