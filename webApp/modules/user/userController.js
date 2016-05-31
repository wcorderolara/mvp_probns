probnsApp.controller('userController', function($scope,$window, userService,ShareData,blockUI, authService){

	var service = userService;
	var auth = authService;
	var factory = ShareData;
	var userId = auth.getUserLogged();
	var datosGenerales = {};
	$scope.datosGenerales = {};
	$scope.tipoUsuario = "";

	if(!auth.isLoggedIn()){
		$window.location = "#/login";
	}

	service.getUserInfoById(userId).then(		
		function (data){
			blockUI.start();
			$scope.datosGenerales = data.data;
			$scope.tipoUsuario = $scope.datosGenerales.tipoUsuario.descripcion;
			// console.log(datosGenerales);
			
			factory.value = {
				userId: $scope.datosGenerales.id,
				padreId: $scope.datosGenerales.padreId,
				tipoUsuarioId: $scope.datosGenerales.tipoUsuarioId,
				tipoUsuario: $scope.datosGenerales.tipoUsuario.descripcion,
				email: $scope.datosGenerales.email,
				nombre: $scope.datosGenerales.firstName,
				apellido: $scope.datosGenerales.lastName
			}

			// $scope.putUserInfo = JSON.parse(JSON.stringify(data.data));		
			blockUI.stop();
		}
	)

	$scope.signOut = function(){
		auth.logout();
		$window.location = '#/login';
	}

})