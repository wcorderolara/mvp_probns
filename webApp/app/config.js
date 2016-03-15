var probnsApp =
    angular.module('probnsApp')
        .config(
        [
            '$controllerProvider', '$compileProvider', '$filterProvider', '$provide',
            function($controllerProvider, $compileProvider, $filterProvider, $provide) {
                probnsApp.controller = $controllerProvider.register;
                probnsApp.directive = $compileProvider.directive;
                probnsApp.filter = $filterProvider.register;
                probnsApp.factory = $provide.factory;
                probnsApp.service = $provide.service;
                probnsApp.constant = $provide.constant;
                probnsApp.value = $provide.value;
            }
        ]);


probnsApp.config(function($breadcrumbProvider) {
    $breadcrumbProvider.setOptions({
        template: '<ul class="breadcrumb"><li><i class="fa fa-home"></i><a ui-sref="app.dashboard">Home</a></li><li ng-repeat="step in steps" ng-class="{active: $last}" ng-switch="$last || !!step.abstract"><a ng-switch-when="false" href="{{step.ncyBreadcrumbLink}}">{{step.ncyBreadcrumbLabel}}</a><span ng-switch-when="true">{{step.ncyBreadcrumbLabel}}</span></li></ul>'
    });
});

probnsApp.factory('ShareData', function () {
    return { value: 0 };
})
