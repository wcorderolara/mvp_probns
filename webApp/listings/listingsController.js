probnsApp.controller('listingsController', function($scope,$http,$location,
											   	     $window,listingsService,ShareData,blockUI){

	var service = listingsService;
	var factory = ShareData;
	var userId = 1;
	$scope.datosGenerales = {};
	$scope.totalPropiedades = 0;
	$scope.totalAgentes = 0;

	service.getUserInfoById(userId).then(		
		function (data){
			console.log(data);
			// $scope.datosGenerales = data;			
		}
	)

	service.getTotalPropiedadesByUser(userId).then(
		function (data){
			console.log(data);
			// $scope.totalPropiedades = data;			
		}
	)

	service.getTotalAgentesByUser(userId).then(
		function (data){
			console.log(data);
			// $scope.totalAgentes = data;
			// blockUI.stop();
		}
	)
})