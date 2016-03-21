probnsApp.controller('listingsController', function($scope,$http,$location,
											   	     $window,listingsService,ShareData,blockUI){

	var service = listingsService;
	var factory = ShareData;
	var userId = 1;
	$scope.listadoPropiedades = [];

	service.getPropidadesUsuario(userId).then(
		function (data){
			$scope.listadoPropiedades = data.data;
		}
	)
	
})