var webview_detail = null; //详情页webview
//var meirongyuan_page = null;
var login_page = null;
var goods_all_detail = null;
var Flag = true;
var show = 1;
var url_app = mui.app_url();
mui.init({
	gestureConfig: {
		swipe: true
	}
}); 
var slider = mui("#slider");                   
slider.slider({                       
	interval: 1000 //自动轮播周期，若为0则不自动播放，默认为0；
	                   
});

var news = new Vue({
	el: '.all_produce',
	data: {
		items: [], //列表信息流数据
		uid: "",
		pageNum: "",
		yagao: []
	}
});

mui.plusReady(function() {
    setTimeout(updateSerivces, 500);
//	mui.get(url_app + "nsgoods/selbannergoods", function(rsp) {
//		$("#slider").html(rsp);
//	});
	mui.getJSON(url_app + "nsgoods/selgoods?shopId=5", function(rsp) {
		if(rsp) {
			news.yagao = news.yagao.concat(convert_produce(rsp));
		} else {
			mui.toast("当前商品为空");

		}
	});
	webview_detail = plus.webview.getWebviewById("chanpin_xiangqing");
	if(!webview_detail) {
		webview_detail = mui.preload({
			url: 'chanpin_xiangqing.html',
			id: 'chanpin_xiangqing',
			styles: {
				popGesture: "close",
				titleNView: {
					autoBackButton: true,
					backgroundColor: '#f7f7f7',
					titleText: "产品详情",
					splitLine: {
						color: '#cccccc'
					},
					type: "transparent"
				},
				statusbar: {
					background: "#ddd"
				},
				show: {
					event: 'loaded'
				},
				waiting: {
					autoShow: true
				},

			}
		});
	}

	goods_all_detail = plus.webview.getWebviewById("goods_all");
	if(!goods_all_detail) {
		goods_all_detail = mui.preload({
			url: 'goods_all.html',
			id: 'goods_all'
		});
	}
	var self = plus.webview.currentWebview();
	self.setStyle({
		scrollIndicator: 'none'
	});
	login_page = mui.preload({
		url: '/login/login.html',
		id: 'login'
	});
	mui("body").on("tap", ".mui-slider-item", function(rsp) {
		if($(this).attr("data-id")) {
			mui.fire(webview_detail, 'get_detail', {
				goodsId: $(this).attr("data-id") //产品id

			});
			setTimeout(function() {
				webview_detail.show("slide-in-right", 300);
			}, 150);
		}
	})
//積分兌換
	
	mui("body").on("tap", ".point_bg", function(rsp) {
		mui.openWindow({
		url: 'point_change.html',
		id: 'point_change'
	});
	})
});
function updateSerivces(){
	plus.share.getServices(function(s){
		shares={};
		for(var i in s){
			var t=s[i];
			shares[t.id]=t;
		}
	}, function(e){
		mui.toast("微信分享获取失败");
	});
}
function launchMiniProgram(obj){
    var url_program=""; 
	if(!shares['weixin']){
		plus.nativeUI.toast('当前未安装微信');
		return;
	}
	var $this=$(obj);
	var value_class=$this.attr("class");
	if(value_class=="meirong") {
		url_program="gh_8d2bdf0ab60c";
	}else if (value_class=="canyin") {
		url_program="gh_117552326c0a";
	}else if (value_class=="yule") {
		url_program="gh_819c638d7438";
	}
	shares['weixin'].launchMiniProgram({
		id: url_program,		// 小程序原始ID
		type: 0.5									// 正式版
	});
}
function meirongyuan_fujin() {
	mui.openWindow({
		url:"meirongyuan_fujin.html",
		id:"meirongyuan_fujin"
	})
}
function pulluploading() {
	if(window.plus && plus.networkinfo.getCurrentType() === plus.networkinfo.CONNECTION_NONE) {
		plus.nativeUI.toast('似乎已断开与互联网的连接', {
			verticalAlign: 'bottom'
		});
		return;
	}
	if(!news.pageNum) {
		news.pageNum = 1
	} else {
		news.pageNum += 1;
	}
	//请求历史列表信息流
	mui.getJSON(url_app + "nsgoods/select?PageNum=" + news.pageNum + "&pageSize=10", function(rsp) {
		news.pageNum = rsp.pageNum;
		if(rsp.list && rsp.list.length > 0) {
			news.items = news.items.concat(convert_produce(rsp.list));
		} else {
			mui.toast("当前商品为空");

		}
	});
}
(function($) {
	$.ready(function() {
		//循环初始化所有下拉刷新，上拉加载。
		pulluploading();
		$("#chanpin_list").pullToRefresh({
			up: {
				callback: function() {
					var self = this;
					setTimeout(function() {
						pulluploading();
						self.endPullUpToRefresh();
					}, 1000);
				}
			}
		});

	});
})(mui);

function no_set() {
	mui.toast("敬请期待");
};


function open_produce_detail(item) {
	//触发子窗口产品详情
	if(!item.goodsId) {
		mui.toast("当前页面未加载完,请稍后");
		return false;
	}
	mui.fire(webview_detail, 'get_detail', {
		goodsId: item.goodsId, //产品id
		picture: item.picture //产品id

	});
	setTimeout(function() {
		webview_detail.show("slide-in-right", 300);
	}, 150);
}

function convert_produce(items) {
	var newItems = [];
	items.forEach(function(item) {
		newItems.push({
			goodsId: item.goodsId,
			goodsName: item.goodsName,
			price: (item.price).toFixed(2),
			picture: item.picture, //商品所有图片/
			promotionPrice: (item.promotionPrice).toFixed(2), //商品促销价格
			pointExchange: item.pointExchange,
			count_num: Math.ceil(Math.random() * 1000)

		});
	});
	return newItems;
}

function point_return() {
	mui.openWindow({
		url: 'point_change.html',
		id: 'point_change'
	});
}
//扫码
document.getElementById('saoma').addEventListener('tap', function() {
	mui.openWindow({
		url: 'barcode_scan.html',
		id: 'saoma'
	});
});
//搜素
document.getElementById('sousuo').addEventListener('tap', function() {
	mui.openWindow({
		url: 'sousuo.html',
		id: 'sousuo'
	});
});
//document.getElementById('meirong').addEventListener('tap', function() {
//	setTimeout(function() {
//		meirongyuan_page.show("slide-in-right", 300);
//	}, 150);
//});
document.getElementById('luye').addEventListener('tap', function() {
	mui.toast("敬请期待");
});
document.getElementById('huiyuanma').addEventListener('tap', function() {
	var uid = window.localStorage.getItem("uid");
	var first_one = false;
	if(!uid) {
		setTimeout(function() {
			login_page.show("slide-in-right", 300);
		}, 150);
	} else {
		if(!first_one) {
			var wd = plus.nativeUI.showWaiting();
			mui.ajax({
				url: "http://yiyun.zhonyou.cn/createQRCode/create",
				data: {
					uid: uid,
				},
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
				},
				type: "POST",
				timeout: 10000,
				success: function(data) {
					wd.close();
					wd = null;
					if(data != null) {
						first_one = true;
						$("#tanchuang_bg").attr("src", data);
						$(".eweima_tanchuan").show();
					}
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					wd.close();
					wd = null;
					mui.toast("系统繁忙，稍后再试");
				}
			})
		} else {
			$(".eweima_tanchuan").show();
		}
	}
})
document.getElementById('back').addEventListener('tap', function() {
	$(".eweima_tanchuan").hide();
	$("html , body ").css("overflow", "visible");
});

function change() {
	var d = new Date();
	var vYear = d.getFullYear();
	var vMon = d.getMonth() + 1;
	var vDay = d.getDate();
	var h = d.getHours();
	var m = d.getMinutes();
	var se = d.getSeconds();
	var ms = d.getMilliseconds();
	billno = "" + vYear + (vMon < 10 ? "0" + vMon : vMon) + (vDay < 10 ? "0" + vDay : vDay) + (h < 10 ? "0" + h : h) + (m < 10 ? "0" + m : m) + (se < 10 ? "0" + se : se) + ms;
	return billno;

};
//全部商品
function open_all_goods() {
	mui.fire(goods_all_detail, "goods_show", null);
	setTimeout(function() {
		goods_all_detail.show("slide-in-right", 300);
	}, 150);
}
//有好货
document.getElementById("youhaohuo").addEventListener("tap", function() {
	mui.openWindow({
		url: "youhaohuo.html",
		id: "youhaohuo"
	})
})
//限时抢购
document.getElementById("meizhuang").addEventListener("tap", function() {
	mui.openWindow({
		url: "rushbuy.html",
		id: "rushbuy"
	})
})
document.getElementById("bimaiqingdan").addEventListener("tap", function() {
	mui.openWindow({
		url: "bimaiqingdan.html",
		id: "bimaiqingdan"
	})
})
//爱逛街
document.getElementById("aiguanjie").addEventListener("tap", function() {
	mui.openWindow({
		url: "aiguangjie.html",
		id: "aiguanjie"
	})
})
document.getElementById("slide_nav").addEventListener("swipeleft", function() {
	$(this).animate({
		left: "-36%"
	}, "300");
})
document.getElementById("slide_nav").addEventListener("swiperight", function() {
	$(this).animate({
		left: "0%"
	}, "300");
})
var mui_old_back = mui.back;
var first = null;
mui.back = function() {
	var arr = location.href;
	if(arr.indexOf("index") > 0) {
		if($(".eweima_tanchuan").css("display") == "block") {
			$(".eweima_tanchuan").hide();
		} else {
			if(!first) {           
				first = new Date().getTime();           
				mui.toast('再按一次退出应用');           
				setTimeout(function() {             
					first = null;           
				}, 2000);         
			} else {           
				if(new Date().getTime() - first < 2000) {             
					plus.runtime.quit();           
				}         
			}
		}       
	}
}