probnsApp.service('taskService', function (baseService){
	var self = this;
	var base = baseService;

	self.getTareasByAgencia = function(agenciaId){
		var data = {
			url: '/task/get/all/agencia/' + agenciaId
		}

		var result = base.get(data);
		return result;
	}

	self.getTareasByAgente = function(agenteId){
		var data = {
			url: '/task/get/all/agente/' + agenteId
		}

		var result = base.get(data);
		return result;
	}

	self.postTarea = function(params){
		var data = {
			url: '/task/post',
			params: params
		}

		var result = base.post(data);
		return result;
	}

	self.putTarea = function(tareaId, params){
		var data={
			url: '/task/put/' + tareaId,
			params: params
		}

		var result = base.put(data);
		return result;
	}

	self.finalizarTarea = function(tareaId, params){
		var data = {
			url: '/task/finalizar/' + tareaId,
			params: params
		}

		var result = base.put(data);
		return result;
	}

	self.deleteTarea = function(tareaId){
		var data = {
			url: '/task/delete/' + tareaId,
			params: {}
		}

		var result = base.delete(data);
		return result;
	}
})