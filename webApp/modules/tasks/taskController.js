probnsApp.controller('taskController', function ($scope, $window, $location, taskService, authService, ShareData
												 , blockUI, Notification, $modal, agentService, clienteService,
												 propertyService, $http){
	
	var userLogged = authService.getUserLogged();
	var factory = ShareData;
	var agencia = factory.value.padreId == null ? userLogged : factory.value.padreId;
	$scope.listBuscadores = [];
	$scope.listInmuebles = [];
	$scope.listAgentes = [];

	$scope.descripcionTarea = "";
	$scope.relacionTarea = "";
	$scope.BuscadorId = "";
	$scope.clienteSelected = "";
	$scope.InmuebleId = "";
	$scope.inmuebleSelected = "";
	$scope.agenteSelected = "";
	$scope.usuarioAsignadoId = "";

	$scope.getVendedoresByPadre = function(){
		agentService.getVendedoresByPadre(agencia).then(
			function (data){
				$scope.listAgentes = data.data;
			}
		)
	}

	$scope.getBuscadoresByAgencia = function(){
		clienteService.getBuscadoresByAgencia(agencia).then(
			function (data){
				$scope.listBuscadores = data.data;
			}
		)
	}

	$scope.getVendedoresByPadre();
	$scope.getBuscadoresByAgencia();

	$scope.setUsuarioAsigando = function(agente){
		$scope.usuarioAsignadoId = agente.id;
		$scope.agenteSelected = agente.firstName + ',' + agente.lastName;
	}

	$scope.setClienteAsociado = function(cliente){
		$scope.BuscadorId = cliente.id;
		$scope.buscadorSelected = cliente.nombre + ' , ' + cliente.apellido;
	}

	$scope.setInmuebleAsociado = function(inmueble){
		console.log(inmueble);
		$scope.InmuebleId = inmueble.id;
		$scope.inmuebleSelected = inmueble.codigoInmueble;
	}

	$scope.getInmueblesByCode = function(code){
		propertyService.searchInmuebleByCodigoInmueble(code).then(
			function(data){
				if(data.data.length > 0){
					obj = data.data[0];
					$scope.noResults = false;
					$scope.inmuebleSelected = obj.codigoInmueble + ' - ' + obj.direccionCorta;
					$scope.InmuebleId = obj.id;
					return data.data;
				}else{
					$scope.noResults = true;
				}
			}
		)
	}

	$scope.postTarea = function(){
		$scope.formError = "";
		var params = {
			descripcion: $scope.descripcionTarea,
			relacion: $scope.relacionTarea,
			estadoTareaId: 1,
			BuscadorId: $scope.BuscadorId,
			InmuebleId: $scope.InmuebleId,
			usuarioAsignadoId: $scope.usuarioAsignadoId,
			usuarioAsignoId: userLogged,
			UsuarioId: agencia
		}

		if(!$scope.descripcionTarea || !$scope.relacionTarea || !$scope.BuscadorId || !$scope.InmuebleId || $scope.usuarioAsignadoId){
			$scope.formError = ""
		}		

		taskService.postTarea(params).then(			
			function (response){
				if(response.type){
					Notification.success(response.message);
					setTimeout(function(){
						$window.location = '#/app/tareas';
					}, 800);
				}else{
					Notification.error(response.message);					
				}
			}
		)
	}

	$scope.cancelTarea = function(){
		$window.location = '#/app/tareas';
	}
})