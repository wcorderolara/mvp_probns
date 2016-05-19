var models = require('../../models');

exports.getEstadosTarea = function(req, res, next){
	models.estadoTarea.findAll({
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

exports.getEstadoTareaById = function(req, res, next){
	models.estadoTarea.findOne({
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

exports.postEstadoTarea = function(req, res, next){
	models.estadoTarea.create({
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

exports.putEstadoTarea = function(req, res, next){
	models.estadoTarea.findOne({
		where:{
			id: req.params.id
		}
	}).then(function (estadoTarea){
		if(!estadoTarea){
			res.status(500);
			res.json({
				type: false,
				data: "Registro no encontrado..."
			});
		}else{
			estadoTarea.update({
				descripcion: req.body.descripcion
			}).then(function (_estadoTarea){
				if(!_estadoTarea){
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

exports.deleteEstadoTarea = function(req, res, next){
	models.estadoTarea.findOne({
		where:{
			id: req.params.id
		}
	}).then(function (estadoTarea){
		if(!estadoTarea){
			res.status(500);
			res.json({
				type: false,
				data: "Registro no encontrado..."
			});
		}else{
			estadoTarea.update({
				status: 0
			}).then(function (_estadoTarea){
				if(!_estadoTarea){
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
