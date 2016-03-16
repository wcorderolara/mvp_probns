probnsApp.service('propertyService', function ($http, $q, probnsConf){
	var uri = probnsConf.api.url;

	this.getTiposInmueble = function(){
		var deferred = $q.defer();

		$http.get(uri + '/tipoInmueble/get/all')
		.success(function (response){
			deferred.resolve(response);
		})

		return deferred.promise;
	}

	this.getOperacionesInmueble = function(){
		var deferred = $q.defer();

		$http.get(uri + '/operacionInmueble/get/all')
		.success(function (response){
			deferred.resolve(response);
		})

		return deferred.promise;
	}

	this.getPaises = function(){
		var deferred = $q.defer();

		$http.get(uri + '/paises')
		.success(function (response){
			deferred.resolve(response);
		})

		return deferred.promise;
	}

	this.getDepartamentos = function(paisId){
		var deferred = $q.defer();

		$http.get(uri + '/departamentos/all/' + paisId)
		.success(function (response){
			deferred.resolve(response);
		})

		return deferred.promise;	
	}

	this.getMunicipios = function(deptoId){
		var deferred = $q.defer();

		$http.get(uri + '/municipios/all/' + deptoId)
		.success(function (response){
			deferred.resolve(response);
		})

		return deferred.promise;
	}
	
})