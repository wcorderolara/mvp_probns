probnsApp.service('authService', function ($http, $q, probnsConf, $window){
	var uri = probnsConf.api.url;
	var self = this;

	self.saveToken = function(token){
		$window.localStorage['probns-token'] = token;
	};

	self.getToken = function(){
		return $window.localStorage['probns-token'];
	}

	self.registrarUsuairo = function(params){
		var deferred = $q.defer();

		$http.post(uri + '/usuario/post/cliente', params)
		.success(function (response){
			self.saveToken(response.token);
			deferred.resolve(response);
		})

		return deferred.promise;
	}

	self.loginUser = function(params){
		var deferred = $q.defer();

		$http.post(uri + '/auth/login', params)
		.success(function (response, status,config){
			self.saveToken(response.token)
			deferred.resolve(response);
		})
		.error(function (response){
			deferred.resolve(response);
		})

		return deferred.promise;
	}

	self.isLoggedIn = function(){
		var token = self.getToken();

		if(token){
			var payload = JSON.parse($window.atob(token.split('.')[1]));
			return payload.exp > Date.now() / 1000;
		}else{
			return false
		}

	}

	self.getUserLogged = function(){
		var token = self.getToken();
		
		if(token){
			var payload = JSON.parse($window.atob(token.split('.')[1]));
			return payload.sub;
		}else{
			return false;
		}
	}

	self.logout = function(){
		$window.localStorage.removeItem('probns-token');
	}

	self.setHeaders = function(){
		return { headers: { Authorization: 'Bearer ' + self.getToken() } };
	}

})