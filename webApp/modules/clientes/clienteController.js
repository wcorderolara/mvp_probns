probnsApp.controller('clienteController', function ($scope, $window, $location,
													clienteService,authService, ShareData, blockUI, 
											    	Notification, $modal){
	var auth = authService;
	var service = clienteService;
	var userLogged= auth.getUserLogged();
	var factory = ShareData;
	var agenciaAsignada = factory.value.padreId == null ? auth.getUserLogged() : factory.value.padreId;
	$scope.tipoUsuario = factory.value.tipoUsuario;
	$scope.listadoBuscadores = [];
	$scope.buscadorSelected = {};
	$scope.editBuscador = {};
	$scope.newBuscador = {
		nombre: "",
		apellido: "",
		email: "",
		telefono1: "",
		direccion: "",
		presupuestoMin: "",
		presupuestoMax: "",
		tipoBuscadorId: "",
		vendedorAsignadoId: "",
		estadoBuscador: "",
		agenciaAsociadaId: ""
	}

	$scope.isSelected = function(){
		var result = Object.keys($scope.buscadorSelected).length > 0 ? true : false;
		return result;
	}

	$scope.getBuscadoresByAgencia = function(userLogged){
		service.getBuscadoresByAgencia(userLogged).then(
			function (data){
				if(data.type){
					$scope.listadoBuscadores = data.data;
				}else{
					Notification.error(data.message);
				}
			}
		)
	}

	$scope.getBuscadoresByAgente = function(userLogged){
		service.getBuscadoresByAgente(userLogged).then(
			function(data){
				if(data.type){
					$scope.listadoBuscadores = data.data;
				}else{
					Notification.error(data.message);
				}
			}
		)
	}

	$scope.getBuscadores = function(){
		if(factory.value.padreId == null){
			$scope.getBuscadoresByAgencia(userLogged);
		}else{
			$scope.getBuscadoresByAgente(userLogged);
		}
	}

	$scope.getBuscadores();

	$scope.getBuscadorById = function(buscadorId){
		service.getBuscadorById(buscadorId).then(
			function (data){
				if(data.type){
					$scope.buscadorSelected = data.data;					
				}else{
					Notification.error(data.message);
				}
			}
		)
	}	

	$scope.openModal = function(windowClass,templateUrl,size,action){	
		
		var modalInstance = $modal.open({
			windowClass: windowClass,
			templateUrl: templateUrl,
			controller: 'addBuscadorController',
			size: size,
			resolve: {
				items: function(){
					if(action=='new'){
						return $scope.newBuscador;
					}else{
						return $scope.buscadorSelected;
					}
				},
				agenciaAsociada: function(){
					return agenciaAsignada;
				},
				action: function(){

					return action;
				}
			}
		});

		modalInstance.result.then(function (data){
			if(data.type){
				Notification.success(data.message)
				$scope.buscadorSelected = {};
				$scope.getBuscadores();
			}
		});
	}

	$scope.openDeleteModal = function(windowClass,templateUrl,size, buscador){
		var modalInstance = $modal.open({
			windowClass: windowClass,
			templateUrl: templateUrl,
			controller: 'deleteBuscadorController',
			size: size,
			resolve: {
				item: function(){
					return buscador;
				}
			}			
		});

		modalInstance.result.then(function (data){
			if(data.type){
				Notification.success(data.message)
				$scope.buscadorSelected = {};
				$scope.getBuscadores();
			}
		});
	}

})

probnsApp.controller('deleteBuscadorController', function($scope, $modalInstance,item, clienteService){
	$scope.buscador = item;
	$scope.deleteBuscador = function(){
		clienteService.deleteBuscador($scope.buscador.id).then(
			function (response){
				$modalInstance.close(response);
			}
		)
	}

	$scope.cancel = function(){

		$modalInstance.dismiss('cancel');
	}

})

probnsApp.controller('addBuscadorController', function($scope, $modalInstance, items, agentService,
														agenciaAsociada,clienteService, action,ShareData){
	var service = clienteService;
	$scope.listTiposBuscador = [];
	$scope.listVendedores = [];
	$scope.newItem = items;
	console.log(ShareData);
	$scope.vendedorAsignadoId = ShareData.value.userId;

	service.getTiposBuscador().then(
		function (data){
			if(data.type){
				$scope.listTiposBuscador = data.data;
			}
		}		
	)

	agentService.getVendedoresByPadre(agenciaAsociada).then(
		function (data){
			if(data.type){
				$scope.listVendedores = data.data;
			}
		}
	)

	if(action =='new'){		
		$scope.id = "";
		$scope.nombre = "";
		$scope.apellido = "";
		$scope.email = "";
		$scope.telefono1 = "";
		$scope.direccion = "";
		$scope.presupuestoMin = "";
		$scope.presupuestoMax = "";
		$scope.tipoBuscadorId = "";
		$scope.vendedorAsignadoId = "";
		$scope.estadoBuscadorId = 1;
		$scope.agenciaAsociadaId = agenciaAsociada;
	}else{
		$scope.id = $scope.newItem.id;
		$scope.nombre = $scope.newItem.nombre;
		$scope.apellido = $scope.newItem.apellido;
		$scope.email = $scope.newItem.email;
		$scope.telefono1 = $scope.newItem.telefono1;
		$scope.direccion = $scope.newItem.direccion;
		$scope.presupuestoMin = $scope.newItem.presupuestoMin;
		$scope.presupuestoMax = $scope.newItem.presupuestoMax;
		$scope.tipoBuscadorId = $scope.newItem.tipoBuscadorId;
		$scope.vendedorAsignadoId = $scope.newItem.vendedorAsignadoId;
		$scope.estadoBuscadorId = $scope.newItem.estadoBuscador;
		$scope.agenciaAsociadaId = $scope.newItem.agenciaAsociadaId;
	}

	$scope.postBuscador = function(){
		$scope.formError = "";

		// if(!$scope.newPassword){
		// 	$scope.newPassword = "ClaveAgenteProbns"; 
		// }

		// if(!$scope.newUserLogin || !$scope.newFirstName || !$scope.newLastName || !$scope.newTelefono || !$scope.newPaiId){
		// 	$scope.formError = "El nombre, apellido, correo electronico, telefono y pais, son obligatorios";
		// 	return false
		// }

		$scope.newItem = {
			nombre: $scope.nombre,
			apellido: $scope.apellido,
			email: $scope.email,
			telefono1: $scope.telefono1,
			direccion: $scope.direccion,
			presupuestoMin: $scope.presupuestoMin,
			presupuestoMax: $scope.presupuestoMax,
			tipoBuscadorId: $scope.tipoBuscadorId,
			vendedorAsignadoId: $scope.vendedorAsignadoId,
			estadoBuscadorId: $scope.estadoBuscador,
			agenciaAsociadaId: $scope.agenciaAsociadaId
		}

		service.postBuscador($scope.newItem).then(
			function (response){
				$modalInstance.close(response);
			}
		)

	}

	$scope.putBuscador = function(){
		
		$scope.newItem = {
			id: $scope.newItem.id,
			nombre: $scope.nombre,
			apellido: $scope.apellido,
			email: $scope.email,
			telefono1: $scope.telefono1,
			direccion: $scope.direccion,
			presupuestoMin: $scope.presupuestoMin,
			presupuestoMax: $scope.presupuestoMax,
			tipoBuscadorId: $scope.tipoBuscadorId,
			vendedorAsignadoId: $scope.vendedorAsignadoId,
			estadoBuscadorId: $scope.newItem.estadoBuscador.id,
			agenciaAsociadaId: $scope.newItem.agenciaAsociadaId
		}

		service.putBuscador($scope.newItem, $scope.newItem.id).then(
			function (response){
				$modalInstance.close(response);
			}
		)
	}

	$scope.saveBuscador = function(){
		if(action == 'new'){
			$scope.postBuscador();
		}else{
			$scope.putBuscador();
		}
	}

	$scope.cancel = function(){

		$modalInstance.dismiss('cancel');
	}

})