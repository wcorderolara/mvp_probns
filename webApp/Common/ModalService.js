var ModalService = Class.extend({
    _animation: "",
    $modal: {},
    _config: {},
    _currentModal: {},
    _placement: "center",
    init: function($modal, probnsConf){
        this.$modal = $modal;
        this._config = probnsConf;
    },
    show: function(params){
         angular.element(".modal-dialog").css('maxWidth','2000px');
        if(!params.placement){
            params.placement = this._placement;
        }
        var paramsObj = {
            contentTemplate: params.template,
            placement: params.placement,
            container: "body",
            show: true,
        };
        if(params.backdrop){
            _.assign(paramsObj, { backdrop: 'static' });
        }
        if(params.modalTemplate){
            _.assign(paramsObj, { template: params.modalTemplate });
        }
        this._currentModal = this.$modal(paramsObj);
    },
    hide: function(){
        this._currentModal.hide();
    },
    hideByInstance: function(instance){
        instance.hide();
    },
    getInstance: function(){
        return this._currentModal;
    }
});
(function (){
    angular.module('Module.ModalService',[])
        .config(function($modalProvider){
            angular.extend($modalProvider.defaults,{
                animation: "am-flip-x"
            })
        })
        .service('ModalService', function($modal, probnsConf){
            return new ModalService($modal, probnsConf);
        })
}());
