probnsApp.service('propertyService', function ($http, $q, probnsConf, Upload, authService){
	var uri = probnsConf.api.url;

	this.getTiposInmueble = function(){
		var deferred = $q.defer();

		$http.get(uri + '/tipoInmueble/get/all', authService.setHeaders())
		.success(function (response){
			deferred.resolve(response);
		})

		return deferred.promise;
	}

	this.getOperacionesInmueble = function(){
		var deferred = $q.defer();

		$http.get(uri + '/operacionInmueble/get/all', authService.setHeaders())
		.success(function (response){
			deferred.resolve(response);
		})

		return deferred.promise;
	}

	this.getPaises = function(){
		var deferred = $q.defer();

		$http.get(uri + '/paises', authService.setHeaders())
		.success(function (response){
			deferred.resolve(response);
		})

		return deferred.promise;
	}

	this.getDepartamentos = function(paisId){
		var deferred = $q.defer();

		$http.get(uri + '/departamentos/all/' + paisId, authService.setHeaders())
		.success(function (response){
			deferred.resolve(response);
		})

		return deferred.promise;	
	}

	this.getMunicipios = function(deptoId){
		var deferred = $q.defer();

		$http.get(uri + '/municipios/all/' + deptoId, authService.setHeaders())
		.success(function (response){
			deferred.resolve(response);
		})

		return deferred.promise;
	}

	this.uploadImagenInmueble = function(file){
		var deferred = $q.defer();

		file.upload = Upload.upload({
	      url: uri + '/inmuebles/image',
	      data: {file: file},
	    });

	    file.upload.then(function (response) {
	    	deferred.resolve(response.data);
	    }, function (response) {
	    	deferred.resolve(response.data);
	    });

	    return deferred.promise;
	}

	this.guardarPropiedad = function(params){
		var deferred = $q.defer();

		$http.post(uri + '/inmuebles/post/inmueble', params, authService.setHeaders())
		.success(function (response){
			deferred.resolve(response);
		})

		return deferred.promise;
	}
	
})