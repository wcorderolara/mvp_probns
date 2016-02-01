var LogoutService = Class.extend({
    init: function(AuthenticatedRestService){
        this._service = AuthenticatedRestService;
    },
    logout: function(){
        return this._service.post("Logout", {});
    }
});
(function(){
    awApp
        .service("LogoutService", function(AuthenticatedRestService){
            return new LogoutService(AuthenticatedRestService);
        })
}())
