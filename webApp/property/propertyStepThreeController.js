probnsApp.controller('propertyStepThreeController', function($scope, $http, $location,
											   	     $window, propertyService,
											   	     ShareData, blockUI, Notification, $modal){

	var service = propertyService;
	var factory = ShareData;
	var userId = 1;
	$scope.extensionPropiedad = "";
	$scope.areaConstruccion = "";
	$scope.anioConstruccion = "";
	$scope.amenityDescripcion = "";
	$scope.amenityCantidad = "";
	$scope.newAmenity = {
		id: "",
		descripcion: "",
		cantidad: "",
		status: 1
	};

	$scope.listAmenities = [
		{
			id: "1",
			descripcion: "Dormitorios",
			cantidad: "",
			status: 1
		},
		{
			id: "2",
			descripcion: "Baños",
			cantidad: "",
			status: 1
		}
	]

	$scope.openModal = function(windowClass, templateUrl, size){
		var modalInstance = $modal.open({
			windowClass: windowClass,
			templateUrl: templateUrl,
			controller: 'addAmenityController',
			size: size,
			resolve: {
				items: function(){
					return $scope.newAmenity;
				}
			}
		});

		modalInstance.result.then(function (newAmenity){
			$scope.listAmenities.push(newAmenity);
		});
	}

	$scope.setAmenitiesInmueble = function(){
		$scope.$emit('setAmenitiesInmueble', $scope.listAmenities);
	}

	$scope.setExtensionPropiedad = function(){
		$scope.$emit('setExtensionPropiedad', $scope.extensionPropiedad);
	}

	$scope.setAreaConstruccion = function(){
		$scope.$emit('setAreaConstruccion', $scope.areaConstruccion);
	}

	$scope.setAnioConstruccion = function(){
		$scope.$emit('setAnioConstruccion', $scope.anioConstruccion);
	}

})

probnsApp.controller('addAmenityController', function($scope, $modalInstance, items){

	$scope.newItem = items;
	$scope.newDescripcion = "";
	$scope.newCantidad = "";

	$scope.addAmenity = function(){
		$scope.newItem = {
			id: Math.random().toString(32).substring(2),
			descripcion: $scope.newDescripcion,
			cantidad: $scope.newCantidad,
			status: 1
		}

		$modalInstance.close($scope.newItem);
	}

	$scope.cancel = function(){

		$modalInstance.dismiss('cancel');
	}

})