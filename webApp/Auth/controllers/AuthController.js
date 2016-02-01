var AuthController = BaseController.extend({
    _authModel: "",
    _notification: "",
    _session: {},
    _utils: {},
    _state: {},
    _loginModel: {
      Login:"",
      Password: ""
    },
    init:function($scope, $rootScope, AuthModel, NotificationService, SessionService, awConf, UtilsServivce, state){
        this._super($scope, $rootScope);
        this._authModel = AuthModel;
        this._notification = NotificationService;
        this._session = SessionService;
        this._config = awConf;
        this._utils = UtilsServivce;
        this._state = state;
        this.showError();
    },
    defineListeners:function(){
        //this.$scope.$on("_START_REQUEST_", this.test.bind(this))
    },
    defineScope:function(){
        this.loginModel = this._loginModel;
    },
    showError: function(){
        if(this._state.params.error){
            this._notification.error({title: "ERROR", message: this._state.params.error});
        }
    },
    login: function(){
        this._authModel.login(this.loginModel).then(this._loginSuccess.bind(this));
    },
    isAuthenticated: function(){
        return this._authModel.isAuthenticated();
    },
    getRoles: function(){
        return this._authModel.getRoles();
    },
    _loginSuccess: function(response){
        response = response.data.userInformation;
        this._authModel.setLoggin(response);
    },
    _validateRole: function(role){
        return this._authModel.validateRole(role);
    }
});
AuthController.$inject = ['$scope', '$rootScope', 'AuthModel', 'NotificationService', 'SessionService', 'awConf', 'UtilsService', '$state'];
