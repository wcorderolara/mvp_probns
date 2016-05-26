probnsApp.controller('taskListingController', function ($scope, $window, $location, taskService, authService, ShareData
												 , blockUI, Notification, $modal){
	
	var userLogged = authService.getUserLogged();
	var factory = ShareData;
	var agencia = factory.value.padreId == null ? userLogged : factory.value.padreId;
	$scope.listTareas = [];

	$scope.getTareasByAgencia = function(){
		taskService.getTareasByAgencia(agencia).then(
			function (response){
				if(response.type){
					console.log(response.data);
					$scope.listTareas = response.data;
				}else{
					Notification.error(response.message);
				}
			}
		)
	}

	$scope.getTareasByAgente = function(){
		taskService.getTareasByAgente(userLogged).then(
			function (response){
				if(response.type){
					console.log(response.data);
					$scope.listTareas = response.data;
				}else{
					Notification.error(response.message);
				}
			}
		)
	}

	if(factory.value.padreId == null){
		$scope.getTareasByAgencia();
	}else{
		$scope.getTareasByAgente();
	}
	
})