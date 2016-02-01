var SignedRestService = BaseService.extend({
    _service: "",
    _config: "",
    _response: false,
    _url: "",
    _auth: {},
    _utils: {}
    //_upload: {},
    get:  function(url, params){
        return this._getHeaders().then(angular.bind(this, function(response){
            this._setHeaders(response.data);
            this._response = this._service({
                method: "GET",
                url: this._getRequestParams(url, params),
				timeout:3600000
            });
            return this._response;
        }));
    },
    getLocal: function(url){
        this._response = this._service({
            method: "GET",
            url: url,
			timeout:3600000
        });
        return this._response;
    },
    post: function(url, params){
        return this._getHeaders().then(angular.bind(this, function(response){
            this._setHeaders(response.data);
            this._response = this._service({
                method: "POST",
                url: this._url+url+"?"+this._config.api.format,
                data: params,
				timeout:3600000
            });
            return this._response;
        }));
    },
    put:  function(url, params){
        return this._getHeaders().then(angular.bind(this, function(response){
            this._setHeaders(response.data);
            this._response = this._service({
                method: "PUT",
                url: this._url+url+"?"+this._config.api.format,
                data: params,
				timeout:3600000
            });
            return this._response;
        }));
    },
    /*postFile: function(url, params, file){
        return this._getHeaders().then(angular.bind(this, function(response){
            this._setHeaders(response.data);
            this._response = this._upload.upload({
                method: "POST",
                url: this._url+url+"?"+this._config.api.format,
                data: params,
                file: file,
				timeout:3600000
            });
            return this._response;
        }));
    },*/
    _getRequestParams: function(url, params){
        var strRequest = "";
        for(param in params){
            strRequest += "&"+param+"="+this._getObjectJson(params[param]);
        }
        strRequest = this._url+url+"?"+this._config.api.format+strRequest;
        return strRequest;
    },
    _getObjectJson: function(params){
        var strReturn = "";
        if(typeof(params)=="object")
        {
            strReturn="{";
            for(param in params){
                if(strReturn!="{")
                {
                    strReturn+=",";
                }
                 strReturn+=param+":"+this._getObjectJson(params[param]);
            }
            strReturn+="}";
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
        else
        {
            strReturn=this._encodeRequestData(params);
        }
        return strReturn;
    },
    _setHeaders: function(headers){
        this._service.defaults.cache = false;
        this._service.defaults.headers.common.awDate = headers.probnsDate;
        this._service.defaults.headers.common.awSharedSecret = headers.probnsSharedSecret;
        this._service.defaults.headers.common.awSignature = headers.probnsSignature;
        if(this._user.isAuthenticated()){
            this._service.defaults.headers.common.user = this._user.getUserName();
        }
    },
    _getHeaders: function(){
        return this.getLocal("/php/signature.php");
    },
    _encodeRequestData: function(data){
        if(typeof data == "string"){
            data = this._utils.replaceAll(data, "+", "%2B");
        }
        return data;
    }
});
(function (){
    var RestServiceProvider = SignedRestService.extend({

        instance: new SignedRestService(),
        $get:['$http', 'probnsConf', function($http, probnsConf){
            this.instance._service = $http;
            this.instance._config = probnsConf;
            this.instance._url = probnsConf.api.url;
            return this.instance;
        }]
    });
    angular.module('Module.SignedRestService',[])
        .provider('SignedRestService',RestServiceProvider)
        .run(function($http, SignedRestService, UtilsService, EncryptService, UserService){
            SignedRestService._utils = UtilsService;
            SignedRestService._encrypt = EncryptService;
            //SignedRestService._upload = $upload;
            SignedRestService._user = UserService;
        });
}());
