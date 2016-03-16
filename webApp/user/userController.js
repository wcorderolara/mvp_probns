probnsApp.controller('userController', function($scope,userService,ShareData,blockUI){

	var service = userService;
	var factory = ShareData;
	var userId = 1;
	$scope.datosGenerales = {};

	service.getUserInfoById(userId).then(		
		function (data){
			blockUI.start();
			$scope.datosGenerales = data.data;	
			$scope.putUserInfo = JSON.parse(JSON.stringify(data.data));		
			blockUI.stop();
		}
	)

})