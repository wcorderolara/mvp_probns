'use strict';
angular.module('probnsApp')
    .run(
        [
            '$rootScope', '$state', '$stateParams',
            function($rootScope, $state, $stateParams) {
                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;
            }
        ]
    )
    .config(
        [
            '$stateProvider', '$urlRouterProvider',
            function($stateProvider, $urlRouterProvider){
                $urlRouterProvider
                    .otherwise('/app/dashboard');
                $stateProvider
                    .state('login',{
                        url: '/login',
                        templateUrl: 'views/login.html',
                        ncyBreadcrumb: {
                            label: 'Login'
                        }
                    })
                    .state('register', {
                        url: '/registro',
                        templateUrl: 'views/register.html',
                        ncyBreadcrumb: {
                            label: 'Registro Probns'
                        },
                        resolve: {
                            deps: [
                                '$ocLazyLoad',
                                function($ocLazyLoad){
                                    return $ocLazyLoad.load({
                                        serie: true,
                                        files: [
                                            'modules/property/propertyService.js',
                                            'auth/registerService.js',
                                            'auth/registerController.js'
                                        ]
                                    })
                                }
                            ]
                        }
                    })
                    .state('app',{
                        abstract: true,
                        url: '/app',
                        templateUrl: 'views/layout.html'
                    })
                    .state('app.dashboard', {
                        url: '/dashboard',
                        templateUrl: 'views/dashboard.html',
                        controller: 'dashboardController',
                        ncyBreadcrumb: {
                            label: 'Dashboard Principal',
                            description: ''
                        },
                        resolve: {
                            deps: [
                                '$ocLazyLoad',
                                function($ocLazyLoad){
                                    return $ocLazyLoad.load({
                                        serie: true,
                                        files: [                                            
                                            'modules/dashboard/dashboardService.js',
                                            'modules/dashboard/dashboardController.js'
                                        ]
                                    })
                                }
                            ]
                        }
                    })
                    .state('app.propiedades',{
                        url: '/propiedades',
                        templateUrl: 'views/listings.html',                        
                        ncyBreadcrumb: {
                            label: 'Listado Propiedades'
                        },
                        resolve: {
                            deps: [
                                '$ocLazyLoad',
                                function($ocLazyLoad){
                                    return $ocLazyLoad.load({
                                        serie: true,
                                        files: [
                                            'lib/jquery/fullcalendar/moment.min.js',
                                            'lib/jquery/fullcalendar/fullcalendar.js',
                                            'lib/main_utilities.js',
                                            'lib/main_calendar.js',
                                            'modules/listings/listingsService.js',
                                            'modules/listings/listingsController.js'
                                        ]
                                    })
                                }
                            ]
                        }
                    })
                    .state('app.nuevaPropiedad', {
                        url: '/agregar/propiedad',
                        templateUrl: 'views/new_property.html',
                        // controller: 'propertyController',
                        ncyBreadcrumb:{
                            label: 'Publica tu nueva propiedad'
                        },
                        resolve: {
                            deps: [
                                '$ocLazyLoad',
                                function($ocLazyLoad){
                                    return $ocLazyLoad.load({
                                        serie: true,
                                        files: [
                                            'lib/jquery/fuelux/wizard/wizard-custom.js',
                                            'modules/property/propertyService.js',
                                            'modules/property/propertyController.js',
                                            'modules/property/propertyStepOneController.js',
                                            'modules/property/propertyStepTwoController.js',
                                            'modules/property/propertyStepThreeController.js',
                                            'modules/property/propertyStepFourController.js',
                                            'modules/property/propertyStepFiveController.js'
                                        ]
                                    })
                                }
                            ]
                        }
                    })
                    .state('app.agentes', {
                        url: '/agentes',
                        templateUrl: 'views/agents.html',                        
                        ncyBreadcrumb: {
                            label: 'Agentes'
                        },
                        resolve: {
                            deps: [
                                '$ocLazyLoad',
                                function($ocLazyLoad){
                                    return $ocLazyLoad.load({
                                        serie: true,
                                        files: [
                                            'lib/jquery/fullcalendar/moment.min.js',
                                            'lib/jquery/fullcalendar/fullcalendar.js',
                                            'lib/main_utilities.js',
                                            'lib/main_calendar.js',
                                            'modules/generalServices/generalServices.js',
                                            'modules/agents/agentService.js',
                                            'modules/agents/agentController.js'
                                        ]
                                    })
                                }
                            ]
                        }
                    })
                    .state('app.clientes', {
                        url: '/clientes',
                        templateUrl: 'views/clients.html',
                        ncyBreadcrumb: {
                            label: 'Clientes'
                        },
                        resolve: {
                            deps: [
                                '$ocLazyLoad',
                                function($ocLazyLoad){
                                    return $ocLazyLoad.load({
                                        serie: true,
                                        files: [
                                            'lib/jquery/fullcalendar/moment.min.js',
                                            'modules/agents/agentService.js',
                                            'modules/clientes/clienteService.js',
                                            'modules/clientes/clienteController.js'
                                        ]
                                    })
                                }
                            ]
                        }
                    })
                    .state('app.tareas', {
                        url: '/tareas',
                        templateUrl: 'views/tasks.html',
                        ncyBreadcrumb: {
                            label: 'Tareas'
                        },
                        resolve: {
                            deps: [
                                '$ocLazyLoad',
                                function($ocLazyLoad){
                                    return $ocLazyLoad.load({
                                        serie: true,
                                        files: [   
                                            'lib/jquery/fullcalendar/moment.min.js',                                         
                                            'modules/tasks/taskService.js',
                                            'modules/tasks/taskListingController.js'
                                        ]
                                    })
                                }
                            ]
                        }
                    })
                    .state('app.crearTarea',{
                        url:"/nueva/tarea",
                        templateUrl: 'views/partials/new_task.html',
                        ncyBreadcrumb: {
                            label: 'Nueva tarea'
                        },
                        resolve: {
                            deps: [
                                '$ocLazyLoad',
                                function($ocLazyLoad){
                                    return $ocLazyLoad.load({
                                        serie: true,
                                        files: [
                                            'lib/jquery/fullcalendar/moment.min.js',
                                            'modules/property/propertyService.js',
                                            'modules/clientes/clienteService.js',
                                            'modules/agents/agentService.js',
                                            'modules/tasks/taskService.js',
                                            'modules/tasks/taskController.js'
                                        ]
                                    })
                                }
                            ]
                        }
                    });
            }        
        ]
    );