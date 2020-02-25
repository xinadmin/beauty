const app = getApp();

Page({


  /**
   * 页面的初始数据
   */
  data: {
    beauty_list:[],
    longitude:"",
    latitude:"",
    shopAddress:"",
    hidden:false
  },
  hopSearch: function (e) {
    wx.navigateTo({
      url: '/pages/search/search'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    
    var that = this;
    that.setData({
      city: app.globalData.city,
      longitude: app.globalData.longitude,
      latitude: app.globalData.latitude
    })
    wx.request({
      url: app.globalData.url+'/meirongyuan/selectshopAddress?shopAddress=' + that.data.city + '&latitude=' + that.data.latitude + '6&longitude=' + that.data.longitude +'',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        that.setData({
          beauty_list: res.data,
          hidden:true
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