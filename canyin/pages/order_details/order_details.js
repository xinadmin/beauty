const app = getApp();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    array:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   var that=this;
    wx.request({
      url: app.globalData.url +'/order/selectByoId?oId='+options.oid,
      mehtod:'GET',
      data:{

      }, headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        
        if(res.data==-1){
          wx.showModal({
            title: '提示!',
            content: '系统出现异常，请退出重试！',
            showCancel: false,
            confirmColor: '#007aff',
            success: function (res) {

            }
          })
        }else{
          that.setData({
            array:res.data
          })
        }
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