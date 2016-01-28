var models = require('../../models');

exports.getTiposBuscador = function(req, res, next){
	models.tipoBuscador.findAll({
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

exports.getTipoBuscadorById = function(req, res, next){
	models.tipoBuscador.findOne({
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

exports.postTipoBuscador = function(req, res, next){
	models.tipoBuscador.create({
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

exports.putTipoBuscador = function(req, res, next){
	models.tipoBuscador.findOne({
		where:{
			id: req.params.id
		}
	}).then(function (tipoBuscador){
		if(!tipoBuscador){
			res.status(500);
			res.json({
				type: false,
				data: "Registro no encontrado..."
			});
		}else{
			tipoBuscador.update({
				descripcion: req.body.descripcion
			}).then(function (_tipoBuscador){
				if(!_tipoBuscador){
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

exports.deleteTipoBuscador = function(req, res, next){
	models.tipoBuscador.findOne({
		where:{
			id: req.params.id
		}
	}).then(function (tipoBuscador){
		if(!tipoBuscador){
			res.status(500);
			res.json({
				type: false,
				data: "Registro no encontrado..."
			});
		}else{
			tipoBuscador.update({
				status: 0
			}).then(function (_tipoBuscador){
				if(!_tipoBuscador){
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
