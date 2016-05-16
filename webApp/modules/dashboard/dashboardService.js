probnsApp.service('dashboardService', function (baseService){
	var service = baseService;
	var self = this;

	self.getUserInfoById = function(userId){
		var data = {
			url: '/usuario/get/clienteById/' + userId
		}

		var result = service.get(data);

		return result;
	}

	self.getTotalPropiedadesByUser = function(userId){
		var data = {
			url: '/inmuebles/get/all/count/' + userId
		}

		var result = service.get(data);

		return result;
	}

	self.getTotalAgentesByUser = function(userId){
		var data = {
			url: '/usuario/all/vendedores/count/' + userId
		}

		var result = service.get(data);

		return result;
	}

	self.getTotalBuscadoresByUser = function(userId){
		var data = {
			url: '/buscador/get/all/count/' + userId
		}

		var result = service.get(data);

		return result;
	}

	self.getTopInmuebles = function(userId){
		var data = {
			url: '/inmuebles/get/top/' + userId
		}

		var result = service.get(data);

		return result;
	}

	self.putInfoUsuario = function(userId, params){
		var data = {
			url: '/usuario/update/'+ userId,
			params: params
		}

		var result = service.put(data);
		return result;
	}

	self.uploadAvatar = function(file){
		var data = {
			url: '/usuario/upload/avatar'
		}

		var result = service.uploadImage(data, file);

		return result;
	}

	self.putAvatarUsuario = function(userId, params){
		var data = {
			url: '/usuario/put/avatar/' + userId,
			params: params
		}

		var result = service.put(data);

		return result;
	}

})