probnsApp.controller('userController', function($scope,$window, userService,ShareData,blockUI, authService){

	var service = userService;
	var auth = authService;
	var factory = ShareData;
	var userId = auth.getUserLogged();
	$scope.datosGenerales = {};

	if(!auth.isLoggedIn()){
		$window.location = "#/login";
	}

	service.getUserInfoById(userId).then(		
		function (data){
			blockUI.start();
			$scope.datosGenerales = data.data;	
			$scope.putUserInfo = JSON.parse(JSON.stringify(data.data));		
			blockUI.stop();
		}
	)

	$scope.signOut = function(){
		auth.logout();
		$window.location = '#/login';
	}

})