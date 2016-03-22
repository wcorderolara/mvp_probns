probnsApp.service('dashboardService', function ($http, $q, probnsConf,Upload, authService){
	var uri = probnsConf.api.url;
	var self = this;

	self.getUserInfoById = function(userId){
		var deferred = $q.defer();

		$http.get(uri + '/usuario/get/clienteById/' + userId, authService.setHeaders())
		.success(function (response){
			deferred.resolve(response);
		})

		return deferred.promise;
	}

	self.getTotalPropiedadesByUser = function(userId){
		var deferred = $q.defer();

		$http.get(uri + '/inmuebles/get/all/count/' + userId, authService.setHeaders())
		.success(function (response){
			deferred.resolve(response);
		})

		return deferred.promise;
	}

	self.getTotalAgentesByUser = function(userId){
		var deferred = $q.defer();

		$http.get(uri + '/usuario/all/vendedores/count/' + userId, authService.setHeaders())
		.success(function (response){
			deferred.resolve(response);
		})

		return deferred.promise;
	}

	self.putInfoUsuario = function(userId, params){
		var deferred = $q.defer();

		$http.put(uri + '/usuario/update/'+ userId, params, authService.setHeaders())
		.success(function (response){
			deferred.resolve(response);
		})

		return deferred.promise;
	}

	self.uploadAvatar = function(file){
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

	self.putAvatarUsuario = function(userId, params){
		var deferred = $q.defer();

		$http.put(uri + '/usuario/put/avatar/' + userId, params, authService.setHeaders())
		.success(function (response){
			deferred.resolve(response);
		})

		return deferred.promise;
	}

})