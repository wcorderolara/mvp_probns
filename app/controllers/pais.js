var models = require('../../models');

exports.getPaises = function (req, res, next){
	models.Pais.findAll({
		where: {
			status: true
		}
	}).then(function (paises){
		if(!paises){
			res.status(500);
			res.json({
				type: false,
				data: "no se pudieron encontrar los paises: " + paises
			});
		}else{
			res.status(200);
			res.json({
				type: true,
				data: paises
			});
		};
	});
};

exports.getPaisById = function (req, res, next){
	models.Pais.findOne({
		where: {
			id : req.params.id
		}
	}).then(function (pais){
		if(!pais){
			res.status(500);
			res.json({
				type: false,
				data: "País no encontrado ..."
			});
		}else{
			res.status(200);
			res.json({
				type: true,
				data: pais
			});
		};
	});
};

exports.postPais = function (req, res, next){
	models.Pais.create({
		descripcion : req.body.descripcion,
		flag : req.body.flag,
		status : true
	}).then(function (pais){
		if(!pais){
			res.status(500);
			res.json({
				type : false,
				data : "Ha ocurrido un erro: " + pais
			});
		}else{
			res.status(200);
			res.json({
				type : true,
				data : "País agregado exitosamente ..."
			});
		};
	});
};

exports.putPais = function (req, res, next){
	model.Pais.findOne({
		where: {
			id: req.body.id
		}
	}).then(function (pais){
		if(!pais){
			res.status(500);
			res.json({
				type: false,
				data: "País no encontrado."
			})
		}else{
			pais.update({
				descripcion : req.body.descripcion,
				flag : req.body.flag,
				status : req.body.status
			}).then(function (_pais){
				if(!_pais){
					res.status(500);
					res.json({
						type: false,
						data: "Error al actualizar el Pais: " + _pais.descripcion
					});
				}else{
					res.status(200);
					res.json({
						type: true,
						data: "País actualizado exitosamente ..."
					});
				};
			});
		};
	});
};

exports.deletePais = function (req, res, next){
	models.Pais.findOne({
		where: {
			id: req.body.id
		}
	}).then(function (pais){
		if(!pais){
			res.status(500);
			res.json({
				type: false,
				data: "País no encontrado."
			})
		}else{
			pais.update({
				status: false
			}).then(function (_pais){
				if(!_pais){
					res.status(500);
					res.json({
						type: false,
						data: "Error al actualizar el Pais: " + _pais.descripcion
					});
				}else{
					res.status(200);
					res.json({
						type: true,
						data: "País Eliminado exitósamente ..."
					});
				};
			});
		}
	})
};

