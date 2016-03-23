probnsApp.service('generalServices', function ($http, $q, probnsConf, Upload){

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



})