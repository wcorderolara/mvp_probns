probnsApp.service('userService', function ($http, $q, baseService, authService){
	var base = baseService;
	var self = this;

	this.getUserInfoById = function(userId){
		var data = {
			url: '/usuario/get/clienteById/' + userId
		}
		var result = base.get(data);
		return result;
	}

	self.registrarUsuario = function(params){

		var data = {
			params: params,
			url: '/usuario/post/cliente'
		}

		var result = base.post(data);
		return result;

	}

	self.loginUser = function(params){
		var data = {
			params: params,
			url: '/auth/login'
		}
		
		var result = base.login(data);
		return result;
	}
})