probnsApp.service('registerService', function ($http, $q, probnsConf, $window){
	var uri = probnsConf.api.url;
	var self = this;

	self.getTiposUsuario = function(){
		var deferred = $q.defer();

		$http.get(uri + '/tiposusuario')
		.success(function (response){
			deferred.resolve(response);
		})
		return deferred.promise;
	}


})