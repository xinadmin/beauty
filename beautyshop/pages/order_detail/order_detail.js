const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order_id:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      order_id: options.order_id
    })
    var url = app.globalData.url;
    wx.request({
      url: url+'/meirongorder/selectByid?orderId=' + that.data.order_id+'',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        if (res.data.order_status == 0) {
          var shipping_type = "待付款"
        } else {
          if (res.data.shipping_type == 1) {
            if (res.data.order_status == 1) {
              var shipping_type = "待服务"
            } else if (res.data.order_status == 4) {
              var shipping_type = "待评价"
            } else if (res.data.order_status == 5) {
              var shipping_type = "已关闭"
            }
            
          } else {
            if (res.data.order_status == 1) {
              var shipping_type = "待提货"
            } else if (res.data.order_status == 3) {
              var shipping_type = "已提货"
            }
             else if (res.data.order_status == 4) {
              var shipping_type = "待评价"
            } else if (res.data.order_status == 5) {
              var shipping_type = "已关闭"
            }
          }
        }
        that.setData({
          order_id: res.data.order_id,
          order_no: res.data.order_no,
          out_trade_no: res.data.out_trade_no,
          receiver_mobile: res.data.receiver_mobile,
          user_name: res.data.receiver_name,//收货人姓名
          meirongyuan_name: res.data.meirongyuan_name,
          meirongyuanaddress: res.data.meirongyuanaddress,
          meirongyuan_id: res.data.meirongyuan_id,
          goods_name: res.data.goods_name,
          goods_id: res.data.goods_id,
          goods_img: res.data.goods_img,
          goods_hanliang: res.data.goods_hanliang,
          goods_money: res.data.goods_money.toFixed(2),
          pay_money: res.data.pay_money.toFixed(2),
          goods_num: res.data.goods_num,
          discount_money: (res.data.order_money - res.data.pay_money).toFixed(2),
          create_time: res.data.create_time,
          pay_time: res.data.pay_time,
          finish_time: res.data.finish_time,
          shipping_type : shipping_type,
          shipping_types: res.data.shipping_type,
        })
        wx.request({
          url: app.globalData.url + '/meirongyuan/meirongyuanInfo?id=' + res.data.meirongyuan_id + '',
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          success: function (res) {
            that.setData({
            
              meirongyuan_tel: res.data.meirongyuan_tel
           
            })

          }

        })
      }

    })
  }, 
  pay: function () {
    var that = this
 
    var paytype = 1;
    if (that.data.goods_id == "ZY001") {
      paytype = 298;
    } else {
      paytype = that.data.shipping_types;
    }
    if (app.globalData.ismember == 1 && paytype == 298) {
      wx.showToast({
        title: '您只可以享受一次该产品优惠！',
        icon: 'none', 
        duration: 1000
      })
    } else {
    wx.request({
      url: app.globalData.url + "/wechat/returnparam", //调用java后台的方法
      data: {
        'openid': app.globalData.openId, //需要你获取用户的openid
        'out_trade_no': that.data.out_trade_no, //订单名称 这里随便定义shoplist
        'money': that.data.pay_money, //金额
        'goodsName': that.data.goods_name,
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
            wx.redirectTo({
              url: '/pages/buySuccess/buySuccess?pay_money=' + that.data.pay_money + '&meirongyuan_name=' + that.data.meirongyuan_name + '&goods_name=' + that.data.goods_name + '&out_trade_no=' + that.data.out_trade_no,
            })
          },
          fail: function (res) {

          }
        })

      }
    })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
  tel: function () {
    wx.makePhoneCall({ phoneNumber: this.data.meirongyuan_tel, })
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