var Util = require('../../utils/util.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:"",
    pwd:"",
    newpwd:"",
    querenpwd:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      username: app.globalData.username
    })
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
  return_getback:function(e) {
  wx.navigateTo({
    url: '/pages/getBack/getBack',
  })
 
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
  pwd: function (e) {
    var that = this;
    that.setData({
      pwd: e.detail.value,

    })

  },
  newPwd: function (e) {
    var that = this;
    that.setData({
      newpwd: e.detail.value,

    })

  },
  querenPwd: function (e) {
    var that = this;
    that.setData({
      querenpwd: e.detail.value,

    })

  },
  updatePwd:function(){
    var that = this;
    var reg3 = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?![,\.#%'\+\*\-:;^_`]+$)[,\.#%'\+\*\-:;^_`0-9A-Za-z]{8,16}$/;
    console.log(that.data.newpwd)
    if (that.data.pwd == null || that.data.pwd == "") {
      wx.showToast({
        title: '请输入原密码！',
        icon: 'none',
        duration: 2000
      })
      return
    } else if (!(reg3.test(that.data.newpwd))){
      wx.showToast({
        title: '密码由8到16位的数字、字母或下划线组成！！',
        icon: 'none',
        duration: 2000
      })
      return
    }else if (that.data.newpwd != that.data.querenpwd){
      wx.showToast({
        title: '两次输入的密码不一致',
        icon: 'none',
        duration: 2000
        
      })
      return
      
    }
   
    wx.request({
      url: app.globalData.url + '/user/updatePwd',
      method: 'POST',
      data: Util.json2Form({
        uid: app.globalData.uid,
        username: that.data.username,
        pwd: that.data.pwd,
        newpwd: that.data.newpwd
      }),
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {

        if (res.data == -1) {
          wx.showToast({
            title: '修改失败',
            icon: 'none',
            duration: 2000
          })
        } else if (res.data == 0) {
          wx.showToast({
            icon: 'none',
            title: '原密码输入错误',
            duration: 2000
          })
        } else if (res.data == 1){
          wx.showToast({
           
            title: '修改成功',
            duration: 2000
          })
          app.globalData.openId = '';
          app.globalData.ismember = '';
          app.globalData.ismeirongshi = '';
          app.globalData.uid = '';

          wx.reLaunch({
            url: '/pages/login_auth/login_auth'
          })

        }
      }
    })
  }
})