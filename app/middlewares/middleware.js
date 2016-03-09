'use strict'
var models = require("../../models");
var moment = require('moment');

exports.trackingInmueble = function(req, res, next){
	models.Inmueble.findOne({
		where: {
			id: req.body.idInmueble
		}
	}).then(function (inmueble){
		if(!inmueble){
			sendJSONresponse(res, 400, {"type": false, "message": "Error al obtener el inmueble", "data": inmueble});
			return false;
		}else{
			var _visitas = parseInt(inmueble.numeroVisitas);
			inmueble.update({
				numeroVisitas: parseInt(_visitas + 1)
			}).then(function (_inmueble){
				if(!_inmueble){
					sendJSONresponse(res, 400, {"type": false, "message": "Error en tracking", "data": _inmueble});
					return false;
				}
			})
			return next();
		}
	})
}