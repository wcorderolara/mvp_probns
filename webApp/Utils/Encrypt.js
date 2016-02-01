var EncryptService = Class.extend({
    getHMac: function(params, key){
        var signature = CryptoJS.HmacSHA256(params, key);
        return CryptoJS.enc.Base64.stringify(signature);
    },
    getSHA256: function(param){
        var hash = CryptoJS.SHA256(param);
        return hash.toString(CryptoJS.enc.Base64);
    }

});
(function(){
    awApp
        .service("EncryptService", function(){
            return new EncryptService();
        })
}())
