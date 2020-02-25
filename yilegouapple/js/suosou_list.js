function qiehuan() {
	if($(".xuanze_bg").css("display") == "block") {
		$(this).hide();
	}
	var oLink = document.getElementById('link1').href;
	var oLink1 = document.getElementById('link1');

	var val = oLink.substring(oLink.indexOf("chanpin"));
	if(val == "chanpin_pailie_danlie.css") {
		$("body .original_price").hide();
//		$(".sales").hide();
		oLink1.href = 'css/chanpin_pailie_shuanglie.css';
		$(".img_pailie").attr('src', 'http://yiyun.zhonyou.cn/webapp_img/shuanghang.png');
	} else {
		$("body .original_price").show();
//		$(".sales").show();
		oLink1.href = "css/chanpin_pailie_danlie.css";
		$(".img_pailie").attr('src', 'http://yiyun.zhonyou.cn/webapp_img/danhang.png');

	}
}

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
	var top = document.getElementById("header_sousuo");
	var tiaojian = document.getElementById("tiaojian");
	var height1 = top.offsetHeight;
	window.onscroll = function() {
		if(scroll().top > height1) {
			tiaojian.className += " fixed";
			tiaojian.style.marginTop = top.offsetHeight + "px";
		} else {
			tiaojian.className = "";
			tiaojian.style.marginTop = 0;
		}
	}
}