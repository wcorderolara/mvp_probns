probnsApp.service('dashboardService', function ($http, $q, probnsConf,Upload){
	var uri = probnsConf.api.url;

	this.getUserInfoById = function(userId){
		var deferred = $q.defer();

		$http.get(uri + '/usuario/get/clienteById/' + userId)
		.success(function (response){
			deferred.resolve(response);
		})

		return deferred.promise;
	}

	this.getTotalPropiedadesByUser = function(userId){
		var deferred = $q.defer();

		$http.get(uri + '/inmuebles/get/all/count/' + userId)
		.success(function (response){
			deferred.resolve(response);
		})

		return deferred.promise;
	}

	this.getTotalAgentesByUser = function(userId){
		var deferred = $q.defer();

		$http.get(uri + '/usuario/all/vendedores/count/' + userId)
		.success(function (response){
			deferred.resolve(response);
		})

		return deferred.promise;
	}

	this.putInfoUsuario = function(userId, params){
		var deferred = $q.defer();

		$http.put(uri + '/usuario/update/'+ userId, JSON.stringify(params))
		.success(function (response){
			deferred.resolve(response);
		})

		return deferred.promise;
	}

	this.uploadAvatar = function(file){
		var deferred = $q.defer();

		file.upload = Upload.upload({
	      url: uri + '/usuario/upload/avatar',
	      data: {file: file},
	    });

	    file.upload.then(function (response) {
	    	deferred.resolve(response);
	    }, function (response) {
	    	deferred.resolve(response);
	    });

	    return deferred.promise;
	}

	this.putAvatarUsuario = function(userId, params){
		var deferred = $q.defer();

		$http.put(uri + '/usuario/put/avatar/' + userId, JSON.stringify(params))
		.success(function (response){
			deferred.resolve(response);
		})

		return deferred.promise;
	}

})