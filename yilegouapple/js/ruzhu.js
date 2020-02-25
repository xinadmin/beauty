var map = new BMap.Map("container");  
        var localSearch = new BMap.LocalSearch(map);  
$(function() {
	//	  姓名验证
	$("#name").blur(function() {
		var reg1 = /[\u4e00-\u9fa5]/;
		if($("#name").val() == "" || $("#name").val() == "") {
			$(".error1").text("姓名不能为空");
			$(".error1").removeClass("none");
		} else if(!reg1.test($("#name").val())) {
			$(".error1").text("姓名要求为中文字符");
			$(".error1").removeClass("none");
		} else {
			console.log("填写格式成功");
		}
	})
	$("#name").focus(function() {
		$(".error1").addClass("none");
	})
	//		店铺名称验证
	$("#shop_name").blur(function() {
		if($("#shop_name").val() == "" || $("#shop_name").val() == null) {
			$(".error2").text("店铺名称不能位空");
			$(".error2").removeClass("none");
		}
	})
	$("#shop_name").focus(function() {
		$(".error2").addClass("none");
	})
	//		手机号码验证
	$("#tel").blur(function() {
		var reg = /^1[3|4|5|8][0-9]\d{4,8}$/;
		if($("#tel").val() == "" || $("#tel").val() == "") {
			$(".error3").text("手机号不能为空");
			$(".error3").removeClass("none");
		} else if($("#tel").val().length != 11) {
			$(".error3").text("填写11位的手机号码");
			$(".error3").removeClass("none");
		} else if(!reg.test($("#tel").val())) {
			$(".error3").text("填写正确的手机号码");
			$(".error3").removeClass("none");
		} else {
			console.log("填写格式成功");
		}
	})
	$("#tel").focus(function() {
		$(".error3").addClass("none");
	})
	//		邮箱验证
	$("#email").blur(function() {
		var reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
		if($("#email").val() == "" || $("#email").val() == "") {
			$(".error4").text("邮箱不能为空");
			$(".error4").removeClass("none");
		} else if(!reg.test($("#email").val())) {
			$(".error4").text("填写正确的邮箱");
			$(".error4").removeClass("none");
		}
	})
	$("#email").focus(function() {
		$(".error4").addClass("none");
	})
	//		地址验证
	$("#address").blur(function() {
		if($("#address").val() == null || $("#address").val() == "") {
			$(".error6").text("地址不能为空");
			$(".error6").removeClass("none");
		}
	})
	$("#address").focus(function() {
		if($("#diqu").text()==""){
			$(".error5").text("地区不能为空");
			$(".error5").removeClass("none");
		}
		$(".error6").addClass("none");
	})
	//密码获取焦点
	$("#pass").focus(function() {
		$(".error7").addClass("none");
	})
	$("#pass").blur(function() {
		var password = $("#pass").val();
		var reg2 = /(?!^\\d+$)(?!^[a-zA-Z]+$)(?!^[_#@]+$).{8,16}/;
		if(password == null || password == "") {
			$(".error7").text("密码不能为空");
			$(".error7").removeClass("none");
		} else if(password.length > 16 || password.length < 8) {
			$(".error7").text("密码长度为8到16位");
			$(".error7").removeClass("none");
		} else if(!reg2.test(password)) {
			$(".error7").text("密码必须由字母，数字，符号，任意两种组合");
			$(".error7").removeClass("none");
		} else {
			console.log("密码正确");
		}
	})
	//确认密码
	$("#repass").focus(function() {
		$(".error8").addClass("none");
	})
	$("#repass").blur(function() {
		var pass1 = $("#pass").val();
		var pass2 = $("#repass").val();
		if(pass2 == "" || pass2 == null) {
			$(".error8").text("密码不能为空");
			$(".error8").removeClass("none");
		}
		if(pass1 !== pass2) {
			$(".error8").text("密码俩次输入的不同");
			$(".error8").removeClass("none");
		} else {
			console.log("密码正确");
		}
	})
	$("#address").blur(function() {
	if($('#diqu').text()!=null||$('#diqu').text()!="") {
		if($("#address").val()!=null ||$("#address").val()!=""){
			var keyword=$('#diqu').text()+$("#address").val();
            localSearch.setSearchCompleteCallback(function(searchResult) {  
                var poi = searchResult.getPoi(0);  
                console.log(poi.point.lng + "," + poi.point.lat);
                $("#result_lng").text(poi.point.lng);  
                 $("#result_lat").text(poi.point.lat);
            });  
            localSearch.search(keyword);  
        }  
		}
	})
})
document.getElementById("switch").addEventListener("tap", function() {
			var aa = this.classList.contains('mui-active') ? '1' : '0';
			//			document.getElementById("zhuangtai").innerText = aa;
			if(aa == 1) {
				$("#meirongyuan_name").show();
			} else {
				$("#meirongyuan_name").hide();

			}
		})