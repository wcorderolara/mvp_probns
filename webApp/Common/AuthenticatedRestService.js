var AuthenticatedRestService = SignedRestService.extend({
    _service: "",
    _config: "",
    _response: false,
    _url: "",
    _user: {},
    _parent: {},
    _utils: {},
    get:  function(url, params){
        return this._parent.get(url, this._getDefaultRequest(params));
    },
    post: function(url, params){
        return this._parent.post(url, this._getDefaultRequest(params));
    },
    put:  function(url, params){
        return this._parent.put(url, this._getDefaultRequest(params));
    },
    /*postFile: function(url, params, file){
        var paramsTmp = angular.copy(params);
        params = this._getDefaultRequest({});
        angular.forEach(paramsTmp, function(value, key){
            params[key] = value;
        })
        return this._parent.postFile(url, params, file);
    },*/
    _getDefaultRequest: function(params){
        if(this._user.getSessionSecret()){
            var signature = this._encrypt.getHMac(this._getObjectJson(params), this._user.getSessionSecret());
            return {
                Request: params,
                RequestSignature: signature,
                SessionValue: this._user.getSessionId()
            }
        }
        return false;
    },
    _getObjectJson: function(params){
        var strReturn = "";
        if(typeof(params)=="object")
        {
            if(params instanceof Array)
            {
                strReturn="[";
                for(param in params){
                    if(strReturn!="[")
                    {
                        strReturn+=",";
                    }
                    strReturn+=this._getObjectJson(params[param]);
                }
                strReturn+="]";
            }else if(params instanceof Date){
                strReturn = this._utils.getAuthenticatedDate(params);
            }else{
                strReturn="{";
                for(param in params){
                    if(strReturn!="{")
                    {
                        strReturn+=",";
                    }
                    strReturn+="\""+param+"\":"+this._getObjectJson(params[param]);
                }
                strReturn+="}";
            }
        }
        else if(typeof(params)=="array")
        {
            strReturn="[";
            for(param in params){
                if(strReturn!="[")
                {
                    strReturn+=",";
                }
                strReturn+=this._getObjectJson(params[param]);
            }
            strReturn+="]";
        }
        else if(typeof params == "string")
        {

            strReturn="\""+params+"\"";
        }
        else
        {
            if(this._isFloat(params)){
                params = parseFloat(params);
            }
            else if(this._isInteger(params)){
                params = parseInt(params);
            }
            strReturn=params;
        }
        return strReturn;
    },
    _isInteger: function isInteger(x) { return Math.floor(x) === x; },
    _isFloat: function isFloat(x) { return !!(x % 1); }
});
(function (){
    var AuthenticatedRestServiceProvider = AuthenticatedRestService.extend({

        instance: new AuthenticatedRestService(),
        $get:['$http', 'probnsConf', function($http, probnsConf){
            this.instance._service = $http;
            this.instance._config = probnsConf;
            this.instance._url = probnsConf.api.url;
            return this.instance;
        }]
    });
    angular.module('Module.AuthenticatedRestService',[])
        .provider('AuthenticatedRestService',AuthenticatedRestServiceProvider)
        .run(function($http, UserService, AuthenticatedRestService, SignedRestService, UtilsService, EncryptService){
            AuthenticatedRestService._user = UserService;
            AuthenticatedRestService._parent = SignedRestService;
            AuthenticatedRestService._utils = UtilsService;
            AuthenticatedRestService._encrypt = EncryptService;
        });
}());
