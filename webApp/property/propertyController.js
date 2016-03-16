probnsApp.controller('propertyController', function($scope,$http,$location,
											   	     $window,propertyService,
											   	     ShareData,blockUI,Notification){

	var service = propertyService;
	var factory = ShareData;
	var userId = 1;
	$scope._newInmueble = {
		descripcion: "",
		precioPropiedad: 0,
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
	$scope.showInfo = function(){
		console.log($scope._newInmueble);
	}

	$scope.$on('setTipoInmueble', function (event, data){		
		$scope._newInmueble.tipoInmuebleId = data;
	})

	$scope.$on('setOperacionInmueble', function (event, data){		
		$scope._newInmueble.operacionInmuebleId = data;
	})

	$scope.$on('setPais', function (event, data){		
		$scope._newInmueble.PaiId = data;
	})

	$scope.$on('setDepartamento', function (event, data){		
		$scope._newInmueble.DepartamentoId = data;
	})

	$scope.$on('setMunicipio', function (event, data){		
		$scope._newInmueble.MunicipioId = data;
	})

	$scope.$on('setPrecioPropiedad', function (event, data){		
		$scope._newInmueble.precioPropiedad = data;
	})

	$scope.$on('setTotalComision', function (event, data){		
		$scope._newInmueble.totalComision = data;
	})

	// service.getTiposInmueble().then(
	// 	function (data){
	// 		$scope.tiposInmueble = data.data;			
	// 	}
	// )

	// service.getOperacionesInmueble().then(
	// 	function (data){
	// 		$scope.operacionesInmueble = data.data;			
	// 	}
	// )

	// service.getPaises().then(
	// 	function (data){
	// 		$scope.paises = data.data;
	// 	}
	// )

	// $scope.setTipoInmueble = function(idTipoInmueble){
	// 	console.log('entro');
	// 	console.log(idTipoInmueble);
	// 	$scope._tipoInmueble = idTipoInmueble;
	// 	console.log('tipo Inmueble');
	// 	console.log($scope._tipoInmueble);
	// }

	// $scope.setOperacionInmueble = function(idOperacionInmueble){
	// 	$scope._operacionInmueble = idOperacionInmueble;
	// }

	// $scope.getDepartamentos = function(paisId){
	// 	$scope.paisSelected = paisId;
	// 	service.getDepartamentos($scope.paisSelected).then(
	// 		function (data){
	// 			$scope.departamentos = data.data;
	// 		}
	// 	)
	// }

	// $scope.getMunicipios = function(deptoId){
	// 	$scope.departamentoSelected = deptoId;
	// 	service.getMunicipios($scope.departamentoSelected).then(
	// 		function (data){
	// 			$scope.municipios = data.data;
	// 		}
	// 	)	
	// }

	// $scope.setMunicipio = function(municipioId){
	// 	$scope.municipioSelected = municipioId;
	// }

})