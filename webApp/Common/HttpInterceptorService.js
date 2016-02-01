// Intercepting HTTP calls with AngularJS.
angular.module('Module.HttpInterceptor', [])
    .config(function ($provide, $httpProvider) {
// Intercept http calls.
        $provide.factory('MyHttpInterceptor', function ($q, $rootScope) {
            return {
// On request success
                request: function (config) {

// Return the config or wrap it in a promise if blank.
                    $rootScope.$broadcast("START_REQUEST");
                    return config || $q.when(config);
                },

// On request failure
                requestError: function (rejection) {
// Return the promise rejection.
                    return $q.reject(rejection);
                },

// On response success
                response: function (response) {
// Return the response or promise.
                    $rootScope.$broadcast("END_REQUEST");
                    return response || $q.when(response);
                },

// On response failture
                responseError: function (rejection) {
// Return the promise rejection.
                    $rootScope.$broadcast("ERROR_RESPONSE", rejection);
                    return $q.reject(rejection);
                }
            };
        });

// Add the interceptor to the $httpProvider.
        $httpProvider.interceptors.push('MyHttpInterceptor');

    })
    .run(function($window, $rootScope, NotificationService, UserService, $http){
        $rootScope.$on("START_REQUEST", function(){
            NotificationService.loading("show");
        });
        $rootScope.$on("END_REQUEST", function(response){
            if($http.pendingRequests.length <= 0){
                NotificationService.loading("hide");
            }
        });
        $rootScope.$on("ERROR_RESPONSE", function($scope, response){
            if(response.status == 500){
                NotificationService.error({title: "ERROR", message: response.statusText});
            }else if(response.status == 401){
                UserService.logout();
                $window.location = "/login?error="+response.statusText;
            }
            NotificationService.loading("hide");
        });
    });
