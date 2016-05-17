probnsApp.service('clienteService', function (baseService){
	var self = this;
	var base = baseService;

	self.postBuscador = function(params){
		var data = {
			url: '/buscador/post',
			params: params
		}

		var result = base.post(data);
		return result;
	}

	self.putBuscador = function(params, agente){
		var data = {
			url: '/buscador/put/' + agente,
			params: params
		}

		var result = base.put(data)
		return result;
	}

	self.deleteBuscador = function(buscadorId){
		var data = {
			url: '/buscador/delete/' + buscadorId,
			params: {}
		}

		var result = base.delete(data)
		return result;
	}

	self.getBuscadoresByAgencia = function(agenciaId){
		var data = {
			url: '/buscador/get/all/' + agenciaId
		}

		var result = base.get(data);
		return result;

	}

	self.getBuscadoresByAgente = function(agenteId){
		var data = {
			url: '/buscador/get/all/agente/' + agenteId
		}

		var result = base.get(data);
		return result;
	}

	self.getBuscadorById = function(buscadorId){
		var data = {
			url: '/buscador/get/' + buscadorId
		}

		var result = base.get(data);
		return result;
		
	}

	self.getTiposBuscador = function(){
		var data = {
			url: '/tipoBuscador/get/all'
		}

		var result = base.get(data);
		return result;
	}

})