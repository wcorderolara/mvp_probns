'use strict'
var models = require("../../models");
var moment = require('moment');
var service = require('../service/service');

exports.trackingInmueble = function(req, res, next){
	models.Inmueble.findOne({
		where: {
			id: req.params.id
		}
	}).then(function (inmueble){
		if(!inmueble){
			service.sendJSONresponse(res, 400, {"type": false, "message": "Error al obtener el inmueble", "data": inmueble});
			return false;
		}else{
			var _visitas = parseInt(inmueble.numeroVisitas);
			inmueble.update({
				numeroVisitas: parseInt(_visitas + 1)
			}).then(function (_inmueble){
				if(!_inmueble){
					service.sendJSONresponse(res, 400, {"type": false, "message": "Error en tracking", "data": _inmueble});
					return false;
				}
			})
			return next();
		}
	})
}