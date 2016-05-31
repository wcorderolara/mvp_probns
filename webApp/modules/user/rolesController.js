probnsApp.controller('rolesController', function($scope,$window, userService,ShareData,blockUI, authService){

	var service = userService;
	var auth = authService;
	var factory = ShareData;
	var userId = auth.getUserLogged();
	var datosGenerales = {};

	if(!auth.isLoggedIn()){
		$window.location = "#/login";
	}

	service.getUserInfoById(userId).then(		
		function (data){
			blockUI.start();
			datosGenerales = data.data;	
			blockUI.stop();
		}
	)

	$scope.signOut = function(){
		auth.logout();
		$window.location = '#/login';
	}

})