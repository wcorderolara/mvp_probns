probnsApp.controller('taskController', function ($scope, $window, $location, taskService, authService, ShareData
												 , blockUI, Notification, $modal){
	
	var userLogged = authService.getUserLogged();
	var factory = ShareData;
	var agencia = factory.value.padreId == null ? userLogged : factory.value.padreId;
	$scope.listBuscadores = [];
	$scope.listInmuebles = [];
	$scope.listAgentes = [];

	$scope.descripcionTarea = "";
	$scope.relacionTarea = "";
	$scope.BuscadorId = "";
	$scope.InmuebleId = "";
	$scope.usuarioAsignadoId = "";
})