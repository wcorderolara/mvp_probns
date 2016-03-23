probnsApp.controller('agentController', function ($scope, $window,$location,
											    authService, ShareData, blockUI, 
											    Notification, agentService, $modal){
	var auth = authService;
	var service = agentService;
	var user= auth.getUserLogged();
	$scope.listadoAgentes = [];
	$scope.editVendedor = {};
	$scope.newVendedor = {
		userLogin: "",
		password: "",
		firstName: "",
		lastName: "",
		telefono1: "",
		PaiId: "",
		avatar: "",
		padreId: ""
	}

	$scope.getVendedoresByPadre = function(user){
		service.getVendedoresByPadre(user).then(
			function (data){
				if(data.type){
					$scope.listadoAgentes = data.data
				}
			}
		)
	}

	$scope.getVendedoresByPadre(user);

	$scope.openModal = function(windowClass,templateUrl,size){
		var modalInstance = $modal.open({
			windowClass: windowClass,
			templateUrl: templateUrl,
			controller: 'addAgenteController',
			size: size,
			resolve: {
				items: function(){
					return $scope.newVendedor;
				}
			}
		});

		modalInstance.result.then(function (data){
			if(data.type){
				Notification.success(data.message)
				$scope.getVendedoresByPadre(user);
			}
		});
	}

	$scope.openEditModal = function(agente,windowClass, templateUrl, size){
		var modalInstance = $modal.open({
			windowClass: windowClass,
			templateUrl: templateUrl,
			controller: 'editAgenteController',
			size: size,
			resolve: {
				items: function(){
					return agente;
				}
			}
		});

		modalInstance.result.then(function (data){
			if(data.type){
				Notification.success(data.message)
				$scope.getVendedoresByPadre(user);
			}
		});
	}

	$scope.editAgente = function(agente){
		service.getVendedorById(agente).then(
			function (data){
				if(data.type){
					$scope.editVendedor = data.data;
					$scope.openEditModal($scope.editVendedor,'','editAgenteModal.html','md');
				}else{
					Notification.error(data.message);
				}
			}
		)
	}

})

probnsApp.controller('editAgenteController', function($scope, $modalInstance, items, 
													  agentService, generalServices, 
													  authService){

	var general = generalServices;
	var service = agentService;
	$scope.editItem = {
		firstName: items.firstName,
		lastName: items.lastName,
		userLogin: items.userLogin,
		telefono1: items.telefono1,
		avatar: items.avatar,
	}	

	$scope.uploadPic = function(file, errFiles) {
	    general.uploadAvatar(file).then(
	    	function (data){
	    		$scope.editItem.avatar = data.data.data.url;
	    	}
	    )
    }

	$scope.putVendedor = function(){
		$scope.formError = "";

		if(!$scope.editItem.userLogin || !$scope.editItem.firstName || !$scope.editItem.lastName || !$scope.editItem.telefono1){
			$scope.formError = "El nombre, apellido, correo electronico y telefono, son obligatorios";
			return false
		}

		service.putVendedor($scope.editItem, items.id).then(
			function (response){
				$modalInstance.close(response);
			}
		)

	}

	$scope.cancel = function(){

		$modalInstance.dismiss('cancel');
	}

})


probnsApp.controller('addAgenteController', function($scope, $modalInstance, items, 
													  agentService, generalServices, 
													  authService){

	var general = generalServices;
	var service = agentService;
	$scope.newItem = items;
	$scope.paises = [];
	$scope.newFirstName = "";
	$scope.newLastName = "";
	$scope.newPassword = "";
	$scope.newUserLogin = "";
	$scope.newTelefono = "";
	$scope.newAvatar = "";
	$scope.newPaiId = "";

	general.getPaises().then(
		function (data){
			$scope.paises = data.data;
		}
	);

	$scope.uploadPic = function(file, errFiles) {
	    general.uploadAvatar(file).then(
	    	function (data){
	    		$scope.newAvatar = data.data.data.url;
	    	}
	    )
    }

	$scope.postVendedor = function(){
		$scope.formError = "";

		if(!$scope.newPassword){
			$scope.newPassword = "ClaveAgenteProbns"; //se creara un password generator por el momente esta sera
		}

		if(!$scope.newUserLogin || !$scope.newFirstName || !$scope.newLastName || !$scope.newTelefono || !$scope.newPaiId){
			$scope.formError = "El nombre, apellido, correo electronico, telefono y pais, son obligatorios";
			return false
		}

		$scope.newItem = {
			firstName: $scope.newFirstName,
			lastName: $scope.newLastName,
			password: $scope.newPassword,
			userLogin: $scope.newUserLogin,
			telefono1: $scope.newTelefono,
			avatar: $scope.newAvatar,
			PaiId: $scope.newPaiId,
			padreId: authService.getUserLogged()
		}

		service.postVendedor($scope.newItem).then(
			function (response){
				$modalInstance.close(response);
			}
		)

	}

	$scope.cancel = function(){

		$modalInstance.dismiss('cancel');
	}

})