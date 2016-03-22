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


})