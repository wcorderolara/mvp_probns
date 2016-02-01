var StatesService = Class.extend({
    _config: {},
    _session: {},
    _utils: {},
    _user: {},
    init: function(SessionService, probnsConf, UtilsService, UserService){
        this._config = probnsConf;
        this._session = SessionService;
        this._utils = UtilsService;
        this._user = UserService;
    },
    setStates: function(states){
        probnsApp.$urlRouterProvider.otherwise(states[0].url);
        angular.forEach(states, angular.bind(this, function(item){
            var template = this._config.templates[item.templateUrl];
            var stateObj = {
                url: item.url,
                templateUrl: template,
                title: item.title,
                customParameters: {}
            }
            if(item.impersonateRoleName){
                stateObj.customParameters.impersonateRoleName = item.impersonateRoleName;
            }
            if(item.children){
                stateObj.customParameters.actionPermissions = item.children;
            }
            probnsApp.$stateProvider.state(item.id, stateObj);
        }));
    }
});
(function(){
    awApp
        .service("StatesService", function(SessionService, probnsConf, UtilsService, UserService){
            return new StatesService(SessionService, probnsConf, UtilsService, UserService);
        })
}());
