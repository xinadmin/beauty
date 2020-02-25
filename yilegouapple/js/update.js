var wgtVer = null;
var url_app = mui.app_url();
var urllist = url_app + "updateversion"
mui.plusReady(function() { // 获取本地应用资源版本号
	plus.runtime.getProperty(plus.runtime.appid, function(inf) {
		wgtVer = inf.version;
		var ua = navigator.userAgent.toLowerCase();
		if(/iphone|ipad|ipod/.test(ua)) { //苹果手机            
			$.ajax({
				type: "get",
				url: url_app + "appleupdateversion", //获取当前上架APPStore版本信息
				data: {
					oldVersion: wgtVer //APP唯一标识ID
				},
				contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
				success: function(data) {
					if(data == "") {
						return;
					}
					var btnArray = ['否', '更新'];
					mui.confirm('发现新版本', '依乐购', btnArray, function(e) {
						if(e.index == 1) {
							plus.runtime.openURL(data);
							return;
						}
					})
				}
			});
		}
	});

});

function sleep(numberMillis) {
	var now = new Date();
	var exitTime = now.getTime() + numberMillis;
	while(true) {
		now = new Date();
		if(now.getTime() > exitTime)
			return;
	}
}