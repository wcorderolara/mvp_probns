var SessionService = Class.extend({
    _cookie: {},
    _config: "",
    _cookieRemove: {},
    _localStorage: {},
    set: function(key, value){
        if(key && value){
            this._localStorage.set(key, value);
            return true;
        }
        return false;
    },
    get: function(key){
        return this._localStorage.get(key);
    },
    remove: function(key){
        return this._localStorage.remove(key);
    },
    clearAll: function(){
        return this._localStorage.clearAll();
    }

});
(function (){
    var SessionServiceProvider = Class.extend({

        instance: new SessionService(),
        $get:['awConf', '$cookieStore', '$cookies', 'localStorageService', function(probnsConf, $cookieStore, $cookies, localStorageService){
            this.instance._cookie = $cookieStore;
            this.instance._cookieRemove = $cookies;
            this.instance._config = probnsConf;
            this.instance._localStorage = localStorageService;
            return this.instance;
        }]
    })

    angular.module('Module.SessionService',['ngCookies'])
        .provider('SessionService',SessionServiceProvider)
}());
