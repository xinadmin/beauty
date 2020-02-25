Page({

  /**
   * 页面的初始数据
   */
  data: {
    fuwu_time:"",
    meal_name:"",
    beautician_name: "",
    user_name:"",
    yuyue_body:"",
    fuwu:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.fuwu);
    this.setData({
      fuwu_time: options.fuwu_time,
      meal_name: options.meal_name,
      beautician_name: options.beautician_name,
      user_name: options.user_name,
      yuyue_body: options.yuyue_body,
      fuwu: options.fuwu
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