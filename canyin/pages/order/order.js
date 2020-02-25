const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
      selected: true,
      selected1: false,
      selected2: false,
      selected3: false,
      selected4: false,
    selected_meal: false,

      invoicegeren: [],
      order_list: [],
      order_list_one: [],
      order_list_two: [],
      order_list_three: [],
      order_list_four: [],
      city: "",
      longitude: "",
      latitude: "",
      hidden: false
  },

  scroll: function (event) {
    
  },
  refresh: function (event) {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    });
 
    wx.request({
      url: app.globalData.url + '/order/page',
      method: 'GET',
      data: {
        uid: app.globalData.uid,
        pageSize: 10
      },
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        that.setData({
          order_list: res.data,
           hidden: true
        })
        
      }
    })

  },
  selected: function (e) {
    var  that=this;
    // wx.request({
    //   url: app.globalData.url + '/order/page',
    //   method: 'GET',
    //   data: {
    //     uid: app.globalData.uid,
    //     pageSize: 10,
    //     pageNum: that.data.pageNum
    //   },
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   success: function (res) {
    //     that.setData({
    //       order_list: res.data.list
    //     })

    //   }
    // })
    that.setData({
      selected1: false,
      selected2: false,
      selected3: false,
      selected: true,
      selected4: false,
      selected_meal: false
    })

  },

  selected1: function (e) {
    var that = this;
    wx.request({
      url: app.globalData.url + '/order/page',
      method: 'GET',
      data: {
        uid: app.globalData.uid,
        status:1,
      },
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        that.setData({
          order_list_one: res.data
        })

      }
    })

    that.setData({

      selected1: true,
      selected2: false,
      selected3: false,
      selected: false,
      selected4: false,
      selected_meal: true
    })

  },
  selected2: function (e) {
    var that = this;
    wx.request({
      url: app.globalData.url + '/order/page',
      method: 'GET',
      data: {
        uid: app.globalData.uid,
        status: 2
      },
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {

        that.setData({
          order_list_one: res.data
        })

      }
    })
    that.setData({
      selected: false,
      selected1: false,
      selected3: false,
      selected2: true,
      selected4: false,
      selected_meal: true

    })

  },
  selected3: function (e) {
    var that = this;
    wx.request({
      url: app.globalData.url + '/order/page',
      method: 'GET',
      data: {
        uid: app.globalData.uid,
        status: 3,
        paegSize:50
      },
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        that.setData({
          order_list_one: res.data
        })

      }
    })
    that.setData({

      selected1: false,
      selected2: false,
      selected3: true,
      selected4: false,
      selected: false,
      selected_meal: true

    })

  },
  selected4: function (e) {
    var that = this;
    wx.request({
      url: app.globalData.url + '/order/page',
      method: 'GET',
      data: {
        uid: app.globalData.uid,
        status: -1,
        pageSize:50
      },
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        that.setData({
          order_list_one: res.data
        })

      }
    })
    that.setData({

      selected1: false,
      selected2: false,
      selected3: false,
      selected4: true,
      selected: false,
      selected_meal:true

    })

  },
  payment:function(e){
    wx.request({
      url: app.globalData.url + '/wechat/pay',
      method: "POST",
      data: {
        "openid": app.globalData.openId,
        "out_trade_no": e.currentTarget.dataset.out_trade_no,
        "money": 0.01,
        // "money": that.data.payMoney,
        "goodsName": "众友美食订单结算"
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        wx.requestPayment({
          timeStamp: res.data.timeStamp,
          nonceStr: res.data.nonceStr,
          package: res.data.package,
          signType: res.data.signType,
          paySign: res.data.paySign,
          success: function (res){

            wx.navigateTo({
              url: '/pages/succeed/succeed?out_trade_no=' + e.currentTarget.dataset.out_trade_no+ '&uId=' + app.globalData.uid + '',
            })

          },
          fail: function (res){
            wx.navigateBack({
              changed: true
            });
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

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // this.onLoad();
    
    var that = this;
    // that.setData({
    //   hidden:true
    // })
    // wx.request({
    //   url: app.globalData.url + '/order/page',
    //   method: 'GET',
    //   data: {
    //     uid: app.globalData.uid,
    //     pageSize: 10,
    //     pageNum: that.data.pageNum
    //   },
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   success: function (res) {
    //     that.setData({
    //       order_list: res.data.list,
    //       hidden: true
    //     })

    //   }
    // })
    // this.setData({
    //   selected1: false,
    //   selected2: false,
    //   selected3: false,
    //   selected: true,
    //   selected4: false,
    //   selected_meal: false
    // })
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