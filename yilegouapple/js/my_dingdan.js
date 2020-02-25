var detail = null;
var dingdan_page;
var uid;
mui.init({
	swipeBack: true
});
var url_app=mui.app_url();
function getDefaultData() {
	return {
		items_fukuan: [], //列表信息流数据
		items_fahuo: [], //列表信息流数据
		items_shouhuo: [], //列表信息流数据
		items_pingjia: [], //列表信息流数据
		items_order_no: [], //列表信息流数据
		uid: ""
	}
};
var news = new Vue({
	el: '#content',
	data: getDefaultData(),
	methods: {
		resetData: function() { //重置数据
			Object.assign(this.$data, getDefaultData());
		}
	}
});
mui.plusReady(function() {
	var current = plus.webview.currentWebview();
	news.uid = current.data_id;
	$(".dingdan > div").eq(news.uid).show().siblings().hide();
	$(".dingdan_zhuangtai > li").eq(news.uid).children("p").addClass("active").siblings().removeClass("sanjiao");
	var local = window.localStorage;
	uid = local.getItem("uid");
	if(!uid) {
		plus.nativeUI.toast("当前未登录，请重新登录", {
			verticalAlign: "center"
		});
		return false;

	}
	switch(news.uid) {
		case "0":
			get_dingdan();
			break;
		case "1":
			get_dingdan_fahuo();
			break;
		case "2":
			get_dingdan_shouhuo();
			break;
		case "3":
			get_dingdan_pingjia();
			break;
		default:

	}
	detail = mui.preload({
		url: "detail_dingdan.html",
		id: "detail_dingdan"
	})
	dingdan_page = mui.preload({
		url: "daifukuan_dingdan_xiangqing.html",
		id: "daifukuan_dingdan_xiangqing"
	})
})
//获取未付款订单
function get_dingdan() {
	if(!uid) {
		plus.nativeUI.toast("当前未登录，请重新登录", {
			verticalAlign: "center"
		});
		return false;

	}
	var wd = plus.nativeUI.showWaiting();
	mui.getJSON(url_app+"NsOrder/selectnsOrderGoodsANDnsOrder?buyerId=" + uid + "&orderStatus=0", function(rsp) {
		var html = "";
		if(rsp && rsp.length > 0) {
			$.each(rsp, function(i, item) {
				html += "<div class='dingdan_list' id='fukuan' data-id=" + item.orderId + ">";
				html += "<div class='dingdan_biaohao'>";
				html += "<h1>订单编号<s>" + item.orderNo + "</s> </h1>";
				html += "<h2 class='fr'>待付款</h2>";
				html += "</div>";
				$.each(item.nsOrderGoods, function(i, list) {
					html += "<div class='dingdan_list_message' id='dingdan_list_fukuan' >";
					html += "<img src='" + list.goodsPicture + "'  />";
					html += "<div class='dingdan_all'>";
					html += "<div class='dingdan_top clearfix'>";
					html += "<h3>" + list.goodsName + "</h3>";
					html += "<h4>￥" + (list.price).toFixed(2) + "</h4>";
					html += "</div>";
					html += "<h5>" + item.shopName + "<s class='fr'>x" + list.num + "</s></h5>";
					html += "<h6>&nbsp;<b>" + list.skuName + "</b></h6>";
					html += "</div>";
					html += "</div>";
				})

				html += "<p class='dingdan_bottom'>";
				html += "<button id='pay' data-shopid='" + item.shopId + "' data-shipp='" + (item.shippingMoney).toFixed(2) + "' data-pay='" + (item.payMoney).toFixed(2) + "'>点击付款</button>";
				html += "</p></div>";
			})
			$(".item_fukuan_list").append(html);

		} else {
			$(".fukuan").show();
		}
		wd.close();
	});
}
//获取未发货订单
function get_dingdan_fahuo() {
	if(!uid) {
		plus.nativeUI.toast("当前未登录，请重新登录", {
			verticalAlign: "center"
		});
		return false;

	}
	var wd = plus.nativeUI.showWaiting();
	mui.getJSON(url_app+"NsOrder/selectnsOrderGoodsANDnsOrder?buyerId=" + uid + "&orderStatus=1", function(rsp) {
		var html = "";
		if(rsp && rsp.length > 0) {
			$.each(rsp, function(i, item) {
				html += "<div class='dingdan_list' id='fahuo' data-id='" + item.orderId + "'>";
				html += "<div class='dingdan_biaohao'>";
				html += "<h1>订单编号:<s>" + item.orderNo + "</s> </h1>";
				html += "<h2 class='fr'>待发货</h2>";
				html += "</div>";
				$.each(item.nsOrderGoods, function(i, list) {
					html += "<div class='dingdan_list_message' id='dingdan_list_message_detail' >";
					html += "<img src='" + list.goodsPicture + "' />";
					html += "<div class='dingdan_all'>";
					html += "<div class='dingdan_top clearfix'>";
					html += "<h3>" + list.goodsName + "</h3>";
					html += "<h4>￥" + (list.price).toFixed(2) + "</h4>";
					html += "</div>";
					html += "<h5>" + item.shopName + "<s class='fr'>x" + list.num + "</s></h5>";
					html += "<h6>&nbsp;<b>" + list.skuName + "</b></h6>";
					html += "</div>";
					html += "</div>";

				})
				html += "</div>";
			})
			$(".item_fahuo_list").append(html);
		} else {
			$(".fahuo").show();
		}
		wd.close();
	});
}
//获取待收货订单
function get_dingdan_shouhuo() {
	if(!uid) {
		plus.nativeUI.toast("当前未登录，请重新登录", {
			verticalAlign: "center"
		});
		return false;

	}
	var wd = plus.nativeUI.showWaiting();
	$.getJSON(url_app+"NsOrder/selectnsOrderGoodsANDnsOrder?buyerId=" + uid + "&orderStatus=2", function(rsp) {
		var html = "";
		if(rsp && rsp.length > 0) {
			$.each(rsp, function(i, item) {
				html += "<div class='dingdan_list' id='shouhuo' data-id='" + item.orderId + "'>";
				html += "<div class='dingdan_biaohao'>";
				html += "<h1>订单编号:<s>" + item.orderNo + "</s> </h1>";
				html += "<h2 class='fr'>已发货</h2>";
				html += "</div>";
				$.each(item.nsOrderGoods, function(i, list) {
					html += "<div class='dingdan_list_message' id='dingdan_list_message_detail' >";
					html += "<img src='" + list.goodsPicture + "' />";
					html += "<div class='dingdan_all'>";
					html += "<div class='dingdan_top clearfix'>";
					html += "<h3>" + list.goodsName + "</h3>";
					html += "<h4>￥" + (list.price).toFixed(2) + "</h4>";
					html += "</div>";
					html += "<h5>" + item.shopName + "<s class='fr'>x" + list.num + "</s></h5>";
					html += "<h6>&nbsp;<b>" + list.skuName + "</b></h6>";
					html += "</div>";
					html += "</div>";

				})
				html += "<p class='dingdan_bottom'>";
				html += "<button id='select_shipping' data-id='" + item.orderId + "'>查看物流</button>";
				html += "<button id='ok' shop-id=" + item.shopId + "  data-user_money=" + item.userPlatformMoney + "  data-money=" + item.payMoney + " data-orderId=" + item.orderId + ">确认收货</button>";

				html += "</p>";
				html += "</div>";
			})
			$(".item_shouhuo_list").append(html);
		} else {
			$(".shouhuo").show();
		}
		wd.close();
	});
}
//获取待评价的订单
function get_dingdan_pingjia() {
	if(!uid) {
		plus.nativeUI.toast("当前未登录，请重新登录", {
			verticalAlign: "center"
		});
		return false;

	}
	var wd = plus.nativeUI.showWaiting();
	mui.getJSON(url_app+"NsOrder/selnsOrderGoodsANDnsOrder?orderStatus=3&buyerId=" + uid + "&reviewStatus=0", function(rsp) {
		var html = "";
		if(rsp && rsp.length > 0) {
			$.each(rsp, function(i, item) {
				html += "<div class='dingdan_list' id='pingjia' data-number=" + item.orderNo + " data-id='" + item.orderId + "'>";
				html += "<div class='dingdan_biaohao'>";
				html += "<h1>订单编号:<s>" + item.orderNo + "</s> </h1>";
				html += "<h2 class='fr'>已完成</h2>";
				html += "</div>";
				$.each(item.nsOrderGoods, function(i, list) {
					html += "<div class='dingdan_list_message' id='dingdan_list_message_detail'>";
					html += "<img src='" + list.goodsPicture + "'/>";
					html += "<div class='dingdan_all'>";
					html += "<div class='dingdan_top clearfix'>";
					html += "<h3>" + list.goodsName + "</h3>";
					html += "<h4>￥" + (list.price).toFixed(2) + "</h4>";
					html += "</div>";
					html += "<h5>" + item.shopName + "<s class='fr'>x" + list.num + "</s></h5>";
					html += "<h6>&nbsp;<b>" + list.skuName + "</b></h6>";
					html += "</div>";
					html += "<h7 style='display:none'>" + list.shopId + "</h7>";
					html += "<h8 style='display:none'>" + list.goodsIdId + "</h8>";
					html += "</div>";

				})
				html += "<p class='dingdan_bottom'>";
				html += "<button id='evalution' order-id='" + item.orderId + "'>点击评价</button>";
				html += "</p>";
				html += "</div>";
			})
			$(".item_pingjia_list").append(html);
		} else {
			$(".pingjia").show();
		}
		wd.close();
	});
}
//支付
mui("body").on("tap", "#pay", function(evt) {
	var uid = window.localStorage.getItem("uid");
	if(!uid) {
		return;
	}
	mui.openWindow({
		url: "order/dingdan_pay.html",
		id: "dingdan_pay",
		extras: {
			order_id: $(this).parent(".dingdan_bottom").parent("#fukuan").attr("data-id"),
			shop_id: $(this).attr("data-shopid"),
			shippingMoney: $(this).attr("data-shipp"),
			produce_all_price: $(this).attr("data-pay"), //产品总价
			uid: uid
		}
	})
})
//完成收货
mui("body").on("tap", "#ok", function(evt) {
	var btnArray = ['取消', '确定'];

	var paymoney = $(this).attr("data-money");
	var shopId = $(this).attr("shop-id");
	var orderId = $(this).attr("data-orderId");
	var user_money = parseFloat($(this).attr("data-user_money")).toFixed(2);
	var all_money=parseFloat(paymoney)+parseFloat(user_money);
	mui.confirm('是否确认收到货', '依乐购', btnArray, function(e) {
		if(e.index == 1) {
			mui.getJSON(url_app+"NsOrder/updatestatus?shopId=" + shopId + "&orderId=" + orderId + "&money=" + all_money + "&status=3", function(rsp) {
				if(rsp > 0) {
					mui.toast("收货完成");
					$(".item_shouhuo_list").empty();
					get_dingdan_shouhuo();
				} else {
					mui.toast("请联系管理员");
				}
			})
		} else if(e.index == 0) {
			return;
		}
	})
})

//导航栏切换
mui(".dingdan_zhuangtai").on("tap", "li", function(evt) {
	$(".dingdan_zhuangtai > li").children("p").removeClass("active");
	$(this).children("p").addClass("active");
	var length = $(this).index();
	$(".dingdan > div").eq(length).show().siblings().hide();
	switch(length) {
		case 0:
			$(".item_fukuan_list").empty();
			$(".fukuan").hide();

			get_dingdan();
			break;
		case 1:
			$(".item_fahuo_list").empty();
			$(".fahuo").hide();
			get_dingdan_fahuo();
			break;
		case 2:
			$(".item_shouhuo_list").empty();
			$(".shouhuo").hide();
			get_dingdan_shouhuo();
			break;
		case 3:
			$(".item_pingjia_list").empty();

			$(".pingjia").hide();
			get_dingdan_pingjia();
			break;
		default:
			break;

	}
})
//跳转美容院订单
//mui("#xuanze_order").on("tap", "button", function(evt) {
//	var index_page = $(this).index();
//	if(index_page == 0) {
//		plus.webview.currentWebview().reload(true);
//	} else {
//		mui.openWindow({
//			url: "meirongyuan_order.html",
//			id: "meirongyuan_order",
//		})
//	}
//})

//订单详情
mui("body").on("tap", "#dingdan_list_message_detail", function(evt) {
	mui.fire(detail, 'produce', {
		orderId: $(this).parent(".dingdan_list").attr("data-id")
	});
	setTimeout(function() {
		detail.show("slide-in-right", 300);
	}, 150);
})

//待付款页面详情
mui("body").on("tap", "#dingdan_list_fukuan", function(evt) {
	mui.fire(dingdan_page, 'dingdan_weifukuan', {
		order_id: $(this).parent(".dingdan_list").attr("data-id")
	});
	setTimeout(function() {
		dingdan_page.show("slide-in-right", 300);
	}, 150);
})

//评价
mui("body").on("tap", "#evalution", function(rsp) {
	mui.openWindow({
		url: "evaluate_goods_shop.html",
		id: "evaluate_goods_shop",
		extras: {
			orderId: $(this).attr("order-id")
		}
	})
})
//物流信息
mui(".item_shouhuo_list").on("tap", "#select_shipping", function(rsp) {
	mui.openWindow({
		url: "goods_logistics_information.html",
		id: "goods_logistics_information",
		extras: {
			orderId: $(this).attr("data-id")
		}
	})
})

//支付成功后刷新页面数据
window.addEventListener("refresh", function(e) {
	$(".item_fukuan_list").empty();
	$(".fukuan").hide();
	get_dingdan();
	var page = plus.webview.getWebviewById("pay_success");
	if(page) {
		page.close();
	}
})
window.addEventListener("canel_refresh", function(e) {
	$(".item_fahuo_list").empty();
	$(".fahuo").hide();
	get_dingdan_fahuo();
})
window.addEventListener("refresh_order", function(e) {
	$(".item_pingjia_list").empty();
	$(".pingjia").hide();
	get_dingdan_pingjia();
})

window.addEventListener("refresh_shouhuo", function(e) {
	$(".item_shouhuo_list").empty();
	$(".shouhuo").hide();
	get_dingdan_shouhuo();
})

function scroll() { // 开始封装自己的scrollTop
	if(window.pageYOffset != null) { // ie9+ 高版本浏览器
		// 因为 window.pageYOffset 默认的是  0  所以这里需要判断
		return {
			left: window.pageXOffset,
			top: window.pageYOffset
		}
	} else if(document.compatMode === "CSS1Compat") { // 标准浏览器   来判断有没有声明DTD
		return {
			left: document.documentElement.scrollLeft,
			top: document.documentElement.scrollTop
		}
	}
	return { // 未声明 DTD
		left: document.body.scrollLeft,
		top: document.body.scrollTop
	}
}

window.onload = function() {
	var top = document.getElementById("header");
	var main = document.getElementById("nav_all_order");

	var height1 = top.offsetHeight;
	var height2 = main.offsetHeight;
	var top_hegiht = height1 + height2;
	window.onscroll = function() {
		if(scroll().top > 0) {
			main.className += " fixed";
			main.style.marginTop = top.offsetHeight + "px";
		} else {
			main.className = "";
			main.style.marginTop = 0;
		}
	}
}