var Util = require('../../utils/util.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mid:0,
    yuyue_meirongshiId:"",
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.mid)
    this.setData({
      mid: options.mid

    })
    console.log(options.mid)
    var that = this;
    wx.request({
      url: app.globalData.url+'/yuyue/selectBymrsId',
      method: 'POST',
      data: Util.json2Form({
        mrsId: that.data.mid
      }),
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {

        that.setData({
          list: res.data
        })
        console.log(res.data)

        
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
  querenFuwu:function(event){
    var that = this;
    wx.request({
      url: app.globalData.url +'/meirongorder/mrsclick',
      method: 'POST',
      data: Util.json2Form({
        yuyueId: event.currentTarget.dataset.yuyueid,
        mrsId: event.currentTarget.dataset.mid,
        money: event.currentTarget.dataset.mealprice,
        Num: event.currentTarget.dataset.mealnumber
      }),
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        if (res.data == 1) {
          wx.showToast({
            title: '预约确认成功',
            duration: 1000
          })

          that.onLoad(that.data)
          
        } else {
          wx.showToast({
            title: '系统繁忙，请稍后再试',
            duration: 1000
          })
          return false;
        }
      },
      error: function (xhr, type, errorThrown) {
        wd.close();
        wd = null;
        plus.nativeUI.toast("系统繁忙，稍后再试");
      }
    })
  },
  querenQiandan: function (event) {
    var that = this;
    wx.request({
      url: app.globalData.url +'/yuyue/beauticiansSignature',
      method: 'POST',
      data: Util.json2Form({
        id: event.currentTarget.dataset.yuyueid
      }),
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        if (res.data == 1) {
          wx.showToast({
            title: '预约确认成功',
            duration: 1000
          })

          that.onLoad(that.data)

        } else {
          wx.showToast({
            title: '系统繁忙，请稍后再试',
            duration: 1000
          })
          return false;
        }
      },
      error: function (xhr, type, errorThrown) {
        wd.close();
        wd = null;
        plus.nativeUI.toast("系统繁忙，稍后再试");
      }
    })
  }
})