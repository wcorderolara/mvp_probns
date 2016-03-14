probnsApp.controller('dashboardController', function($scope,$http,$location,
											   	     $window,dashboardService,ShareData,blockUI){

	var service = dashboardService;
	var factory = ShareData;
	var userId = 1;
	$scope.datosGenerales = {};
	$scope.totalPropiedades = 0;
	$scope.totalAgentes = 0;

	service.getUserInfoById(userId).then(		
		function (data){
			console.log(data.data);
			$scope.datosGenerales = data.data;			
		}
	)

	service.getTotalPropiedadesByUser(userId).then(
		function (data){
			// console.log(data);
			$scope.totalPropiedades = data.data;			
		}
	)

	service.getTotalAgentesByUser(userId).then(
		function (data){
			// console.log(data);
			$scope.totalAgentes = data.data;
			blockUI.stop();
		}
	)
})