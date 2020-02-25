$(function() {
	//加的效果
	$("#left li:first-child").addClass("active");
	var e;
	$(".add").click(function() {
		var n = $(this).prev().text();
		var num_menu1 = $(".num_menu1").text();
		var num_menu = $(".num_menu").text();
		var price_menu = $(".price_menu").text();
		var num;
		console.log(n);
		if (n == 0) {
			num = 1
		} else {
			num = parseFloat(n) + 1;
		}
		$(this).prev().text(num); //菜单数量显示加减
		$(".num_menu").text(++num_menu); //购物车数量
		$(".num_menu1").text(++num_menu1); //购物车数量
		$(".ad").prev().text(num);
		var parent = $(this).parent();
		var name = parent.parent().children("h4").text()
		var price = parseFloat(parent.prev().children("b:nth-child(2)").text());
		var src = $(this).parent().parent().prev().children()[0].src;
		var dataIcon = parent.parent().children("h4").attr("data-mid");
		console.log(name, price, src);
		if (price_menu == 0) {
			$(".price_menu").text(price);
		} else {
			$(".price_menu").text(parseFloat(price_menu) + parseFloat(price));

		}

		// 	$.ajax({
		//       url: app.globalData.url + '/carts/insert',
		//       method: 'GET',
		//       data: {
		//         "tId": dataIcon,
		//         "mId": event.target.dataset.id,
		//         "uId": app.globalData.uid,
		//         "bId":dataIcon,
		//         "num": 1
		//       },
		//       headers: {
		//         'content-type': 'application/x-www-form-urlencoded'
		//       },
		//       success: function(res) {
		//         if (res.data < 1) {
		//           wx.showToast({
		//             title: '添加失败，',
		//             icon: 'none',
		//             duration: 1000
		//           })
		//         }
		//       }
		// 
		//     })

	});
	// 减菜单数
	$(".minus").click(function() {
		var n = $(this).siblings(".num").text();
		var num_menu1 = $(".num_menu1").text();
		var num_menu = $(".num_menu").text();
		var price_menu = $(".price_menu").text();
		var num;
		console.log(n);


		var parent = $(this).parent();
		var name = parent.parent().children("h4").text()
		var price = parseFloat(parent.prev().children("b:nth-child(2)").text());
		var src = $(this).parent().parent().prev().children()[0].src;
		var dataIcon = parent.parent().children("h4").attr("data-mid");
		console.log(name, price, src);
		if (price_menu == 0) {
			$(".price_menu").text(0.00);
		} else {
			if (n == 0) {
				num = 0
			} else {
				num = parseFloat(n) - 1;
				$(".num_menu").text(--num_menu); //购物车数量
				$(".num_menu1").text(--num_menu1); //购物车数量
				$(".price_menu").text(parseFloat(price_menu) - parseFloat(price));
			}
		}
		$(this).siblings(".num").text(num); //菜单数量显示加减
	});
	//减的效果

	//选项卡
	$(".con>div").hide();
	$(".con>div:eq(0)").show();
	$(".left-menu li").click(function() {
		$(this).addClass("active").siblings().removeClass("active");
		var n = $(".left-menu li").index(this);
		$(".left-menu li").index(this);
		$(".con>div").hide();
		$(".con>div:eq(" + n + ")").show();
	});

});
