probnsApp.controller('propertyStepFourController', function($scope,$http,$location,
											   	     $window,propertyService,
											   	     ShareData,blockUI,Notification){

	var service = propertyService;
	var factory = ShareData;
	$scope.descripcionPropiedad = "";
	$scope.observacionesPropiedad = "";
	$scope.listImagenesInmueble = [];
	$scope.newImagen = {
		public_id: "",
		img_url: "",
		descripcion: "",
		status: 1
	};

	

	$scope.setDescripcion = function(){
		$scope.$emit('setDescripcion', $scope.descripcionPropiedad);
	}

	$scope.setObservaciones = function(){
		$scope.$emit('setObservaciones', $scope.observacionesPropiedad);
	}

	$scope.setImagenesInmueble = function(){
		$scope.$emit('setImagenesInmueble', $scope.listImagenesInmueble);	
	}

	$scope.uploadImagenInmueble = function(file, errFiles) {
	    service.uploadImagenInmueble(file).then(
	    	function (data){
	    		var _newImage = $scope.newImagen;
	    		_newImage ={
	    			public_id: data.data.public_id,
					img_url: data.data.url,
					descripcion: "",
					status: 1
	    		}
	    		
	    		$scope.listImagenesInmueble.push(_newImage);
	    		$scope.setImagenesInmueble();
	    	}
	    )
    }

	})