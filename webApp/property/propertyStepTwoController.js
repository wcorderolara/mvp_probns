probnsApp.controller('propertyStepTwoController', function($scope,$http,$location,
											   	     $window,propertyService,
											   	     ShareData,blockUI,Notification){

	var service = propertyService;
	var factory = ShareData;
	var userId = 1;
	$scope.precioPropiedad = 0;
	$scope.direccionCorta = "";
	$scope.direccion = "";
	$scope.totalComision = 0;
	$scope.comisionCompartida = 0;

	$scope.setPrecioPropiedad = function(){
		$scope.$emit('setPrecioPropiedad', $scope.precioPropiedad);
	}

	$scope.setTotalComision = function(){
		$scope.$emit('setTotalComision', $scope.totalComision);
	}

	$scope.setComisionCompartida = function(){
		$scope.$emit('setComisionCompartida', $scope.comisionCompartida);
	}


	$scope.setDireccionCorta = function(){
		$scope.$emit('setDireccionCorta', $scope.direccionCorta);	
	}

	$scope.setDireccion = function(){
		$scope.$emit('setDireccion', $scope.direccion);	
	}

})