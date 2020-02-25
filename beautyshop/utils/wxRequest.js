import {tips} from "./tip";


var http = '';

//var http = 'https://restapi.amap.com'

function wxRequest(url, data, callback) {
    wx.request({
        url: http + url,
        header: {
          'Content-Type': 'application/json',
          
        },
        method: 'GET',
        data: data,
        success(res) {
            if (res.statusCode == 200) {

                typeof callback == "function" && callback(res);

            } else if (res.statusCode == 401) {
                tips.confirm('登录失效，请重新登录！').then(
                    function (res) {
                        console.log('点击确认')
                        wx.navigateTo({
                            url: '/pages/login/login'
                        });
                    },
                    function() {
                        console.log('点击取消')
                    }
                );
            } else {
                tips.toast('系统繁忙', '', "none");

            }  //end if
            tips.loaded()
        },
        fail() {
            tips.toast('网络崩溃啦~', '', "none");
            tips.loaded();
        }
    })
}


//图片上传
function wxRequestUpload(filePath, userkey, callback) {
    wx.uploadFile({
        url: http + '/file/pic/upload.wx',
        filePath: filePath,
        name: 'file',
        header: {
            // 'Content-Type': 'application/x-www-form-urlencoded',
            'X-Requested-With': 'XMLHttpRequest',
            'userkey': userkey
        },
        method: 'POST',
        success(res) {
            if (res.statusCode == 200) {

                typeof callback == "function" && callback(res);

            } else if (res.statusCode == 401) {
                tips.confirm('登录失效，请重新登录！').then(
                    function (res) {
                        wx.navigateTo({
                            url: '/pages/login/login'
                        });
                    }
                );
            } else {
                tips.toast('系统繁忙', '', "none");
            }
            tips.loaded();
        },
        fail() {
            tips.toast('网络崩溃啦~', '', "none");
            tips.loaded();
        }
    });
}

// 高德地图请求接口
function mapApi(url,data,callback){
    wx.request({
        url: url,
        method: "POST",
        header: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        data: data,
        success:function(res){
            if (res.data.status == "1") {

                typeof callback == "function" && callback(res);

            } else {
                tips.toast('系统繁忙', '', "none");
            }
        },
        fail: function (res) {
            tips.toast('网络崩溃啦~', '', "none");
        }
    })
}
export {
    wxRequest,
    wxRequestUpload,
    mapApi,
}


