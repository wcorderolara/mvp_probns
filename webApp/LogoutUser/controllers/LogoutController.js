var LogoutController = BaseController.extend({
    _user: {},
    _state: {},
    _role: {},
    init:function(scope, UserService, LogoutService){
        this._super(scope);
        this._user = UserService;
        this._service = LogoutService;
        this.logout();
    },
    logout: function(){
        if(this._user.isAuthenticated()){
            this._service.logout().then(angular.bind(this, function(){
                this._user.logout();
            }));
        }
    }
});
LogoutController.$inject = ['$scope', 'UserService', 'LogoutService'];
