probnsApp.service('authService', function ($http, $q, probnsConf, $window){
	var uri = probnsConf.api.url;

	this.saveToken = function(token){
		$window.localStorage['probns-token'] = token;
	};

	this.getToken = function(){
		return $window.localStorage['probns-token'];
	}

	this.registrarUsuairo = function(params){
		var deferred = $q.defer();

		$http.post(uri + '/usuario/post/cliente', JSON.stringify(params))
		.success(function (response){
			this.saveToken(response.token);
			deferred.resolve(response);
		})

		return deferred.promise;
	}

	this.loginUser = function(params){
		var deferred = $q.defer();

		$http.post(uri + '/auth/login', params)
		.success(function (response, status,config){
			console.log(response);
			this.saveToken(response.token)
			deferred.resolve(response);
		})
		.error(function (response){
			console.log("error");
			console.log(response);
		})

		return deferred.promise;
	}

	this.isLoggedInd = function(){
		var token = this.getToken();

		if(token){
			var payload = JSON.parse($window.atob(token.split('.')[1]));
			return payload.exp > Date.now() / 1000;
		}else{
			return false
		}

	}

	this.logout = function(){
		$window.localStorage.removeItem('probns-token');
	}

})