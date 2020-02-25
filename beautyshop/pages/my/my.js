const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:"",
    logo:"",
    uid:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that =this;
    that.setData({
      username: app.globalData.username ,
      logo: app.globalData.logo 
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
  tel: function () {
    wx.makePhoneCall({ phoneNumber: "02022126878", })
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
  ,
  is_meirongshi:function(e) {
    var that=this;
    that.setData({
      is_meirongshi: app.globalData.ismeirongshi
     
    })
  
    if (that.data.is_meirongshi==0) {
      wx.showToast({
        title: '你当前不是美容师',
        icon: 'none',
        duration: 1000
      })
      return
    }else {
      wx.navigateTo({
        url: '/pages/my_beauty/my_beauty',
      })
    }
    
  }
})