probnsApp.service('authService', function ($http, $window){

	var self = this;

	self.saveToken = function(token){
		$window.localStorage['probns-token'] = token;
	};

	self.getToken = function(){
		return $window.localStorage['probns-token'];
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
			if(payload.exp > Date.now() / 1000){
				return payload.sub;
			}else{
				$window.location = "#/login"
				return false;	
			}
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