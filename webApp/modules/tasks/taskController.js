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
		$scope.InmuebleId = inmueble.id;
		$scope.inmuebleSelected = inmueble.codigoInmueble;
	}

	$scope.getInmueblesByCode = function(code){
		propertyService.searchInmuebleByCodigoInmueble(code).then(
			function(data){
				if(data.data.length > 0){
					obj = data.data[0];
					$scope.noResults = false;
					$scope.inmuebleSelected = obj.codigoInmueble + ' - ' + obj.direccionCorta
					return data.data;

				}else{
					$scope.noResults = true;
				}
			}
		)
	}
})