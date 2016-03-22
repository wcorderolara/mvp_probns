probnsApp.controller('agentController', function ($scope, $window,$location,
											    authService, ShareData, blockUI, 
											    Notification, agentService, $modal){
	var auth = authService;
	var service = agentService;
	var user: auth.getUserLogged();
	$scope.listVendedores = [];

	$scope.newVendedor = {
		userLogin: "",
		password: "",
		firstName: "",
		lastName: "",
		telefono1: "",
		PaiId: "",
		avatar: "",
		padreId: user
	}

	service.getVendedoresByPadre(user).then(
		function (data){
			if(data.type){
				$scope.listVendedores = data.data
			}
		}
	)

	$scope.openModal = function(windowClass, templateUrl, size){
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
				service.getVendedoresByPadre(user).then(
					function (data){
						if(data.type){
							$scope.listVendedores = data.data;
						}
					}
				)
			}
		});

	}

})


probnsApp.controller('addAgenteController', function($scope, $modalInstance, items, 
													  agentService, generalServices, authService){

	var general = generalServices;
	var service = agentService;
	$scope.newItem = items;
	$scope.paises = [];
	
	$scope.newUserLogin = "";
	$scope.newFirstName = "";
	$scope.newLastName = "";
	$scope.newPassword = "";
	$scope.newTelefono = "";
	$scope.newAvatar = "";
	$scope.newPaiId = "";

	general.getPaises().then(
		function (data){
			$scope.paises = data.data;
		}
	);

	$scope.postVendedor = function(){
		

		if(!$scope.newUserLogin ||)

		$scope.newItem = {
			userLogin: $scope.newUserLogin,
			password: $scope.newFirstName,
			firstName: $scope.newLastName,
			lastName: $scope.newPassword,
			telefono1: $scope.newTelefono,
			avatar: $scope.newAvatar,
			PaiId: $scope.newPaiId
		}

		$modalInstance.close($scope.newItem);
	}

	$scope.cancel = function(){

		$modalInstance.dismiss('cancel');
	}

})