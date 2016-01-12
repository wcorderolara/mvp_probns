var models = require('../../models');

exports.getDepartamentos = function (req, res, next){
	models.Departamento.findAll({
		where: {
			idPais: req.params.idPais,
			status: 1
		}
	}).then(function (departamentos){
		if(!departamentos){
			res.status(500);
			res.json({
				type: false,
				data: "no se pudieron encontrar los estados."
			});
		}else{
			res.status(200);
			res.json({
				type: true,
				data: departamentos
			});
		};
	});
};

exports.getDepartamentoById = function (req, res, next){
	models.Departamento.findOne({
		where: {
			id : req.params.id
		}
	}).then(function (departamento){
		if(!departamento){
			res.status(500);
			res.json({
				type: false,
				data: "Departamento no encontrado ..."
			});
		}else{
			res.status(200);
			res.json({
				type: true,
				data: departamento
			});
		};
	});
};

exports.postDepartamento = function (req, res, next){
	models.Departamento.create({
		idPais: req.body.idPais,
		descripcion : req.body.descripcion,
		status : 1
	}).then(function (departamento){
		if(!departamento){
			res.status(500);
			res.json({
				type : false,
				data : "Ha ocurrido un error: " + departamento
			});
		}else{
			res.status(200);
			res.json({
				type : true,
				data : "Departamento agregado exitosamente ..."
			});
		};
	});
};

exports.putDepartamento = function (req, res, next){
	models.Departamento.findOne({
		where: {
			id: req.body.id,
			status: 1
		}
	}).then(function (departamento){
		if(!departamento){
			res.status(500);
			res.json({
				type: false,
				data: "Departamento no encontrado."
			})
		}else{
			departamento.update({
				idPais: req.body.idPais,
				descripcion : req.body.descripcion,
				status : req.body.status
			}).then(function (_departamento){
				if(!_departamento){
					res.status(500);
					res.json({
						type: false,
						data: "Error al actualizar el Departamento: " + _departamento.descripcion
					});
				}else{
					res.status(200);
					res.json({
						type: true,
						data: "Departamento actualizado exitosamente ..."
					});
				};
			});
		};
	});
};

exports.deleteDepartamento = function (req, res, next){
	models.Departamento.findOne({
		where: {
			id: req.params.id
		}
	}).then(function (departamento){
		if(!departamento){
			res.status(500);
			res.json({
				type: false,
				data: "Departamento no encontrado."
			})
		}else{
			departamento.update({
				status: 0
			}).then(function (_departamento){
				if(!_departamento){
					res.status(500);
					res.json({
						type: false,
						data: "Error al actualizar el Departamento: " + _departamento.descripcion
					});
				}else{
					res.status(200);
					res.json({
						type: true,
						data: "Departamento Eliminado exitósamente ..."
					});
				};
			});
		}
	})
};

