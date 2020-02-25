var Util = require('../../utils/util.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fenhong:"",
    zongFenhong:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: app.globalData.url + '/user/selFenhong',
      method: 'POST',
      data: Util.json2Form({
        uid: app.globalData.uid,
        time:1
      }),
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {

        that.setData({
          fenhong: res.data
        })
      }
    })

    wx.request({
      url: app.globalData.url + '/user/selFenhong',
      method: 'POST',
      data: Util.json2Form({
        uid: app.globalData.uid,
        time: 0
      }),
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {

        that.setData({
          zongFenhong: res.data
        })
      }
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
    
  }
})