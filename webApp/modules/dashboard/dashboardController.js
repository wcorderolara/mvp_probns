probnsApp.controller('dashboardController', function($scope,$http,$location,
											   	     $window,dashboardService,ShareData,blockUI,
											   	     Notification, authService){

	var service = dashboardService;
	var auth = authService;
	var factory = ShareData;
	console.log('dashboardController', factory);
	var agenciaId = factory.value.padreId == null ? factory.value.userId : factory.value.padreId;
	var userId = factory.value.padreId != null ? auth.getUserLogged() : factory.value.userId;
	$scope.tipoUsuario = factory.value.tipoUsuario;
	// var userId = auth.getUserLogged();

	$scope.datosGenerales = {};
	$scope.totalPropiedades = 0;
	$scope.totalAgentes = 0;
	$scope.putUserInfo = {};
	$scope.topInmuebles = [];

	service.getUserInfoById(userId).then(		
		function (data){
			blockUI.start();
			$scope.datosGenerales = data.data;	
			$scope.putUserInfo = JSON.parse(JSON.stringify(data.data));		
			blockUI.stop();
		}
	)

	service.getTotalPropiedadesByUser(agenciaId).then(
		function (data){
			blockUI.start();
			$scope.totalPropiedades = data.data;
			blockUI.stop();			
		}
	)

	service.getTotalAgentesByUser(agenciaId).then(
		function (data){
			blockUI.start();
			$scope.totalAgentes = data.data;
			blockUI.stop();
		}
	)

	service.getTotalBuscadoresByUser(agenciaId).then(
		function (data){
			blockUI.start();
			$scope.totalBuscadores = data.data;
			blockUI.stop();
		}
	)

	if(factory.value.tipoUsuario == 'Agencia'){
		service.getTotalTareasPendientesByAgencia(userId).then(
			function (data){
				blockUI.start();
				$scope.totalTareasPendientes = data.data;
				blockUI.stop();
			}
		)
	}else if(factory.value.tipoUsuario == 'Agente'){
		service.getTotalTareasPendientesByAgente(userId).then(
			function (data){
				blockUI.start();
				$scope.totalTareasPendientes = data.data;
				blockUI.stop();
			}
		)
	}

	service.getTopInmuebles(agenciaId).then(
		function (data){
			blockUI.start();
			$scope.topInmuebles = data.data;
			blockUI.stop();
		}
	)

})