	var orderPage; //订单
	var yuyuePage;
	var loginpage;
	var my_meirongshi;
	var tel = null;
	var openid=null;
	var storage = window.localStorage;
	mui.init();
	var url_app = mui.app_url();

	var timer = null;
	var vm = new Vue({
		el: "#content",
		data: getDefaultData(),
		methods: {
			resetData: function() { //重置数据
				Object.assign(this.$data, getDefaultData());
			}
		},

	})

	function getDefaultData() {
		var storage = window.localStorage;
		var uid = storage.getItem("uid");
		var wxAccount=storage.getItem("wxAccount");
		if(uid){
			wxAccount="";
		}
		var user_name = storage.getItem("user_name");
		var user_tel = storage.getItem("user_tel");
		var is_member = storage.getItem("is_member");
		var is_meirongshi = storage.getItem("is_meirongshi");
		var is_shop = storage.getItem("is_shop");
		var belong_to = storage.getItem("belong_to");
		var person_code = storage.getItem("person_code");
		var yaoqing_code = storage.getItem("yaoqing_code");
		var idcard = storage.getItem("idcard");
		var openid = storage.getItem("openid");
		if(is_meirongshi == 0) {
			is_meirongshi = true;
			var my_meirongshi = false;

		} else {
			is_meirongshi = false;
			var my_meirongshi = true;
		}
		if(is_member == 0) {
			is_member = true
		} else {
			is_member = false
		}
		if(is_shop == 0) {
			is_shop = true
		} else {
			is_shop = false
		}

		return {
			uid: uid,
			user_name: user_name,
			point: '',
			balance: '',
			fenhong: '',
			is_member: is_member,
			is_meirongshi: is_meirongshi,
			is_shop: is_shop,
			my_meirongshi: my_meirongshi,
			user_tel: user_tel,
			person_code: person_code,
			yaoqing_code: yaoqing_code,
			idcard: idcard,
			service_charge: "",
			openid: openid,
			wxAccount:wxAccount

		}
	}
	mui.plusReady(function() {
		if(!vm.uid) {
			vm.point = 0;
			vm.balance = 0.00;
			vm.fenhong = 0.00;
			vm.service_charge = 0.00;
			//			登录预加载
			timer = setInterval('refreshQuery()', 1500);
			loginpage = plus.webview.getWebviewById("tab-webview-main.html");
			if(!loginpage) {
				loginpage = mui.preload({
					"id": 'login',
					"url": '/login/login.html'
				});
			}
		} else {
			check_zijin();
		}

		var self = plus.webview.currentWebview();
		self.setStyle({
			scrollIndicator: 'none'
		});
//		var authBtns = ['weixin']; //配置业务支持的第三方登录
//		var auths = {};
//		plus.oauth.getServices(function(services) {
//			for(var i in services) {
//				var service = services[i];
//				auths[service.id] = service;
//				if(~authBtns.indexOf(service.id)) {
//					var isInstalled = app.isInstalled(service.id);
//				}
//			}
//			document.getElementById("weixin_guanzhu").addEventListener("tap", function() {
//				var auth = auths["weixin"];
//				var waiting = plus.nativeUI.showWaiting();
//				var openid = vm.openid;
//				auth.login(function() {
//
//					if(openid == 0) {
//						plus.nativeUI.toast("授权成功");
//						auth.getUserInfo(function() {
//							plus.nativeUI.toast("获取用户信息成功");
//							var name = auth.userInfo.nickname || auth.userInfo.name;
//							var openid = auth.userInfo.openid;
//							mui.get(url_app+"SysUser/upduserOpenId?uid=" + vm.uid + "&openid= " + openid + "", function(rsp) {
//								if(rsp == 1) {
//									window.localStorage.setItem("openid", openid);
//									vm.openid = openid;
//									plus.nativeUI.toast("绑定微信成功");
//								} else {
//									plus.nativeUI.toast("绑定微信失败");
//
//								}
//								waiting.close();
//							})
//						}, function(e) {
//							waiting.close();
//							plus.nativeUI.toast("获取用户信息失败：" + e.message);
//						});
//					} else {
//						plus.nativeUI.toast("您当前已绑定微信账号");
//						waiting.close();
//						return;
//					}
//				}, function(e) {
//					waiting.close();
//					plus.nativeUI.toast("登录认证失败：" + e.message);
//				});
//			});
//		}, function(e) {
//			plus.nativeUI.toast("获取授权认证失败：" + e.message);
//		});
	})

	function refreshQuery() {
		tel = storage.getItem("userAccount");
		openid=storage.getItem("wxopenid");
		if(tel) {
			clearInterval(timer);
			check_zijin();
		}else if(openid){
			if(vm.id){
					storage.setItem("wxAccount", "");
			}
			clearInterval(timer);
			check_wxziliao();
		}
		else {
			return;
		}
	}
	function check_wxziliao() {
		mui.ajax(url_app+"weixin/selUserByWeixin", {
			type: 'post',
			dataType: 'json', //服务器返回json格式数据
			timeout: 10000, //15秒超时
			data: {
				openid: openid,
			},
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
			},
			success: function(rsp) {
				    if(rsp){
					storage.setItem("uid", rsp.uid);
					storage.setItem("user_name", rsp.userName);
					storage.setItem("user_tel", rsp.userTel);
					storage.setItem("is_member", rsp.isMember);
					storage.setItem("is_shop", rsp.isSystem);
					storage.setItem("idcard", rsp.idcard);
					storage.setItem("person_code", rsp.personCode);
					storage.setItem("yaoqing_code", rsp.yaoqingCode);
					storage.setItem("is_meirongshi", rsp.isMeirongshi);
						storage.setItem("wxAccount", "");
					if(rsp.openid == null) {
						storage.setItem("openid", 0);

					} else {
						storage.setItem("openid", rsp.openid);

					}
					
			        }
				    vm.resetData();
				    },
			error: function(xhr, type, errorThrown) {
				mui.toast('系统繁忙，稍后再试');
			}
		});

	}
	function check_zijin() {
		tel = storage.getItem("userAccount");
		if(!tel) {
			return false;
		}
		mui.ajax(url_app+"SysUser/selSysUserTJuserNameOruserTel", {
			type: 'post',
			dataType: 'json', //服务器返回json格式数据
			timeout: 10000, //15秒超时
			data: {
				userNameortel: tel,
			},
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
			},
			success: function(rsp) {
				$.each(rsp, function(i, item) {
					storage.setItem("uid", item.uid);
					storage.setItem("user_name", item.userName);
					storage.setItem("user_tel", item.userTel);
					storage.setItem("is_member", item.isMember);
					storage.setItem("is_shop", item.isSystem);
					storage.setItem("idcard", item.idcard);
					storage.setItem("person_code", item.personCode);
					storage.setItem("yaoqing_code", item.yaoqingCode);
					storage.setItem("is_meirongshi", item.isMeirongshi);
					if(item.openid == null) {
						storage.setItem("openid", 0);

					} else {
						storage.setItem("openid", item.openid);

					}

					vm.resetData();
				})
			},
			error: function(xhr, type, errorThrown) {
				mui.toast('系统繁忙456，稍后再试');
				//TODO 此处可以向服务端告警
			}
		});

	}

	//设置
	document.getElementById('upset').addEventListener('tap', function() {
		mui.openWindow({
			url: 'shezhi.html',
			id: 'shezhi'

		});
	});
	//分红提现
	function fenhong_tixian() {
		mui.openWindow({
			url: 'fenhong_tixian.html',
			id: 'fenhong_tixian'

		})
	}
	//我的订单
	mui('#dingdan').on('tap', '#huo', function(evt) {
		mui.openWindow({
			url: 'my_dingdan.html',
			id: 'my_dingdan',
			extras: {
				data_id: this.getAttribute("data-id") //切换id
			}
		})
	});
	//售后
	document.getElementById('shouhou').addEventListener('tap', function() {
		mui.openWindow({
			url: 'my_dingdan_shouhou.html',
			id: 'my_dingdan_shouhou',
			extras: {
				uid: vm.uid
			}
		})
	});
//	document.getElementById("meirongyuan_fuwu").addEventListener("tap", function() {
//		mui.openWindow({
//			url: "my_meirongyuan.html",
//			id: "my_meirongyuan"
//		})
//	})
	//新人邀请
	document.getElementById('xinren_yaoqing').addEventListener('tap', function() {
	var	uid = window.localStorage.getItem("uid");
	if(!uid) {
		plus.nativeUI.toast("当前未登录，请重新登录", {
			verticalAlign: "center"
		});
		return false;

	}
		mui.openWindow({
			url: 'yaoqing.html',
			id: 'yaoqing'
		});
	});
	//	我的资金
	function zijin_page() {
		mui.openWindow({
			url: 'my_zichan.html',
			id: 'my_zichan',
			extras: {
				point: vm.point,
				balance: vm.balance
			}
		});
	}
	//	我的收藏
	function collect_page() {
		mui.openWindow({
			url: 'my_collection.html',
			id: 'my_collection'
		});
	}
	//会员激活
	function openhuiyuan_jihuo() {
		mui.openWindow({
			url: 'shengji_huiyuan.html',
			id: 'shengji_huiyuan'
		});
	}
	//打开我的美容师
	function openmy_meirongshi() {
		var status = window.localStorage.getItem("is_meirongshi");
		if(!vm.uid) {
			plus.nativeUI.toast("当前用户未登录");
			return;
		} else if(status == null|| status==0) {
			mui.openWindow({
				url: 'meirongshi_xuzhi.html',
				id: 'meirongshi_xuzhi',
			})
		} else if(status==1) {
			mui.openWindow({
				url: 'meirongshi.html',
				id: 'meirongshi',
				extras: {
					uid: vm.uid
				}
			});
		}
	}
	//   商家 入驻
	function openshop_ruzhu() {
		mui.openWindow({
			url: '/shop/shop_zhuce_method.html',
			id: 'shop_zhuce_method'
		});
	}
	//	刷新
	document.addEventListener("refresh", function() {
		check_zijin();
	})

	function chongzhi() {
		mui.openWindow({
			url: "recharge.html",
			id: "recharge",
		})
	}    function open_phone () {
		plus.device.dial("02022126878", false);
	}
