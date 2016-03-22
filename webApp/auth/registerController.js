probnsApp.controller('registerController', function($scope, $window,$location,
											    authService, ShareData, blockUI, 
											    Notification, propertyService, registerService){

	var auth = authService;
	var service = registerService;
	$scope.userLogin = "";
	$scope.password = "";
	$scope.paises = [];
	$scope.tiposUsuario = [];

	$scope.tipoUsuarioId = "";
	$scope.PaiId = "";


	service.getTiposUsuario().then(
		function (data){
			$scope.tiposUsuario = data.data;
		}
	)

	propertyService.getPaises().then(
		function (data){
			$scope.paises = data.data;
		}
	)

	$scope.showInfo = function(){
		console.log($scope.userLogin);
		console.log($scope.password);
		console.log($scope.tipoUsuarioId);
		console.log($scope.PaiId);
	}

	$scope.onSubmitForm = function(){
		$scope.formError = "";
		
		if(!$scope.userLogin || !$scope.password || !$scope.tipoUsuarioId || !$scope.PaiId){
			$scope.formError = "Todos los campos son obligatorios..."
			return false;
		}else{
			$scope.registrarUsuario();
		}
	}

	$scope.registrarUsuario = function (){
		$scope.formError = "";
		var params = {
			userLogin: $scope.userLogin,
			password: $scope.password,
			tipoUsuarioId: $scope.tipoUsuarioId,
			PaiId: $scope.PaiId
		}

		auth.registrarUsuario(params).then(
			function (data){
				if(data.type == true){
					auth.saveToken(data.token);
					$window.location = '#/app/dashboard';
				}else{
					$scope.formError = data.data.message;
				}
			}
		)
	}

})