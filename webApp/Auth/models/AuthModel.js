var AuthModel = Class.extend({
    _service: "",
    _config: "",
    _session: {},
    _utils: {},
    _state: {},
    _notification: {},
    _user: {},
    _role: {},
    init: function($state, AuthService, awConf, SessionService, UtilsService, UserService, RoleService, NotificationService, EncryptService, $window){
        this._state = $state;
        this._service = AuthService;
        this._config = awConf;
        this._session = SessionService;
        this._utils = UtilsService;
        this._user = UserService;
        this._notification = NotificationService;
        this._role = RoleService;
        this._encrypt = EncryptService;
        this._window = $window;
    },
    login: function(params){
        params = angular.copy(params);
        if(!params.Login){
            this._notification.error({title: "ERROR", message: "Username is required."});
            return false;
        }
        if(!params.Password){
            this._notification.error({title: "ERROR", message: "Password is required."});
            return false;
        }else{
            params.Password = this._encrypt.getSHA256(params.Password);
        }
        return this._service.login(params);
    },
    logout: function(){
        this._session.remove(this._config.security.loggedUserInformation);
        this._session.remove(this._config.security.currentObject);
    },
    setLoggin: function(param){
        this.setLoggedUserInformation(param);
        if(param.roles.length == 1){
            var role = param.roles[0];
            if(this.isAdvExecutive(role) || this.isPubExecutive(role)){
                if(role.advertiserAccountExecutiveID > 0 || role.publisherAccountExecutiveID > 0){
                    var child = this._role.getRoleChilds(role);
                    this.setSelectedRole(role, child[0]);
                    this._window.location = this._role.getDefaultUrl();
                }
                else{
                    this._state.go("selectRole");
                }
            }
            else{
                if(this.isAdvertiser(role) || this.isPublisher(role)){
                     if((this.isAdvertiser(role) && role.advertiserList.length == 1) || (this.isPublisher(role) && role.publisherList.length == 1)){
                        if((this.isAdvertiser(role) && role.advertiserList[0].advertiserID > 0) || (this.isPublisher(role) && role.publisherList[0].publisherID > 0)){
                            var child = this._role.getRoleChilds(role);
                            this.setSelectedRole(role, child[0]);
                            this._window.location = this._role.getDefaultUrl();
                        }
                        else{
                            this._state.go("selectRole");
                        }
                     }
                     else{
                           this._state.go("selectRole");
                     }
                }
                else{
                    if(this.isAgency(role) || this.isUserAdmin(role) || this.isAdvReportExecutive(role) || this.isPubReportExcutive(role) || this.isAudit(role)){
                        var child = this._role.getRoleChilds(role);
                        this.setSelectedRole(role, child[0]);
                        this._window.location = this._role.getDefaultUrl();
                    }
                    else{
                        if(this.isAdvertiserMultipleRol(role) || this.isPublisherMultipleRol(role)){
                            if((this.isAdvertiserMultipleRol(role) && role.advertiserList.length == 1) || (this.isPublisherMultipleRol(role) && role.publisherList.length == 1)){
                                if((this.isAdvertiserMultipleRol(role) && role.advertiserList[0].advertiserID > 0) || (this.isPublisherMultipleRol(role) && role.publisherList[0].publisherID > 0)){
                                    var child = this._role.getRoleChilds(role);
                                    this.setSelectedRole(role, child[0]);
                                    this._window.location = this._role.getDefaultUrl();
                                }
                                else{
                                    this._state.go("selectRole");
                                }
                            }
                            else{
                                this._state.go("selectRole");
                            }
                        }
                        else{
                            this._state.go("selectRole");
                        }
                    }
                }
            }
        }else{
            this._state.go("selectRole");
        }
    },
    setLoggedUserInformation: function(param){
        return this._user.setLoggedUserInformation(param);
    },
    setSelectedRole: function(param, child){
        return this._role.setRoleWithChild(param, child);
    },
    isAdvertiser: function(param){
        if(this._config.roles.advertiser.name == param.roleName){
            return true;
        }
        return false;
    },
    isPublisher: function(param){
        if(this._config.roles.publisher.name == param.roleName){
            return true;
        }
        return false;
    },
    isAdvExecutive: function(param){
        if(this._config.roles.advExecutive.name == param.roleName){
            return true;
        }
        return false;
    },
    isPubExecutive: function(param){
        if(this._config.roles.pubExecutive.name == param.roleName){
            return true;
        }
        return false;
    },
    isAgency: function(param){
        if(this._config.roles.agency.name == param.roleName){
            return true;
        }
        return false;
    },
    isAdvertiserMultipleRol: function(param){
        if(this._config.roles.advMultipleRol.name == param.roleName){
            return true;
        }
        return false;
    },
    isPublisherMultipleRol: function(param){
        if(this._config.roles.pubMultipleRol.name == param.roleName){
            return true;
        }
        return false;
    },
    isUserAdmin: function(param){
        if(this._config.roles.userAdmin.name == param.roleName){
            return true;
        }
        return false;
    },
    isAdvReportExecutive: function(param){
        if(this._config.roles.advReportExecutive.name == param.roleName){
            return true;
        }
        return false;
    },
    isPubReportExcutive: function(param){
        if(this._config.roles.pubReportExcutive.name == param.roleName){
            return true;
        }
        return false;
    },
    isAudit: function(param){
        if(this._config.roles.audit.name == param.roleName){
            return true;
        }
        return false;
    }
});

(function(){
    awApp
        .service('AuthModel', function($state, AuthService, awConf, SessionService, UtilsService, UserService, RoleService, NotificationService, EncryptService, $window){
            return new AuthModel($state, AuthService, awConf, SessionService, UtilsService, UserService, RoleService, NotificationService, EncryptService, $window);
        });
}());
