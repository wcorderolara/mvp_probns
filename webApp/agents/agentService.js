probnsApp.service('agentService', function ($http, $q, probnsConf, $window, authService){
	var uri = probnsConf.api.url;
	var self = this;
	var auth = authService;

	self.postVendedor = function(params){
		var deferred = $q.defer();

		$http.post(uri + '/usuario/post/vendedor', params, auth.setHeaders())
		.success(function (response){
			deferred.resolve(response);
		})

		return deferred.promise;
	}

	self.putVendedor = function(params, agente){
		var deferred = $q.defer();

		$http.put(uri + '/usuario/agente/update/' + agente, params, auth.setHeaders())
		.success(function (response){
			deferred.resolve(response);
		})

		return deferred.promise;
	}	

	self.getVendedoresByPadre = function(padreId){
		var deferred = $q.defer();

		$http.get(uri + '/usuario/all/getVendedores/' + padreId, auth.setHeaders())
		.success(function (response){
			deferred.resolve(response);
		})
		.error(function (response){
			deferred.resolve(response);
		})

		return deferred.promise;
	}

	self.getVendedorById = function(agente){
		var deferred = $q.defer();

		$http.get(uri + '/usuario/getVendedor/' + auth.getUserLogged() +'/' + agente, auth.setHeaders())
		.success(function (response){
			deferred.resolve(response);
		})
		.error(function (response){
			deferred.resolve(response);
		})

		return deferred.promise;
	}

})