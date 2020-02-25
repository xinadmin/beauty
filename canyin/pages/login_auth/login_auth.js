const app = getApp();
var obj={};
Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function () {
    var openId = app.globalData.openId;
      wx.login({
        //获取code
        success: function (res) {
          var code = res.code //返回code
          var l = app.globalData.url + '/wechat/getopenId?code=' + res.code;
          wx.request({
            url: l,
            data: {},
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT  
            // header: {}, // 设置请求的 header  
            success: function (res) {
              app.globalData.openId = res.data.openid;
              obj.session_key = res.data.session_key;
            }
          });
        }
      })
      var that = this;
      // 查看是否授权
      wx.getSetting({
        success: function (res) {
          if (res.authSetting['scope.getPhoneNumber']) {
            wx.getUserInfo({
              success: function (res) {
                //从数据库获取用户信息
                // that.queryUsreInfo();
                //用户已经授权过
                wx.switchTab({
                  url: '/pages/index/index'
                })
              }
            });
          }
        }
      })

    
  },
  
  getPhoneNumber: function (e) {
    if (e.detail.errMsg == "getPhoneNumber:ok"){
      wx.request({
        url: app.globalData.url + '/wechat/getphone',
        data: {
          encrypted: e.detail.encryptedData,
          session_key: obj.session_key,
          iv: e.detail.iv
        },
        success: function (res) {
          wx.request({
            url: app.globalData.url + '/user/selectByTel',
            data: {
              tel: res.data.phoneNumber
            },
            success: function (res) {
              app.globalData.uid = res.data.uid;
              app.globalData.username = res.data.userName;
              app.globalData.usertel = res.data.userTel;
              app.globalData.yaoqing_code = res.data.yaoqingCode
            }
          })
        }
      });
      //用户按了允许授权按钮
      var that = this;
      //插入登录的用户的相关信息到数据库
      //授权成功后，跳转进入小程序首页
      wx.switchTab({
        url: '/pages/index/index'
      })

        
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {

        }
      })
    }
  
  },
  //获取用户信息接口
  queryUsreInfo: function () {
    wx.request({
      url: getApp().globalData.urlPath + 'hstc_interface/queryByOpenid',
      data: {
        openid: getApp().globalData.openid
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        getApp().globalData.userInfo = res.data;
      }
    }) 
  },
   login_return :function () {
     wx.navigateTo({
       url: '/pages/login/login'
      
     })
   }
})
