var util = require('../../utils/common.js'); 
const app = getApp();
var today = util.getToday();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pay_money:"",
    meirongyuan_name: "",
    goods_name: "",
    out_trade_no: "",
    time:"",
    meirongyuan_logo:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var pay_money = options.pay_money;//价格
    var meirongyuan_name = options.meirongyuan_name; //商家名字
    var goods_name = options.goods_name;//商品名
    var out_trade_no = options.out_trade_no;//交易单号
    var meirongyuan_logo = options.meirongyuan_logo
    that.setData({
      pay_money: pay_money,
      meirongyuan_name: meirongyuan_name,
      goods_name: goods_name,
      out_trade_no: out_trade_no,
      time: today,
      meirongyuan_logo: meirongyuan_logo
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