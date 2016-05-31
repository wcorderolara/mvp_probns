probnsApp.controller('taskListingController', function ($scope, $window, $location, taskService, authService, ShareData
												 , blockUI, Notification, $modal){
	
	var userLogged = authService.getUserLogged();
	var factory = ShareData;
	var agencia = factory.value.padreId == null ? userLogged : factory.value.padreId;
	$scope.tipoUsuario = factory.value.tipoUsuario;
	$scope.listTareas = [];

	$scope.getTareasByAgencia = function(){
		taskService.getTareasByAgencia(agencia).then(
			function (response){
				if(response.type){
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
					$scope.listTareas = response.data;
				}else{
					Notification.error(response.message);
				}
			}
		)
	}

	$scope.getTareas = function(){
		if(factory.value.padreId == null){
			$scope.getTareasByAgencia();
		}else{
			$scope.getTareasByAgente();
		}
	}

	$scope.getTareas();


	$scope.viewTask = function(tarea){
		var modalInstance = $modal.open({
			windowClass: "",
			templateUrl: "views/modals/tasks/viewTask.html",
			controller: "viewTaskController",
			size: "md",
			resolve: {
				item: function(){
					return tarea;
				}
			}
		});
	}

	$scope.endTask = function(tarea){
		var modalInstance = $modal.open({
			windowClass: "",
			templateUrl: "views/modals/tasks/endTask.html",
			controller: "endTaskController",
			size: "md",
			resolve: {
				item: function(){
					return tarea;
				}
			}
		});

		modalInstance.result.then(function(data){
			if(data.type){
				Notification.success(data.message);
				$scope.getTareas();
			}else{
				Notification.error(data.message);
			}
		})
	}

	$scope.removeTask = function(tarea){
		var modalInstance = $modal.open({
			windowClass: "",
			templateUrl: "views/modals/tasks/removeTask.html",
			controller: "removeTaskController",
			size: "md",
			resolve: {
				item: function(){
					return tarea;
				}
			}
		});

		modalInstance.result.then(function(data){
			if(data.type){
				Notification.success(data.message);
				$scope.getTareas();
			}else{
				Notification.error(data.message);
			}
		})
	}
	
})

probnsApp.controller('viewTaskController', function ($scope, $modalInstance, item){
	$scope.tarea = item;
	$scope.relacionTarea = item.Buscador == null ? "Inmueble relacionado" : "Cliente relacionado";
	$scope.detalleRelacionTarea = item.Buscador == null ? item.Inmueble.codigoInmueble + ' - ' + item.Inmueble.direccionCorta : item.Buscador.nombre + ' ' + item.Buscador.apellido;

	$scope.cancel = function(){
		$modalInstance.dismiss('cancel');
	}
})

probnsApp.controller('endTaskController', function ($scope, $modalInstance, item, taskService){
	$scope.tarea = item;

	$scope.endTask = function(){
		var data = {
			comentarioFinal: $scope.comentarioFinal
		}

		taskService.finalizarTarea(item.id, data).then(
			function (response){
				$modalInstance.close(response);
			}
		)
	}

	$scope.cancel = function(){
		$modalInstance.dismiss('cancel');
	}
})

probnsApp.controller('removeTaskController', function ($scope, $modalInstance, item, taskService){
	$scope.tarea = item;

	$scope.remove = function(){
		var data = {
			comentarioFinal: $scope.comentarioFinal
		}

		taskService.deleteTarea(item.id).then(
			function (response){
				$modalInstance.close(response);
			}
		)
	}

	$scope.cancel = function(){
		$modalInstance.dismiss('cancel');
	}
})