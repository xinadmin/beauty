var webview_pingjia = null;
var webview_shop = null;
var webview_xiadan = null;
var webview_car = null;
var local = window.localStorage;
var registerpage = null;
var int_day, int_hour, int_minute, int_second;
var inner = null;
mui.init({
	swipeBack: true
});
var url_app = mui.app_url();
mui.plusReady(function() {
	//预加载产品评价
	webview_pingjia = plus.webview.getWebviewById("goods_evalution");
	webview_xiadan = plus.webview.getWebviewById("kedui_dingdan");
	webview_car = plus.webview.getWebviewById("gouwuche");
	webview_shop = plus.webview.getWebviewById("shop");
	registerpage = plus.webview.getWebviewById("login");
	if(!registerpage) {
		registerpage = mui.preload({
			"id": "login",
			"url": "/login/login.html"
		});
	}

	var self = plus.webview.currentWebview();
	self.addEventListener("hide", function(e) {
		clearTimeout(inner);
		$("#hour").text("00");
		$("#minuter").text("00");
		$("#miao").text("00");
		window.scrollTo(0, 0);
		vm.resetData();
		$("#number").val("1");
	}, false);
	self.setStyle({
		scrollIndicator: 'none'
	});

})

function getDefaultData() {
	return {
		goodsId: '',
		goodsName: '',
		shopId: '',
		shopName: '',
		shopLogo:"",
		marketPrice: "", //市场价
		price: "", //原价
		promotionPrice: "", //促销价
		costPrice: "", //成本价
		shippingFee: "", //运费
		stock: "", //库存
		sales: "", //销售量
		collects: "", //收藏数量
		picture: "", //主图
		evaluates: "", //评价数
		introduction: "", //商品简介
		description: "", //商品详情
		goodsImages: "", //轮播图
		pic_item: "",
		specification: "",
		spection: [],
		produce_canshu: "请选择产品:",
		spec_true: false,
		phone: "",
		pic: [],
		goods_number: "0",
		spe: "",
		pointExchange: "",
		is_show: true,
		sales_title: "",
		qinggou_price: 0,
		is_qianggou: false,
		is_buy: false,
		time: 0,
		endtime: 0,
		time_title: "距离开始",
		buy_title: "即将开始",
		is_qianggou_title: "抢购已结束",
		promotionPricess: 0,
		address:"",
		rushbuyid:"",
			collection_is :false,
		collection_title : "收藏宝贝"
	}
}
var vm = new Vue({
	el: '#mui-content',
	data: getDefaultData(),
	methods: {
		resetData: function() { //重置数据
			Object.assign(this.$data, getDefaultData());
		}
	},
	updated: function() {
		var sliderMuiObj = mui("#slider");
		sliderMuiObj.slider({
			interval: 3000
		});
	},
});
//商品属性传值
window.addEventListener('get_detail', function(event) {
	if($(".chanpin_jieshao_bg").css("display") === "block") {
		closeguigepage();
	}
	$(".mui-slider-group").empty("li");
	$(".mui-slider-indicator").empty("div");
	vm.goodsId = event.detail.goodsId;
	if(!vm.goodsId) {
		return;
		mui.toast("当前产品不存在");
		mui.back();
	}
	var hour = document.getElementById("hour");
	var minuter = document.getElementById("minuter");
	var miao = document.getElementById("miao");
	var myDate = new Date();
	var time = event.detail.time;
	if(time >= 14) {
		if(time>=20 ){
		var endtime = 00;
	   }else {
	   	var endtime = 20;
	   }
	} else {
		var endtime = parseInt(time) + 2;
	}
	if(time < 16) {
		if(time > myDate.getHours()) {
			vm.time_title = "距开始还剩";
			vm.buy_title = "还没开始";
			vm.is_qianggou_title = "抢购未开始";
			vm.is_buy = false;
			vm.is_qianggou = true;
			count_down(time);
		} else if(time <= myDate.getHours() && myDate.getHours() < endtime) {
			vm.time_title = "距结束还剩";
			vm.is_buy = true;
			vm.is_qianggou = false;
			count_down(endtime)
		} else if(myDate.getHours() >= endtime) {
			vm.time_title = "抢购结束";
			vm.buy_title = "抢购结束";
			vm.is_buy = false;
			vm.is_qianggou = true;
		}
	} else {
		if(time > myDate.getHours()) {
			vm.time_title = "距开始还剩";
			vm.buy_title = "还没开始";
			vm.is_qianggou = true;
			vm.is_buy = false;
			count_down(time)
		} else {
			vm.time_title = "距结束还剩";
			vm.buy_title = "";
			vm.is_qianggou = false;
			vm.is_buy = true;
			count_down(endtime);

		}
	}
	vm.qinggou_price = event.detail.price;
	$("#number").val("1");
	if(event.detail.rushbuyid) {
		 vm.rushbuyid=event.detail.rushbuyid;
		 vm.sales_title = "限量剩余" + event.detail.stock;
	}
	var wd = plus.nativeUI.showWaiting();
	//加载商品
	mui.getJSON(url_app + "nsgoods/selectBygoodsId?goodsId=" + vm.goodsId + "", function(rsp) {
		vm.picture = rsp.picture; //主图
		vm.goodsName = rsp.goodsName;
		vm.shopId = rsp.shopId;
		vm.shopName = rsp.shopName;
		vm.marketPrice = rsp.marketPrice; //市场价
		vm.price = rsp.price; //原价
		vm.address=rsp.address;
		if(vm.is_buy) {
			vm.promotionPrice = vm.qinggou_price;
			vm.promotionPricess = rsp.promotionPrice.toFixed(2); //促销价

		} else {
			vm.promotionPrice = rsp.promotionPrice.toFixed(2); //促销价
			vm.promotionPricess = rsp.promotionPrice.toFixed(2); //促销价
			vm.qinggou_price = vm.promotionPrice;

		}
		vm.shippingFee = rsp.shippingFee.toFixed(2); //运费
		vm.stock = rsp.stock; //库存
		vm.sales = rsp.sales; //销售量
		vm.collects = rsp.collects; //收藏数量
		vm.evaluates = rsp.evaluates; //评价数
		vm.description = rsp.description;
		vm.introduction = rsp.introduction; //商品简介
		vm.description = rsp.description; //商品详情
		vm.specification = rsp.specification;
		vm.costPrice = rsp.costPrice;
		vm.pointExchange = rsp.pointExchange;
		over(rsp.goodsImages);

		mui.getJSON(url_app + "NsSpecification/selgoodsId?goodsId=" + vm.goodsId + "", function(rsp) {
			if(rsp && rsp.length > 0) {
				vm.spec_true = true;
				vm.spection = vm.spection.concat(specty(rsp));
				$(".sys_spec_text").show();
			} else {
				$(".sys_spec_text").hide();
			}
		})
		mui.get(url_app + "NsGoodsEvaluate/selectpraise?goodsId=" + vm.goodsId + "", function(rsp) {
			$(".chanpin_jieshao_pingjia").html(rsp);
		})
	    mui.getJSON(url_app + "shop/selBusinessInformation?shopId=" + vm.shopId + "", function(rsp) {
			vm.shopLogo = rsp.shopLogo;
			if(rsp.shopQq != null || rsp.shopQq != "") {
				vm.phone = rsp.shopQq;
			} else {
				vm.phone = "1764692358";
			}
		})
		mui.get(url_app + "nsgoods/selTJshopId?shopId=" + vm.shopId + "", function(rsp) {
			vm.goods_number = rsp;
			wd.close();
		})
		var collection_uid = local.getItem("uid");
			if(collection_uid) {
			mui.ajax({
				url: url_app + "SysUserFavorites/selConut",
				type: "get",
				data: {
					uid: collection_uid,
					shop_id: vm.shopId,
					fav_id: vm.goodsId,
					fav_type: "goods"

				},
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
				},
				success: function(data) {
					if(data > 0) {
						vm.collection_is = true;
						vm.collection_title = "取消收藏";
					} else {
						vm.collection_is = false;
					}
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					mui.toast("系统繁忙，稍后再试");
				}
			})
			}
		if(!webview_car) {
			webview_car = mui.preload({
				url: "gouwuche.html",
				id: "gouwuche"
			})
		}
		if(!webview_pingjia) {
			webview_pingjia = mui.preload({
				url: 'goods_evalution.html',
				id: 'goods_evalution'
			})
		}
		//预加载商家店铺
		if(!webview_shop) {
			webview_shop = mui.preload({
				url: '/shop/shop.html',
				id: 'shop'
			})
		}
		//预加载结算页面
		if(!webview_xiadan) {
			webview_xiadan = mui.preload({
				url: "/order/kedui_dingdan.html",
				id: "kedui_dingdan"
			})
		}
		//预加载我的购物车
		if(!webview_car) {
			webview_car = mui.preload({
				url: "gouwuche.html",
				id: "gouwuche"
			})
		}
	})
})
//倒计时
function count_down(obj) {
	var myDate = new Date();
	var item1 = myDate.getFullYear();
	var item2 = myDate.getMonth() + 1;
	var hournum = obj;
	if(hournum == "00") {
		var item3 = myDate.getDate() + 1;
	} else {
		var item3 = myDate.getDate();
	}
	var item4 = myDate.getHours();
	var item5 = myDate.getMinutes();
	var item6 = myDate.getSeconds();

	var myDate2 = new Date("" + item1 + "/" + item2 + "/" + item3 + " " + hournum + ":00:00");
	var time_distance = myDate2.getTime() - myDate.getTime();
	int_day = Math.floor(time_distance / 86400000)
	time_distance -= int_day * 86400000;
	int_hour = Math.floor(time_distance / 3600000)
	time_distance -= int_hour * 3600000;
	int_minute = Math.floor(time_distance / 60000)
	time_distance -= int_minute * 60000;
	int_second = Math.floor(time_distance / 1000)
	if(int_hour < 10)
		int_hour = "0" + int_hour;
	if(int_minute < 10)
		int_minute = "0" + int_minute;
	if(int_second < 10)
		int_second = "0" + int_second;

	hour.innerHTML = int_hour;

	minuter.innerHTML = int_minute;

	miao.innerHTML = int_second;
	inner = setTimeout("count_down(" + hournum + ")", 1000);
}
//遍历商品规格值
function specty(item) {
	var spection = [];
	var spe = "";
	item.forEach(function(items) {
		spe += items.specifications + " ," + " ";
		spection.push({
			id: items.id,
			style: items.style,
			unit: items.unit,
			stock: items.stock,
			specifications: items.specifications,
			price: items.price

		})
	})
	vm.spe = spe.slice(0, spe.length - 2);
	return spection;
}
//遍历商品轮播图
function over(item) {
	var items = item.split("&");
	var html = "";
	var html_dian = "";
	for(var i = 0; i < items.length; i++) {
		html += "<li class='mui-slider-item'><a href='#'>";
		html += "<img src='" + items[i] + "' data-preview-src='' data-preview-group='1'  width='90%' height='70%'  /></a></li>";
		if(i==0){
		html_dian += "<div class='mui-indicator mui-active'></div>"
			
		}else{
		html_dian += "<div class='mui-indicator'></div>"
	   }
		};

	$("#mui-slider-group").append(html);
	$("#mui-slider-indicator").append(html_dian);
	vm.is_show = false
}
//规格值选择
mui('body').on('tap', 'li', function() {
	$(".sys_spec_text > li").removeClass("selected");
	$(this).addClass("selected").siblings("li").removeClass("selected");
	if($(this).children("a").attr("title") == "" || $(this).children("a").attr("title") == null) {
		vm.produce_canshu = "请选择产品:";
	} else {
		vm.produce_canshu = "已选:" + $(this).children("a").attr("title");
		if(vm.is_qianggou) {
			if($(this).children("a").attr("num") != 0) {
				vm.stock = $(this).children("a").attr("num");
			}
			if($(this).children("a").attr("price") != null) {
				vm.promotionPrice = $(this).children("a").attr("price");

			}
		}
	}
})
//产品参数显示
document.getElementById('canshu').addEventListener('tap', function() {
	$(".chanpin_jieshao_canshu_content").show();
	$("html , body ").css({
		"height": "100%",
		"overflow": "hidden"
	});
})

//关闭参数页面
function closecanshupage() {
	$(".chanpin_jieshao_canshu_content").hide();
	$("html , body ").css({
		"overflow": "visible"
	});
}

//查看所有评价
mui("body").on("tap", "#all_evalutioon", function() {
	mui.fire(webview_pingjia, 'pingjia', {
		id: vm.goodsId, //产品id
		sid: vm.shopId //产品对于商家id
	});
	setTimeout(function() {
		webview_pingjia.show("slide-in-right", 300);
	}, 150);
});
//进入店铺
function go_shop(obj) {
	var $this=$(obj);
    var all=$this.attr("data-id");
	mui.fire(webview_shop, 'shop', {
		shopId: vm.shopId,
		shopName: vm.shopName,
		goodsNumber: vm.goods_number,
		all:all
	});
	setTimeout(function() {
		webview_shop.show("slide-in-right", 300);
	}, 150);
}
//收藏宝贝
function collection_goods() {
	var collection_uid = local.getItem("uid");
	if(!collection_uid) {
		return false;
	}
	mui.ajax({
		url: url_app + "SysUserFavorites/api/insertSelective",
		type: "POST",
		data: {
			uid: collection_uid,
			favId: vm.goodsId,
			favType: "",
			goodsName: vm.goodsName,
			shopId: vm.shopId,
			shopName: vm.shopName,
			shopLogo: vm.shopLogo,
			goodsImage: vm.picture,
			logPrice: vm.promotionPrice,
			collects: vm.collects,
			shopCollect: "0"
		},
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
		},
		success: function(data) {
			if(data > 0) {
				if(!vm.collection_is) {
					vm.collection_is = true;
					vm.collection_title = "取消收藏";
				} else {
					vm.collection_is = false;
					vm.collection_title = "收藏宝贝";
				}
			}else {
				mui.toast("系统繁忙，稍后再试");
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			mui.toast("系统繁忙，稍后再试");
		}
	})
}
//进入购物车
document.getElementById('gouwuche').addEventListener('tap', function() {
	var uid = window.localStorage.getItem("uid");
	if(!uid) {
		setTimeout(function() {
			registerpage.show("slide-in-right", 300);
		}, 150);
	} else {
		mui.fire(webview_car, 'gouwuche', null);
		setTimeout(function() {
			webview_car.show("slide-in-right", 300);
		}, 150);
	}
});
//显示加购界面
function addcart() {
	$(".chanpin_jieshao_bg").css("display", "block");
	$("html , body ").css({
		"height": "100%",
		"overflow": "hidden"
	});
	local.setItem("join", "1");
}
//显示购买界面
function spe_page() {
	$(".chanpin_jieshao_bg").css("display", "block");
	$("html , body ").css({
		"height": "100%",
		"overflow": "hidden"
	});
	local.removeItem("join");
}
function spe_page_one(obj) {
	var $this = $(obj);
	var title = $this.attr("data-title");
	mui.toast(title);
	//	vm.rubshbyid = "";
	//	$(".chanpin_jieshao_bg").css("display", "block");
	//	$("html , body ").css({
	//		"height": "100%",
	//		"overflow": "hidden"
	//	});
	//	local.removeItem("join");

}
//关闭产品规格选择弹窗
function closeguigepage() {
	$(".chanpin_jieshao_bg").css("display", "none");
	$("html , body ").css({
		"overflow": "visible"
	});
}
// 数量增减事件判断   
$("#jian").click(function() {
	if($("#number").val() <= 0) {
		$("#number").val("1");
	};
})

//加购物车或者立即购买
var wt = null;
document.getElementById('queding').addEventListener('tap', function() {
	var uid = window.localStorage.getItem("uid");
	var openid = window.localStorage.getItem("wxopenid");
	if(!uid) {
		var return_result = mui.tel_bangding(openid);
		if(return_result == 1) {
			return;
		} else {
			setTimeout(function() {
				registerpage.show("slide-in-right", 300);
			}, 150);
		}
	} else {
		if(wt) {
			return;
		}
		var select_length = $("body .sys_spec_text li.selected").length;
		if(vm.spec_true) {
			if(select_length < 1) {
				mui.toast("请选择商品规格");
				return;
			} else {
				var produce_canshu = vm.produce_canshu.substring(3);
			}
		} else {
			var produce_canshu = "常规";

		}
		var storage = window.localStorage;
		var uid = storage.getItem("uid");
		var produce_name = $("#produce_name").text();
		var produce_id = vm.goodsId;
		var produce_img = document.getElementById("produce_img").getAttribute("src")
		var produce_price = $(".sys_item_price").text();
		var produce_shuliang = $("#number").val();
		var produce_all_price = (parseFloat(produce_price) * parseFloat(produce_shuliang)).toFixed(2);
		var shop_name = $("#shop_name").text();
		var shop_id = vm.shopId;
		var join = storage.getItem("join"); //缓冲值进行判断是加购物车还是直接购买
		if(join == "1") { //如果有缓冲值，进行加购物车的处理

			wt = plus.nativeUI.showWaiting();
			mui.ajax({
				type: "POST",
				url: url_app + "NsCart/selbuyerIdANDgoodsIdANDshopId",
				async: true,
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
				},
				data: {
					buyerId: uid, //用户id
					goodsId: produce_id, //产品id
					goodsName: produce_name, //产品name
					goodsPicture: produce_img, //产品主图
					price: produce_price, //产品价格
					skuName: produce_canshu, //产品规格，如尺寸，颜色
					nums: produce_shuliang, //产品数量
					shopName: shop_name, //产品所属商家name
					shopId: shop_id //产品所属商家uid
				},
				timeout: 10000,
				success: function(data) {
					wt.close();
					wt = null;
					if(data === 1) {
						$(".chanpin_jieshao_bg").css("display", "none");
						$("html , body ").css({
							"overflow": "visible"
						});
						plus.nativeUI.toast("加购物车成功");
					} else {
						return false;
					}
				},
				error: function(xhr, type, errorThrown) {
					wt.close();
					wt = null;
					plus.nativeUI.toast("加购物车失败，请稍后再试");
				}
			})
		} else { //没有缓冲值，进行直接购买的处理
			
			mui.fire(webview_xiadan, 'xiadan', {
				produce_id: produce_id,
				produce_name: produce_name,
				produce_img: produce_img,
				produce_price: produce_price,
				produce_canshu: produce_canshu,
				produce_shuliang: produce_shuliang,
				shop_name: shop_name,
				shop_id: shop_id,
				produce_all_price: produce_all_price,
				shippingFee: vm.shippingFee,
				costPrice: vm.costPrice,
				pointExchange: vm.pointExchange,
				rushBuyId:vm.rushbuyid

			});
			setTimeout(function() {
				webview_xiadan.show("slide-in-right", 300);
			}, 150);

		}
	}
})
//联系商家
function openphone() {
	var phone = vm.phone;
		if(plus.os.name == "iOS") {
		plus.runtime.launchApplication({
			action: "mqq://im/chat?chat_type=wpa&uin="+phone+"&version=1&src_type=web"
		}, function(e) {
			plus.nativeUI.alert("检查到您未安装qq");
		});
	} else {
		if(plus.os.name == "Android") {
			var main = plus.android.runtimeMainActivity();
			var Intent = plus.android.importClass('android.content.Intent');
			var Uri = plus.android.importClass('android.net.Uri');
			var intent = new Intent(Intent.ACTION_VIEW, Uri.parse("mqqwpa://im/chat?chat_type=wpa&uin="+phone+""));
			main.startActivity(intent);
		}
}
}
mui.back = function() {
	var block = "block";
	if($(".chanpin_jieshao_canshu_content").css("display") === "block") {
		closecanshupage();
		$("html , body ").css({
			"overflow": "visible"
		});
		return;
	}
	if($(".chanpin_jieshao_bg").css("display") === "block") {
		closeguigepage();
		$("html , body ").css({
			"overflow": "visible"
		});
		return;
	}
	if($(".mui-slider-item").hasClass("mui-zoom-wrapper")) {
		mui.previewImage().close();
		return;

	}
	$(".mui-slider-group").empty("li");
	$(".mui-slider-indicator").empty("div");
	plus.webview.currentWebview().hide("auto", 300);
}
//window.addEventListener("refresh",function(evt){
//	plus.webview.getWebviewById("daifukuan_dingdan_xiangqing").hide(3000);
//})