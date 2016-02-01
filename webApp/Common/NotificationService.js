var NotificationServices = BaseNotificationService.extend({
    _position: "top-right",
    _containter: "#notifications",
    _config: "",
    _toaster: {},
    _timer: 5000,
    _loadingMessage: "Loading...",
    init: function($alert,probnsConf,toaster){
        this.$alert = $alert;
        this._config = probnsConf;
        this._toaster = toaster;
        //this._notificationfx = notificationFx;
    },
    _show: function(params){
        var timer = this._timer;
        if(params.timer >= 0){
            timer = params.timer;
        }
        return this._toaster.pop(params.type, params.title, params.message, timer, 'trustedHtml');
    },
    help: function(){
     //   this._notificationfx.show();
    },
    clear: function(){
        this._toaster.clear();
    },
    success: function(params){
        params.type = 'success';
        this._show(params);
    },
    error: function(params){
        params.type = 'error'
        this._show(params);
    },
    info: function(params){
        params.type = 'note';
        this._show(params);
    },
    warning: function(params){
        params.type = 'warning';
        this._show(params);
    },
    wait: function(params){
        params.type = 'wait';
        return this._show(params);
    },
    loading: function(type, customMessage){
        var message = this._loadingMessage;
        var config = this._config.loading;
        if(customMessage){
            message = customMessage;
        }
        config.message = config.message.replace("{{message}}", message);
        if(type == "show"){
            $.blockUI(config);
        }else{
            $.unblockUI()
        }
    }
});
(function (){
    angular.module('Module.NotificationService',['toaster'])
        .service('NotificationService', function($alert, probnsConf, toaster){
            return new NotificationServices($alert, probnsConf, toaster);
        })
}());
