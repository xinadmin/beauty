
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    meirongshiName:"",
    mid:"",
    id:"",
    meirongAddress:"",
    meirongTel:"",
    count:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: app.globalData.url +'/meirongshi/selectByUid',
      method: 'POST',
      data: Util.json2Form({
        Uid: app.globalData.uid
      }),
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        that.setData({
          meirongshiName: res.data.meirongshi_name,
          mid: res.data.mid,
          id: res.data.meirongshi_shopid
        })
       
        wx.request({
          
          url: app.globalData.url + '/meirongyuan/meirongyuanInfo?id=' + that.data.id + '',
          method: 'GET',

          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          success: function (res) {
           
            that.setData({
              meirongAddress: res.data.meirongyuan_address,
              meirongTel: res.data.meirongyuan_tel
            })

          }
        })
        wx.request({
          url: app.globalData.url + '/yuyue/selCount',
          method: 'POST',
          data: Util.json2Form({
            meirongshiId: that.data.mid
          }),
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          success: function (res) {

            that.setData({
              count: res.data
            })
            
          }
        })
      }
      
    })

    

 
  

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
  tel: function () {
    wx.makePhoneCall({ phoneNumber: this.data.meirongTel, })
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
var Util = require('../../utils/util.js');