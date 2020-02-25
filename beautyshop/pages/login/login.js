const app = getApp();
var Util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: "",
    password: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var openId = app.globalData.openId;
    if (openId) {
      url: '/pages/index/index'
    } else {
      wx.login({
        //获取code
        success: function (res) {
          var code = res.code //返回code
          var d = that.globalData;//这里存储了appid、secret、token串  
          var l = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + app.globalData.appId + '&secret=' + app.globalData.secret + '&js_code=' + code + '&grant_type=authorization_code';
          wx.request({
            url: l,
            data: {},
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT  
            // header: {}, // 设置请求的 header  
            success: function (res) {
              app.globalData.openId = res.data.openid;

            }
          });
        }
      })
      var that = this;
      // 查看是否授权
      wx.getSetting({
        success: function (res) {
          if (res.authSetting['scope.getUserInfo']) {
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
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  return_getback: function (e) {
    wx.navigateTo({
      url: '/pages/upset_password/upset_password',
    })

  },
  username_input: function(e) {
    var that = this;
    that.setData({
      username: e.detail.value,

    })

  },
  password_input: function(e) {
    var that = this;
    that.setData({
      password: e.detail.value
    })
  },
  login_go: function() {
    var that = this;
    if (that.data.username == "" ) {
      wx.showToast({
        title: '请输入账号',
        icon: 'none',
        duration: 1000
      })
      return;
    } else if (that.data.password == ""){
      wx.showToast({
        title: '请输入密码',
        icon: 'none',
        duration: 1000
      })
      return;
    }
    wx.request({
      url: app.globalData.url+'/login/userlogin',
      method: 'POST',
      data: Util.json2Form({
        name: that.data.username,
        password: that.data.password
      }),
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res) {
       
        if (res.data == '-1') {
          wx.showToast({
            title: '账户不存在',
            icon: 'none',
            duration: 1000
          })
        } else if (res.data == '0') {
          wx.showToast({
            title: '密码不正确',
            icon: 'none',
            duration: 1000
          })
        } else if (res.data == '-2') {
          wx.showToast({
            title: '系统出现异常',
            icon: 'none',
            duration: 1000
          })
        }  else{
          app.globalData.uid = res.data.uid;
          app.globalData.username = res.data.user_name;
          app.globalData.userTel = res.data.user_tel;
          app.globalData.idcard = res.data.idcard;
         
          app.globalData.ismember = res.data.is_member;
          app.globalData.ismeirongshi = res.data.is_meirongshi;
          wx.switchTab({
             url: '/pages/index/index',

           })
        }

      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})