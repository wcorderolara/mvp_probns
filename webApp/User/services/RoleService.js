var RoleService = Class.extend({
    _config: {},
    _session: {},
    _utils: {},
    _user: {},
    advertiserService:"",
    _publisher: {},
    _states: {},
    _window: {},
    init: function(SessionService, probnsConf, UtilsService, UserService, StatesService, AdvertiserService, PublisherService, $window, $state){
        this._config = probnsConf;
        this._session = SessionService;
        this._utils = UtilsService;
        this._user = UserService;
        this._states = StatesService;
        this._publisher = PublisherService;
        this._advertiser = AdvertiserService;
        this._window = $window;
        this._state = $state;
    },
    setSelectedRole: function(param){
        var objStates = param.rolesUiStateItems;
        param = this._utils.base64_encode(JSON.stringify(param));
        this._session.set(this._config.security.selectedRole, param);
    },
    getSelectedRoleName: function(){
        var role = this.getSelectedRole();
        if(role){
            return role.roleName;
        }
        return false;
    },
    getSelectedRoleDisplayName: function(){
        var role = this.getSelectedRole();
        if(role){
            return role.roleDisplayName;
        }
        return false;
    },
    getExecutiveRoleDisplayNameFromImpersonated: function(){
        var executiveRole = this._session.get(this._config.security.executiveSession);
        return executiveRole.roleDisplayName;
    },
    getSelectedRole: function(){
        var session = this._session.get(this._config.security.selectedRole);
        if(session){
            return JSON.parse(this._utils.base64_decode(session));
        }
        return false;
    },
    getRoles: function(){
        if(this._user.isAuthenticated()){
            var objUserInformation = this._user.getLoggedUserInformation();
            var roles = [];
            _.forEach(objUserInformation.roles, function(role) {
                roles.push(role);
            });
            return roles;
        }
        return false;
    },
    getRoleChilds: function(role){
        var roleChilds =_.find(this.getRoles(), role);
        if(roleChilds){
            if(role.roleName == this._config.roles.advertiser.name){
                return roleChilds.advertiserList;
            }else if(role.roleName == this._config.roles.publisher.name){
                return roleChilds.publisherList;
            }else if(role.roleName == this._config.roles.advMultipleRol.name){
                return roleChilds.advertiserList;
            }else if(role.roleName == this._config.roles.pubMultipleRol.name){
                return roleChilds.publisherList;
            }
        }
        return false;
    },
    getStates: function(){
        var states = this.getSelectedRole();
        return states.rolesUiStateItems;
    },
    getRoleMenu: function(){
        var role = this.getSelectedRole();
        if(role){
            return role.rolesUiStateItems;
        }
        return false;
    },
    getDefaultState: function(){
        var selectedRole = this.getSelectedRole();
        return selectedRole.rolesUiStateItems[0].Id;
    },
    getDefaultUrl: function(){
        var selectedRole = this.getSelectedRole();
        return selectedRole.rolesUiStateItems[0].url;
    },
    isSelectedRole: function(){
        if(!this.getSelectedRole()){
            return false;
        }
        return true;
    },
    setRoleWithChild: function(role, child){
        this.setSelectedRole(role);
        if(child && role.requiredData){
            if(role.roleName == this._config.roles.advertiser.name){
                this._advertiser.setAdvertiser(child);
            }else if(role.roleName == this._config.roles.publisher.name){
                this._publisher.setPublisher(child);
            }else if(role.roleName == this._config.roles.advMultipleRol.name){
                 this._advertiser.setAdvertiser(child);
            }else if(role.roleName == this._config.roles.pubMultipleRol.name){
                this._publisher.setPublisher(child);
            }
        }
        this._window.location = this.getDefaultUrl();
    },
    isAgencia: function(){
        if(this._config.roles.advertiser.name == this.getSelectedRoleName()){
            return true;
        }
        return false;
    },
    isVendedor: function(){
        if(this._config.roles.publisher.name == this.getSelectedRoleName()){
            return true;
        }
        return false;
    },
    isAgente: function(){
        if(this._config.roles.advExecutive.name == this.getSelectedRoleName()){
            return true;
        }
        return false;
    },
    isDesarrolladora: function(){
        if(this._config.roles.pubExecutive.name == this.getSelectedRoleName()){
            return true;
        }
        return false;
    },
    checkActionPermission: function(action){
        var actionPersmissions = this._state.current.customParameters.actionPermissions;
        if(actionPersmissions){
            var result = _.find(actionPersmissions, { 'id': action });
            if(_.find(actionPersmissions, { 'id': action })){
                return true;
            }
        }
        return false;
    }
});
(function(){
    awApp
        .service("RoleService", function(SessionService, probnsConf, UtilsService, UserService, StatesService, AdvertiserService, PublisherService, $window, $state){
            return new RoleService(SessionService, probnsConf, UtilsService, UserService, StatesService, AdvertiserService, PublisherService, $window, $state);
        })
}());
