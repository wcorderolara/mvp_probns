probnsApp.controller('listingsController', function($scope,$http,$location,
											   	     $window,listingsService,ShareData,blockUI, authService){

	var service = listingsService;
	var factory = ShareData;
	var agenciaId = factory.value.padreId == null ? factory.value.userId : factory.value.padreId;
	var userId = factory.value.padreId != null ? authService.getUserLogged() : factory.value.userId;
	$scope.listadoPropiedades = [];

	service.getPropidadesUsuario(agenciaId).then(
		function (data){
			$scope.listadoPropiedades = data.data;
		}
	)
	
})