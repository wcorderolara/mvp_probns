probnsApp.controller('propertyStepOneController', function($scope,$http,$location,
											   	     $window,propertyService,
											   	     ShareData,blockUI,Notification){

	var service = propertyService;
	var factory = ShareData;
	var userId = 1;
	$scope.tiposInmueble = {};
	$scope._tipoInmueble = 0;
	$scope.operacionesInmueble = {};
	$scope._operacionInmueble = 0;
	$scope.paises = [];
	$scope.departamentos = [];
	$scope.municipios = [];
	$scope.paisSelected = null;
	$scope.departamentoSelected = null;
	$scope.municipioSelected = null;
	
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

	service.getPaises().then(
		function (data){
			$scope.paises = data.data;
		}
	)

	$scope.setTipoInmueble = function(idTipoInmueble){		
		$scope.$emit('setTipoInmueble', idTipoInmueble);
	}

	$scope.setOperacionInmueble = function(idOperacionInmueble){
		$scope.$emit('setOperacionInmueble', idOperacionInmueble);
	}

	$scope.getDepartamentos = function(paisId){
		$scope.$emit('setPais', paisId);
		$scope.paisSelected = paisId;
		service.getDepartamentos($scope.paisSelected).then(
			function (data){
				$scope.departamentos = data.data;
			}
		)
	}

	$scope.getMunicipios = function(deptoId){
		$scope.$emit('setDepartamento', deptoId);
		$scope.departamentoSelected = deptoId;
		service.getMunicipios($scope.departamentoSelected).then(
			function (data){
				$scope.municipios = data.data;
			}
		)	
	}

	$scope.setMunicipio = function(municipioId){
		$scope.$emit('setMunicipio', municipioId);
		$scope.municipioSelected = municipioId;
	}	

})