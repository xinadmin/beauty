const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order_list: [],
    order_id: "",
    beautician_name: "",
    yuyue_body: "",
    time: "",
    fuwu_meirongshi_id: "",
    fuwu: false,
    id: "",
    shop_id: "",
    fuwu_title: "",
    meirongyuan_tel: ""

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var fu = false
    var fuwu_title = "";
    console.log("hhh" + options.fuwu)
    if (options.fuwu == 0) {
      fuwu_title = "待约中"

    } else if (options.fuwu == 1) {
      fuwu_title = "预约成功"      
    } else if (options.fuwu == 2) {
      fuwu_title = "待签单"    
    } else if (options.fuwu == 3) {
      fuwu_title = "服务完成"
      fu = true
    } else {
      fuwu_title = "评价完成"    
    }

    that.setData({
      order_id: options.order_id,
      beautician_name: options.beautician_name,
      yuyue_body: options.yuyue_body,
      fuwu_meirongshi_id: options.fuwu_meirongshi_id,
      time: options.time,
      fuwu: fu,
      id: options.id,
      shop_id: options.shop_id,
      fuwu_title: fuwu_title
    })
    console.log(that.data.shop_id);
    wx.request({
      url: app.globalData.url + '/yuyue/selectByorderId?orderId=' + that.data.order_id + '',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        that.setData({
          yuyue_id: res.data.yuyue_id,
          meal_name: res.data.meal_name,
          shop_address: res.data.shop_address,
          shop_name: res.data.shop_name,
        })
        if (res.data.order_list_length != that.data.meal_number) {
          that.setData({
            is_show: true
          })
        }
      }

    })
    wx.request({
      url: app.globalData.url + '/meirongyuan/meirongyuanInfo?id=' + this.data.shop_id + '',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        that.setData({

          meirongyuan_tel: res.data.meirongyuan_tel,

        })
      },
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  tel: function() {
    wx.makePhoneCall({
      phoneNumber: this.data.meirongyuan_tel,
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },
  valuation: function() {
    var that = this;
    wx.navigateTo({
      url: '/pages/serviceValuation/serviceValuation?orderId=' + that.data.order_id + '&beautician_name=' + that.data.beautician_name + '&yuyue_body=' + that.data.yuyue_body + '&fuwu_meirongshi_id=' + that.data.fuwu_meirongshi_id + '&id=' + that.data.id + '',
    })
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