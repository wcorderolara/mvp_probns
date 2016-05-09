probnsApp.controller('listingsController', function($scope,$http,$location,
											   	     $window,listingsService,ShareData,blockUI, authService){

	var service = listingsService;
	var factory = ShareData;
	var userId = authService.getUserLogged();
	$scope.listadoPropiedades = [];

	service.getPropidadesUsuario(userId).then(
		function (data){
			$scope.listadoPropiedades = data.data;
		}
	)
	
})