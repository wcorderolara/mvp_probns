probnsApp.service('generalServices', function ($http, $q, probnsConf){

	var uri = probnsConf.api.url;
	var self = this;

	self.getPaises = function(){
		var deferred = $q.defer();

		$http.get(uri + '/paises')
		.success(function (response){
			deferred.resolve(response);
		})

		return deferred.promise;
	}



})