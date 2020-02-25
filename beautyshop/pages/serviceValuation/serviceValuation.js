var Util = require('../../utils/util.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isChecked: false,
    isChecked_a: false,
    isChecked_b: false,
    isChecked_c: false,
    
    xian_a: true,
    xian_b: false,
    xian_c: true,
    xian_d: false,
    xian_e: true,
    xian_f: false,
    orderId:"",
    id:"",
    yuyueId: "",
    uid: "",
    shopId: "",
    shopName:"",
    userName: "",
    userTel: "",
    content: "",
    evaluationPicture: "",
    beauticianName: "",
    yuyueBody: "",
    fuwuMeirongshiId: "",
    evaluationType: "",
    serviceSelection:""
  },
  mang:function(e){
    this.setData({
      xian_b: true,
      xian_a: false,
      xian_c: true,
      xian_d: false,
      xian_e: true,
      xian_f: false,
      evaluationType:1
    })
  },
  bucuo: function (e) {
    this.setData({
      xian_b: false,
      xian_a: true,
      xian_c: false,
      xian_d: true,
      xian_e: true,
      xian_f: false,
      evaluationType:2
    })
  },
  cha: function (e) {
    this.setData({
      xian_b: false,
      xian_a: true,
      xian_c: true,
      xian_d: false,
      xian_e: false,
      xian_f: true,
      evaluationType:3
    })
  },


  serviceSelection:function(e) {
    this.setData({
      isChecked: true,
      serviceSelection: e.currentTarget.dataset.value
    })
  },
  serviceSelection_a: function (e) {
    this.setData({
      isChecked_a: true,
      serviceSelection: e.currentTarget.dataset.value
    })
  },
  serviceSelection_b: function (e) {
    this.setData({
      isChecked_b: true,
      serviceSelection: e.currentTarget.dataset.value
    })
  },
  serviceSelection_c: function (e) {
    this.setData({
      isChecked_c: true,
      serviceSelection: e.currentTarget.dataset.value
    })
  },
  pingjiaTxt: function (e) {
    var that = this;
    that.setData({
      content: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      orderId: options.orderId,
      beauticianName: options.beautician_name,
      yuyueBody: options.yuyue_body,
      fuwuMeirongshiId: options.fuwu_meirongshi_id,
      id:options.id
    })

    wx.request({
      url: app.globalData.url + '/yuyue/selectByid?yuyueId=' + that.data.orderId + '',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        
        that.setData({
          yuyueId: res.data.yuyue_id,
          uid: res.data.uid,
          shopId: res.data.shop_id,
          shopName: res.data.shop_name,
          userName: res.data.user_name,
          userTel: res.data.user_tel,
          evaluationPicture: res.data.meal_pic
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
    
  },
  insBeauty:function(){
    var that = this;
    if(that.data.evaluationType==""){
      wx.showToast({
        title: '请选择评价！！',
        icon: 'none',
        duration: 2000
      })
      return

    }
    if (that.data.serviceSelection == "") {
      wx.showToast({
        title: '请选择评价内容！！',
        icon: 'none',
        duration: 2000
      })
      return

    }
    if (that.data.content == "") {
      wx.showToast({
        title: '请输入评价内容！！',
        icon: 'none',
        duration: 2000
      })
      return

    }
    console.log(that.data.id+"服务")
    wx.request({
      url: app.globalData.url + '/yuyue_comment/insert',
      method: 'POST',
      data: Util.json2Form({
        id:that.data.id,
        yuyue_id: that.data.yuyueId,
        uid: app.globalData.uid,
        shop_id: that.data.shopId,
        shop_name: that.data.shopName,
        user_name: that.data.userName,
        user_tel: that.data.userTel,
        evaluation_content: that.data.serviceSelection+that.data.content,
        evaluation_picture: that.data.evaluationPicture,
        beautician_name: that.data.beauticianName,
        yuyue_body: that.data.yuyueBody,
        fuwu_meirongshi_id: that.data.fuwuMeirongshiId,
        evaluation_type: that.data.evaluationType
      }),
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {

        if (res.data<1) {
          wx.showToast({
            title: '评价失败',
            icon: 'none',
            duration: 2000
          })
        } else if (res.data == 1) {
          wx.showToast({
            title: '评价成功',
            duration: 2000
          })
          wx.navigateBack({ changed: true });
        }
      }
    })

  }
})