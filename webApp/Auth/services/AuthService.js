var AuthService = SignedRestService.extend({
    _apiService: "",
    _config: "",
    _session: {},
    init: function(SignedRestService, probnsConf){
        this._apiService = SignedRestService;
        this._config = probnsConf;
    },
    login:  function(params){
        return this._apiService.post("Login", params);
    }
});
(function (){
    awApp
        .service('AuthService', function(SignedRestService, probnsConf){
            return new AuthService(SignedRestService, probnsConf);
        });
}());
