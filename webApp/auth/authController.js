probnsApp.controller('authController', function($scope, $window,$location,
											    authService, ShareData, blockUI, Notification){

	var auth = authService;
	
	$scope.userLogin = "";
	$scope.password = "";

	$scope.onSubmitForm = function(){
		$scope.formError = "";
		
		if(!$scope.userLogin || !$scope.password){
			$scope.formError = "Todos los campos son obligatorios..."
			return false;
		}else{
			$scope.loginUser();
		}
	}

	$scope.loginUser = function (){
		$scope.formError = "";
		var params = {
			userLogin: $scope.userLogin,
			password: $scope.password
		}

		auth.loginUser(params).then(
			function (data){
				if(data.type == true){
					console.log(data.token);
				}else{
					$scope.formError = data.data;
				}
			}
		)
	}

})