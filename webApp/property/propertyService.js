probnsApp.service('propertyService', function ($http, $q, probnsConf, Upload){
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

		$http.post(uri + '/inmuebles/post/inmueble', JSON.stringify(params))
		.success(function (response){
			deferred.resolve(response);
		})

		return deferred.promise;
	}
	
})