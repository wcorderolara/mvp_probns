var probnsApp = angular.module('probnsApp',
    [
      'ngRoute',
      'ui.router',
      'ngAnimate',
      'ui.bootstrap',
      'blockUi',

      'LocalStorageModule',
      'Module.SessionService',
      'Module.HttpInterceptor',
      'Module.NotificacionService',
      'Module.ModalService',
      'Module.SignedRestService',
      'Module.AuthenticatedRestService'
    ]);

probnsApp.config(
  function($routeProvider, $locationProvider, $urlRouterProvider, $stateProvider, probnsConf){
    $stateProvider
      .state('login', {
        url:'/login',
        templateUrl: probnsConf.templates.loginUser,
        title: 'Login'
      })
      .state('logout', {
        url: '/logout',
        templateUrl: probnsConf.templates.logoutUser,
        title: 'Logout'
      })
      .state('dashboard', {
        url: '/',
        templateUrl: probnsConf.templates.dashboard,
        title: 'Resumen Cuenta'
      })
      probnsConf.$stateProvider = $stateProvider;
      probnsConf.$urlRouterProvider = $urlRouterProvider;
      $locationProvider.html5Mode(true);
      $locationProvider.hashPrefix('!');
  }
);

probnsApp.run(function($rootScope, $state, $location, $window, UserService, RoleService, StatesService){
  if(!UserService.isAuthenticated()){
    probnsApp.$urlRouterProvider.otherwise('/login');
  }
  if(RoleService.getStates()){
    StatesService.setStates(RoleService.getStates());
  }

  $rootScope.$on('$stateChangeStart',
      function(event, toState, ,toParams, fromState, fromParams){
        $rootScope.pageTitle = toState.title;
        if(UserService.isAuthenticated() && !RoleService.isSelectedRole() && toState.name != 'selectRole' && toState.name != 'logout'){
          event.preventDefault();
          $state.go("login");
        }
      })



})
