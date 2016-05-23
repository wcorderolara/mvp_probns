probnsApp.service('propertyService', function (baseService){
	var service = baseService;

	this.getTiposInmueble = function(){
		var data = {
			url: '/tipoInmueble/get/all'
		}

		var result = service.get(data);

		return result;
	}

	this.getOperacionesInmueble = function(){
		var data = {
			url: '/operacionInmueble/get/all'
		}
		
		var result = service.get(data);

		return result;
	}

	this.getPaises = function(){
		var data = {
			url: '/paises'
		}
		var result = service.get(data);
		return result;
	}

	this.getDepartamentos = function(paisId){
		var data = {
			url: '/departamentos/all/' + paisId
		}
		
		var result = service.get(data);
		return result
	}

	this.getMunicipios = function(deptoId){
		var data = {
			url: '/municipios/all/' + deptoId
		}
		
		var result = service.get(data);

		return result;
	}

	this.uploadImagenInmueble = function(file){
		var data = {
			url: '/inmuebles/image'
		}
		var result = service.uploadImage(data, file);
		return result;
	}

	this.guardarPropiedad = function(params){
		var data = {
			url: '/inmuebles/post/inmueble',
			params: params
		}
		
		var result = service.post(data);

		return result;
	}

	this.searchInmuebleByCodigoInmueble = function(codigo){
		var data = {
			url: '/inmuebles/search/code/' + codigo
		}

		var result = service.get(data);
		return result;
	}
	
})