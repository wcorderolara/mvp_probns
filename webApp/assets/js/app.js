var probnsApp = angular.module('probnsApp',['ngRoute','ui.bootstrap','blockUI','ui-notification' ]);

probnsApp.factory('ShareData', function () {
    return { value: 0 };
})

probnsApp.config(['$routeProvider','$locationProvider', 'probnsConf', function ($routeProvider,$locationProvider,probnsConf) {
    $routeProvider
    .when("/", {
        templateUrl: probnsConf.templates.dashboard,
        controller: "dashboardController"
    }).
    when("/logout", {
    	templateUrl: probnsConf.templates.logoutUser,
    	controller: "authUserController"
    }).
    when("/login", {
    	templateUrl: probnsConf.templates.loginUser,
    	controller: "authUserController"
    }).
    when("/signin", {
    	templateUrl: probnsConf.templates.signinUser,
    	controller: "authUserController"
    }).
 	when("/agentes", {
 		templateUrl: probnsConf.templates.agentes,
 		controller: "agentesController"
 	}).
 	when("/clientes", {
 		templateUrl: probnsConf.templates.clientes,
 		controller: "clientesController"
 	}).
 	when("/propiedades", {
 		templateUrl: probnsConf.templates.listings,
 		controller: "listingsController"
 	}).
 	when("/propiedades/:id", {
 		templateUrl: probnsConf.templates.propertyDetails,
 		controller: "propertyDetails"
 	}).
 	when("/crearPropiedad", {
 		templateUrl: probnsConf.templates.addProperty,
 		controller: "newPropertyController"
 	}).
    otherwise({
    	redirectTo: '/login'
    })

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
}]);