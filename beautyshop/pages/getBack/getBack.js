var Util = require('../../utils/util.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    password:"",
    code:"",
    usertel:"",
    is_show:false,
    is_diabled:false,
    yanzhengma:"获取验证码",
    verification_Code:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },
  return_getback: function (e) {
    wx.navigateTo({
      url: '/pages/upset_password/upset_password',
    })

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
  userTel: function (e) {
    var that = this;
    that.setData({
      usertel: e.detail.value,

    })

  },
  numTel: function (e) {
    var that = this;
    that.setData({
      code: e.detail.value,

    })

  },
  pwdWord: function (e) {
    var that = this;
    that.setData({
      password: e.detail.value,

    })

  },
  sendCode:function(e){
    var that = this;
    if (that.data.usertel == null || that.data.usertel==""){
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none',
        content: '手机号不能为空',
      })
      return
    } else if (!(/^1[34578]\d{9}$/.test(that.data.usertel))) {
      wx.showToast({
        title: '请输入正确号码',
        icon: 'none',
        content: '请输入正确号码',
      })
    }
   else {
    wx.request({
      url: app.globalData.url+'/tencent/sms',
      method: 'POST',
      data: Util.json2Form({
        phone: that.data.usertel,
        templateId: 217803
      }),
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {

        if (res.data == "-2") {
          wx.showToast({
            title: '当天可获取验证码次数已上限!',
            icon: 'none',
            duration: 1000
          })
        } else if (res.data =="-1") {
          wx.showToast({
            title: '系统繁忙，稍后再试',
            icon: 'none',
            duration: 1000
          })
        } else{
          that.setData({
            verification_Code:res.data
          })
          wx.showToast({
            title: '发送验证码成功',
           
            duration: 1000
          })
          var timeout = 60;
          var interval = setInterval(function () {
            that.setData({
              yanzhengma: timeout + "秒后再发送",
              is_diabled: true
            })
            timeout--;
            if (timeout == 0) {
              clearInterval(interval);
              that.setData({
                yanzhengma: "发送验证码",
                is_diabled: false
              })
              timeout = 60;
            }
          }, 1000);
        }
      }
    })
   }
  },
  updatePwd:function () {
    var that = this;
    var reg3 = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?![,\.#%'\+\*\-:;^_`]+$)[,\.#%'\+\*\-:;^_`0-9A-Za-z]{8,16}$/;
    if (that.data.usertel == null || that.data.usertel == "") {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none',
        content: '手机号不能为空',
      })
      return
    } else if (!(/^1[34578]\d{9}$/.test(that.data.usertel))) {
      wx.showToast({
        title: '请输入正确号码',
        icon: 'none',
        content: '请输入正确号码',
      })
      return
    } else if (that.data.verification_Code == null || that.data.verification_Code == "") {
      wx.showToast({
        title: '请获取验证码',
        icon: 'none',
        duration: 2000
      })
      return
    }else if (that.data.password=="") {
      wx.showToast({
        title: '请输入密码！！',
        icon: 'none',
        duration: 2000
      })
      return
    }else if (!(reg3.test(that.data.password))) {
      wx.showToast({
        title: '密码由8到16位的数字、字母或下划线组成！！',
        icon: 'none',
        duration: 2000
      })
      return
    }else if (that.data.verification_Code != that.data.code) {
      wx.showToast({
        title: '验证码不正确',
        icon: 'none',
        duration: 2000
      })
      return
    }
    

    wx.request({
      url: app.globalData.url+'/user/retrieveuserpassword',
      method: 'POST',
      data: Util.json2Form({
        passWord: that.data.password,
        Code: that.data.code,
        userTel: that.data.usertel
      }),
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {

        if (res.data >0) {
          wx.showToast({
            title: '修改成功',
            duration: 1000
          })
          wx.navigateTo({
            url: '/pages/login/login'
          })
        } else if (res.data == -1) {
          wx.showToast({
            title: '系统异常',
            icon: 'none',
            duration: 1000
          })
        } else if (res.data == -4) {
          wx.showToast({
            title: '用户未注册',
            icon: 'none',
            duration: 1000
          })
        }
      }
    })
  }
})