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
    invoicegeren: [],
    order_list:[],
    order_list_one: [],
    order_list_two: [],
    order_list_three: [],
    order_list_four: [],
    city:"",
    longitude: "",
    latitude: "",

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var uid = app.globalData.uid;
    var url = app.globalData.url;
    that.setData({
      city: app.globalData.city,
      longitude: app.globalData.longitude,
      latitude: app.globalData.latitude
    })
    wx.request({
      url: url+'/meirongorder/selOrder?buyer_id='+uid+'',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        if(res.data!=null){
        that.setData({
          order_list: res.data
        })
        }
      }

    })
    
    wx.request({
      url: url +'/meirongorder/selOrder?buyer_id='+uid+'&shipping_type=1&order_status=1',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
     
        that.setData({
          order_list_one: res.data
        })

      }

    })
    wx.request({
      url: url +'/meirongorder/selOrder?buyer_id='+uid+'&order_status=0',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        
        that.setData({
          order_list_two: res.data
        })

      }

    })
    wx.request({
      url: url +'/meirongorder/selOrder?buyer_id='+uid+'&order_status=1&shipping_type=2',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
      
        that.setData({
          order_list_three: res.data
        })

      }

    })
    wx.request({
      url: url +'/meirongorder/selOrder?buyer_id='+uid+'&order_status=3&shipping_type=2',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
      
        that.setData({
          order_list_four: res.data
        })
       
      }

    })
  },
  selected: function (e) {

    this.setData({
      selected1: false,
      selected2: false,
      selected3: false,
      selected: true,
      selected4: false,
    })

  },

  selected1: function (e) {

    this.setData({

      selected1: true,
      selected2: false,
      selected3: false,
      selected: false,
      selected4: false,
    })

  },
  selected2: function (e) {

    this.setData({
      selected: false,
      selected1: false,
      selected3: false,
      selected2: true,
      selected4: false,

    })

  },
  selected3: function (e) {

    this.setData({

      selected1: false,
      selected2: false,
      selected3: true,
      selected4: false,
      selected: false,

    })

  },
  selected4: function (e) {

    this.setData({

      selected1: false,
      selected2: false,
      selected3:false,
      selected4: true,
      selected: false,

    })

  },
  pay :function (e) {
    var that = this
    var paytype = 1;

    if (e.currentTarget.dataset.goods_id =="ZY001"){
      paytype = 298;
    }else{
      paytype = e.currentTarget.dataset.type;
    }
    if (app.globalData.ismember == 1 && paytype==298){
      wx.showToast({
        title: '您只可以享受一次该产品优惠！',
        icon: 'none',
        duration: 1000
      })
      
    }else{
    wx.request({

      url: app.globalData.url + "/wechat/returnparam", //调用java后台的方法
      data: {
        'openid': app.globalData.openId, //需要你获取用户的openid
        'out_trade_no': e.currentTarget.dataset.out_trade_no, //订单名称 这里随便定义shoplist
        'money': e.currentTarget.dataset.id, //支付金额
        // 'money': 0.01, //支付金额
        'goodsName': e.currentTarget.dataset.goodsname,
        'paytype': paytype,
      },
      method: 'POST',
      header: {
        "content-type": 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        wx.requestPayment({
          timeStamp: res.data.timeStamp,
          nonceStr: res.data.nonceStr,
          package: res.data.package,
          signType: res.data.signType,
          paySign: res.data.paySign,
          success: function (res) {
            wx.request({
              url: app.globalData.url + '/user/update',
              method: 'GET',
              data: {
                'uid': app.globalData.uid,
                'is_member': 1,
              },
              header: {
                'content-type': 'application/json'
              },
              success: function (res) {
                app.globalData.ismember = 1;
              }
            })     
            // that.onLoad()
            wx.redirectTo({
              
                 url: '/pages/succeed/succeed?pay_money=' + e.currentTarget.dataset.id + '&order_id=' + e.currentTarget.dataset.orderid + '',
                })
          },
          fail: function (res) {
            wx.showToast({
              title: '系统繁忙',
              icon: 'none',
              duration: 1000
            })

          }
        })

      }
    })
  }
  },
  hopSearch: function (e) {
    wx.navigateTo({
      url: '/pages/search/search'
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
    var that=this;
    that.onLoad();
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