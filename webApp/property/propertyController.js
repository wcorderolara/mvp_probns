probnsApp.controller('propertyController', function($scope,$http,$location,
											   	     $window,propertyService,ShareData,blockUI,Notification){

	var service = propertyService;
	var factory = ShareData;
	var userId = 1;
	$scope.tiposInmueble = {};
	$scope._tipoInmueble = 0;
	$scope.operacionesInmueble = {};
	$scope._operacionInmueble = 0;
	$scope.totalAgentes = 0;
	$scope._newInmueble = {
		descripcion: "",
		precioPropiedad: "",
		direccionCorta: "",
		direccion: "",
		latitud: "",
		longitud: "",
		extensionPropiedad: null,
		areaConstruccion: null,
		anioConstruccion: null,
		observaciones: "",
		totalComision: 0,
		comisionCompartida: 0,
		DepartamentoId: 0,
		estadoInmuebleId: 1,
		tipoInmuebleId: 0,
		operacionInmuebleId: 0,
		PaiId: 0,
		MunicipioId: 0,
		userId: 0,
		imagenesInmueble: [],
		amenitiesInmueble: [],
	};
	
	service.getTiposInmueble().then(
		function (data){
			$scope.tiposInmueble = data.data;			
		}
	)

	service.getOperacionesInmueble().then(
		function (data){
			$scope.operacionesInmueble = data.data;			
		}
	)

	$scope.setTipoInmueble = function(idTipoInmueble){
		$scope._tipoInmueble = idTipoInmueble;
	}

	$scope.setOperacionInmueble = function(idOperacionInmueble){
		$scope._operacionInmueble = idOperacionInmueble;
	}

})