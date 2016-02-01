var UserService = Class.extend({
   _config: {},
   _session: {},
   _utils: {},
   _state: {},
   _api: {},
    init: function($state, SessionService, probnsConf, UtilsService, $window, AuthenticatedRestService){
        this._state = $state;
        this._config = probnsConf;
        this._session = SessionService;
        this._utils = UtilsService;
        this._window = $window;
        this._api = AuthenticatedRestService;
    },
    setLoggedUserInformation: function(param){
        param = this._utils.base64_encode(JSON.stringify(param));
        this._session.set(this._config.security.loggedUserInformation, param);
    },
    getLoggedUserInformation: function(){
        var session = this._session.get(this._config.security.loggedUserInformation);
        if(session){
            return JSON.parse(this._utils.base64_decode(session));
        }
        return false;
    },
    getSessionId: function(){
        if(this.isAuthenticated()){
            var session = this.getLoggedUserInformation();
            return session.sessionId;
        }
        return false;
    },
    getSessionSecret: function(){
        if(this.isAuthenticated()){
            var session = this.getLoggedUserInformation();
            return session.sessionSecret;
        }
        return false;
    },
    getUserName: function(){
        if(this.isAuthenticated()){
            var session = this.getLoggedUserInformation();
            return session.userName;
        }
        return false;
    },
    getCompanyName: function(){
        if(this.isAuthenticated()){
            var session = this.getLoggedUserInformation();
            return session.accountInformation.companyName;
        }
        return false;
    },
    getContactEmail: function(){
        if(this.isAuthenticated()){
            var session = this.getLoggedUserInformation();
            return session.accountInformation.contactEmail;
        }
        return false;
    },
    isAuthenticated: function(){
        if(!this.getLoggedUserInformation()){
            return false;
        }
        return true;
    },
    logout:function(){
        this._session.clearAll();
        this._state.transitionTo("login", {}, {reload: true});
        return true;
    },
    getPublisherRoles: function(publisher){
        return this._api.get("PublisherImpersonateData", { publisherID: publisher });
    },
    getAdvertiserRoles: function(advertiser){
        return this._api.get("AdvertiserImpersonateData", { advertiserID: advertiser });
    }
});
(function(){
    awApp
        .service("UserService", function($state, SessionService, probnsConf, UtilsService, $window, AuthenticatedRestService){
            return new UserService($state, SessionService, probnsConf, UtilsService, $window, AuthenticatedRestService);
        })
}());
