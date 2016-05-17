probnsApp.filter('customDate', function(){
	return function (dt){
		if(dt!=null){
			var _do = dt.substring(0,10);
			var dtt = _do.split('-');
			var newf = new Date(dtt[1] + '-' + dtt[2] + '-' + dtt[0]);
			return moment(newf).format('DD-MM-YYYY');
		}else{
			return "";
		}
	}
})