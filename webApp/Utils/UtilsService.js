var UtilsService = Class.extend({
    init: function(probnsConf){
        this._config = awConf;
    },
    base64_encode: function(probnsConf){
        var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
        var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
            ac = 0,
            enc = '',
            tmp_arr = [];

        if (!data) {
            return data;
        }

        do { // pack three octets into four hexets
            o1 = data.charCodeAt(i++);
            o2 = data.charCodeAt(i++);
            o3 = data.charCodeAt(i++);

            bits = o1 << 16 | o2 << 8 | o3;

            h1 = bits >> 18 & 0x3f;
            h2 = bits >> 12 & 0x3f;
            h3 = bits >> 6 & 0x3f;
            h4 = bits & 0x3f;

            // use hexets to index into b64, and append result to encoded string
            tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
        } while (i < data.length);
        enc = tmp_arr.join('');
        var r = data.length % 3;
        return (r ? enc.slice(0, r - 3) : enc) + '==='.slice(r || 3);
    },
    base64_decode: function(data){
        var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
        var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
            ac = 0,
            dec = '',
            tmp_arr = [];
        if (!data) {
            return data;
        }
        data += '';
        do { // unpack four hexets into three octets using index points in b64
            h1 = b64.indexOf(data.charAt(i++));
            h2 = b64.indexOf(data.charAt(i++));
            h3 = b64.indexOf(data.charAt(i++));
            h4 = b64.indexOf(data.charAt(i++));
            bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;
            o1 = bits >> 16 & 0xff;
            o2 = bits >> 8 & 0xff;
            o3 = bits & 0xff;
            if (h3 == 64) {
                tmp_arr[ac++] = String.fromCharCode(o1);
            } else if (h4 == 64) {
                tmp_arr[ac++] = String.fromCharCode(o1, o2);
            } else {
                tmp_arr[ac++] = String.fromCharCode(o1, o2, o3);
            }
        } while (i < data.length);
        dec = tmp_arr.join('');
        return dec.replace(/\0+$/, '');
    },
    fixDateData: function(data, offset){
        return (parseInt(data+offset) < 10)?"0"+parseInt(data+offset):parseInt(data+offset);
    },
    fixDateMilliSeconds: function(data){
        return (parseInt(data) < 10)?"00"+parseInt(data):((parseInt(data) < 100)?"0"+parseInt(data):parseInt(data));
    },
    getSignedDate: function(date){
        return date.getFullYear()+"-"+this.fixDateData(date.getMonth(), 1)+"-"+this.fixDateData(date.getDate(), 0)+"/"+this.fixDateData(date.getHours(), 0)+":"+this.fixDateData(date.getMinutes(), 0)+":"+this.fixDateData(date.getSeconds(), 0);
    },
    getAuthenticatedDate: function(date){
        return "\""+date.getUTCFullYear()+"-"+this.fixDateData(date.getUTCMonth(), 1)+"-"+this.fixDateData(date.getUTCDate(), 0)+"T"+this.fixDateData(date.getUTCHours(), 0)+":"+this.fixDateData(date.getUTCMinutes(), 0)+":"+this.fixDateData(date.getUTCSeconds(), 0)+"."+this.fixDateMilliSeconds(date.getMilliseconds())+"0000Z\"";
    },
    replaceAll: function(str, find, replace){
        return str.replace(new RegExp(find.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), replace);
    },
    getDate: function(){
        return new Date();
    },
    getIntegerDate: function(date){
        return date.getFullYear()+""+this.fixDateData(date.getMonth(), 1)+""+this.fixDateData(date.getDate(), 0);
    },
    addDaysToDate: function(date, days){
        var dateTmp = angular.copy(date);
        dateTmp.setDate(date.getDate()+days);
        return dateTmp;
    },
    subtractDaysToDate: function(date, days){
        var dateTmp = angular.copy(date);
        dateTmp.setDate(date.getDate()-days);
        return dateTmp;
    },
    substractMonthToDate: function(date, months){
        var dateTmp = angular.copy(date);
        dateTmp.setMonth(date.getMonth()-months);
        return dateTmp;
    },

    substractWeekIni: function(date){
        var day = date.getDay();
        return this.subtractDaysToDate(date,day+7);
    },
    substractWeekEnd: function(date){
        var day = date.getDay();
        return this.subtractDaysToDate(date,day+1);
    },
    subtractWeekToDate: function(date){
        var day = date.getDay();
        return this.subtractDaysToDate(date,day);
    },
    _numberFormat: function(value, n, x){
        var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
        if(value > 0){
            return value.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
        }
        return value;
    },
    getNumberFormat: function(value, decimal){
        var decimalPlaces = this._config.global.decimalPlaces;
        if(decimal){
            decimalPlaces = decimal;
        }
        var number = (value < 0)? "N/A": this._numberFormat(value, decimalPlaces, 3);
        return number;
    },
    getCurrencyFormat: function(value, decimals){
        return this._config.global.currencySymbol + this.getNumberFormat(value, decimals);
    },
    getPercentageFormat: function(value, multiplicator, decimal){
        var decimalPlaces = this._config.global.decimalPlaces;
        if(decimal){
            decimalPlaces = decimal;
        }
        var percentValue = parseFloat(value) * parseInt(multiplicator);
        return this.getNumberFormat(percentValue, decimalPlaces) + this._config.global.percentageSymbol;
    },
    setFormatValue: function(properties, item){
        if(properties.displayFormat == "currency"){
            return this.getCurrencyFormat(item, properties.decimalPlaces);
        }else if(properties.displayFormat == "number"){
            if(item == -1){
                return "N/A";
            }else if(item == -2){
                return "All";
            }else{
                return this.getNumberFormat(item, properties.decimalPlaces);
            }
        }else if(properties.displayFormat == "percentage"){
            return this.getPercentageFormat(item, 100, properties.decimalPlaces);
        }else{
            if(item == -1){
                return "N/A";
            }else if(item == -2){
                return "All";
            }else{
                return item;
            }
        }
    },
    getFormatDate: function(date){
        var aryTmp = date.split("T");
        date = aryTmp[0];
        aryTmp = date.split("-");
        return aryTmp[1]+"/"+aryTmp[2]+"/"+aryTmp[0];
    },
    getFormatDateWithHours: function(date){
        var aryTmp = date.split("T");
        var hours = aryTmp[1];
        date = aryTmp[0];
        aryTmp = date.split("-");
        return aryTmp[1]+"/"+aryTmp[2]+"/"+aryTmp[0]+":"+hours.substring(0,2)+":00 hrs.";
    },
    getHoursFromDate: function(date){
        var aryTmp = date.split("T");
        var hours = aryTmp[1];
        return hours.substring(0,2)+":00 hrs.";
    },
    getUrlVars : function(param){
        var vars = {};
        var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
            vars[key] = value;
        });
        return vars[param];
    },
    download: function(url, params, sessionSecret, sessionId){
        // Create a form
        var mapForm = document.createElement("form");
        mapForm.target = "_self";
        mapForm.method = "POST";
        mapForm.action = url;

        // Create an input
        var mapInput = document.createElement("input");
        mapInput.type = "hidden";
        mapInput.name = "Request";
        mapInput.value = JSON.stringify(params);
        // Add the input to the form
        mapForm.appendChild(mapInput);

        mapInput = document.createElement("input");
        mapInput.type = "hidden";
        mapInput.name = "sessionSecret";
        mapInput.value = sessionSecret;
        // Add the input to the form
        mapForm.appendChild(mapInput);

        mapInput = document.createElement("input");
        mapInput.type = "hidden";
        mapInput.name = "sessionValue";
        mapInput.value = sessionId;
        // Add the input to the form
        mapForm.appendChild(mapInput);

        // Add the form to dom
        document.body.appendChild(mapForm);

        // Just submit
        mapForm.submit();
        // Remove the form to dom
        document.body.removeChild(mapForm);
    },
    isAlphanumeric: function(text){
        if( /[^a-zA-Z0-9 +-_$]/.test( text ) || _.contains(text,"\\" )){
            return false;
        }
        return true;
    },
    isAlphanumericForURLEncoding: function(text){
        if( /[^a-zA-Z0-9% +-_$]/.test( text ) || _.contains(text,"\\" )){
            return false;
        }
        return true;
    },
    getObjectJson: function(params){
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
                    strReturn+=this.getObjectJson(params[param]);
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
                    strReturn+="\""+param+"\":"+this.getObjectJson(params[param]);
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
                strReturn+=this.getObjectJson(params[param]);
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
    _isFloat: function isFloat(x) { return !!(x % 1); },
    isEmpty: function(text){
        if (!text) return true;
        if (text.trim().length <= 0) return true;
        return false;
    },
    isPhoneNumber: function(text){
        var regex = /^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$/;
        return regex.test(text.trim());
    },
    isZipCode: function(text){
        var regex = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
        return regex.test(text.trim());
    },
    isEmail: function(text){
        var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(text.trim());
    }
});
(function(){
    awApp
        .service("UtilsService", function(probnsConf){
            return new UtilsService(probnsConf);
        })
}())
