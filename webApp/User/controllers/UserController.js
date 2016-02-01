var UserController = BaseController.extend({
    _user: {},
    _state: {},
    _role: {},
    _session: {},
    _config: {},
    _roleModel: {},
    _isImpersonated: false,
    _impersonatedCompanyName: "",
    _CompanyName: "",
    _ContactEmail: "",
    _notification: {},
    _accountType: {},
    _accountId: {},
    init:function(scope, UserService, RoleService, state, SessionService, awConf, NotificationService){
        this._super(scope);
        this._user = UserService;
        this._state = state;
        this._role = RoleService;
        this._session = SessionService;
        this._config = awConf;
        this._notification = NotificationService;
        this._isImpersonated = this._session.get(this._config.security.isImpersonated);
        this._impersonatedCompanyName = this._session.get(this._config.security.accountCompanyName);
        this.topBar = this._config.templates.topBar;
        this.menu = this._config.templates.menu;
    },
    defineListeners: function(){
        this.$scope.$on("UPDATE_COMPANY_NAME_BY_PROFILE", angular.bind(this, function($scope, companyName){
            this._impersonatedCompanyName = companyName;
        }));
    },
    getUserName: function(){
        return this._user.getUserName();
    },
    getCompanyName: function(){
        return this._user.getCompanyName();
    },
    getContactEmail: function(){
        return this._user.getContactEmail();
    },
    isAuthenticated: function(){
        return this._user.isAuthenticated();
    },
    isSelectedRole: function(){
        return this._role.isSelectedRole();
    },
    logInAs: function(accountType, id){
        var currentRoles = this._role.getSelectedRole();
        this._session.set(this._config.security.executiveSession, currentRoles);
        this._session.set(this._config.security.isImpersonated, true);
        this._accountId = id;
        this._accountType = accountType;
        if (this._accountType == this._config.roles.publisher.name){
            this._user.getPublisherRoles(id).then(this._getRolesSuccess.bind(this));
        } else {
            this._user.getAdvertiserRoles(id).then(this._getRolesSuccess.bind(this));
        }
    },
    getExecutiveRoleDisplayName: function(){
        return this._role.getExecutiveRoleDisplayNameFromImpersonated();
    },
    logInBack: function(){
        this._notification.loading("show");
        var previousRoles = this._session.get(this._config.security.executiveSession);
        this._session.remove(this._config.security.isImpersonated);
        this._role.setRoleWithChild(previousRoles, null);
    },
    _getRolesSuccess: function(response){
        var newRoles = response.data;
        newRoles.requiredData = this._accountType == this._config.roles.advertiser.name ? "AdvertiserID" : "PublisherID";
        newRoles.roleName = this._accountType;
        var child = {
            companyName: newRoles.companyName
        };
        if(this._accountType == this._config.roles.advertiser.name){
            child.advertiserID = this._accountId;
        }else{
            child.publisherID = this._accountId;
        }
        this._session.set(this._config.security.accountCompanyName, newRoles.companyName);
        this._role.setRoleWithChild(newRoles, child);
    },
    isAdvertiser: function(){
        return this._role.isAdvertiser();
    },
    isPublisher: function(){
        return this._role.isPublisher();
    },
    isAdvExecutive: function(){
        return this._role.isAdvExecutive();
    },
    isPubExecutive: function(){
        return this._role.isPubExecutive();
    },
    isAdvMultiple: function(){
        return this._role.isAdvertiserMultipleRol();
    },
    isPubMultiple: function(){
        return this._role.isPublisherMultipleRol();
    }
});
UserController.$inject = ['$scope', 'UserService', 'RoleService', '$state', 'SessionService', 'awConf', 'NotificationService'];
