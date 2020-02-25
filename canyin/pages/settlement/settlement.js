// pages/dtpicker/dtpicker.js
const app = getApp();

var dateTimePicker = require('../../utils/dateTimePicker.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    k7: [{
      arr_guige02: "是",
      checked: false
    }, {
      arr_guige02: "否",
      checked: true
    }],
    carArray: [{
      carNum: 0,
    }, ],
    dateTimeArray: null,
    dateTime: null,
    dateTimeArray1: null,
    dateTime1: null,
    array: [],
    tid: "", //桌号id
    cartArray: [],
    payMoney: 0.00, //待支付金额
    invoice: 1, //是否需要发票
    allNum: 0, //总数量
    bid: "", //店铺id
    bName: "", //店铺名
    diners: 0, //用餐人数
    cartIds: "", //购物车id
    teaPosition: 0.00, //茶位费
    type: 1, //订餐状态 1为首页进入选择桌号 2位预约订单 3为扫码进入
    tname: '' //桌号名称
    
  },

  // 选择桌号
  bindPickerChange: function(e) {
    var that = this;
    that.setData({
      index: e.detail.value,
      tid: that.data.array[e.detail.value].tId,
      tname: that.data.array[e.detail.value].tNum
    })
  },
  // 选择就餐时间
  changeDateTime1(e) {
    var that = this;
    if (that.data.carArray[0].carNum==0){
      wx.showToast({
        title: '请选择就餐人数',
        icon: 'none',
        duration: 1000
      })
      return ;
    }else {
    that.setData({
      dateTime1: e.detail.value
    });
    var time = that.data.dateTimeArray1[0][that.data.dateTime1[0]] + "-" + that.data.dateTimeArray1[1][that.data.dateTime1[1]] + "-" + that.data.dateTimeArray1[2][that.data.dateTime1[2]] + " " + that.data.dateTimeArray1[3][that.data.dateTime1[3]] + ":" + that.data.dateTimeArray1[4][that.data.dateTime1[4]];
      console.log(time);
      console.log(that.data.carArray[0].carNum);
      console.log(that.data.bid);
    wx.request({
      url: app.globalData.url + '/tables/selectTid',
      method: "GET",
      data: {
        "selectionTime": time,
        "Diners": that.data.carArray[0].carNum,
        "bId": that.data.bid
      },
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        console.log(res.data);
        that.setData({
          array: res.data
        })
      }
    })
    }
  },
  changeDateTimeColumn1(e) {
    var arr = this.data.dateTime1,
      dateArr = this.data.dateTimeArray1;

    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

    this.setData({
      dateTimeArray1: dateArr
    });
  },

  carAdd: function(event) {
    var that = this;
    var index = event.target.dataset.alphaBeta;
    var con = that.data.carArray[index].carNum + 1;
    var key = 'carArray[' + index + '].carNum';
    
    var payMoneys = (parseFloat(that.data.teaPosition) + parseFloat(that.data.payMoney)).toFixed(2);
    var obj = {};
    obj[key] = con;
    this.setData(obj);
    that.setData({
      payMoney: payMoneys
    })
  },
  carReduce: function(event) {
    var that = this;
    var index = event.target.dataset.alphaBeta;
    var con = that.data.carArray[index].carNum;
    var key = 'carArray[' + index + '].carNum';

    var payMoneys = (parseFloat(that.data.payMoney) - parseFloat(that.data.teaPosition)).toFixed(2);
    var obj = {};
    if (con < 1) {
      obj[key] = 0;
      that.setData(obj);
    } else {
      con--;
      obj[key] = con;
      that.setData(obj);
      that.setData({
        payMoney: payMoneys
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    // 获取完整的年月日 时分秒，以及默认显示的数组
    var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    var obj1 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    // 精确到分的处理，将数组的秒去掉
    var lastArray = obj1.dateTimeArray.pop();
    var lastTime = obj1.dateTime.pop();
    wx.request({
      url: app.globalData.url + '/tables/list',
      method: 'GET',
      data: {
        "bId": options.bid,
      },
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        if (options.type == 2) {
          that.setData({
            array: []     
          })
        }else {
        that.setData({
          array: res.data,
          teaPosition: options.teaPosition,
          type: options.type
        })
        }
      }

    })
   
    wx.request({
      url: app.globalData.url + '/carts/list',
      method: 'GET',
      data: {
        "Tid": options.tid,
        "Uid": app.globalData.uid,
        "Bid": options.bid
      },
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        var data = res.data;
        var money = 0.00;
        var num = 0;
        var cartId = "";
        for (var i in data) {
          money = (parseFloat(money) + (parseFloat(data[i].menu.mPrice) * parseInt(data[i].num))).toFixed(2);
          num = parseInt(num) + parseInt(data[i].num);
          if (cartId == "") {
            cartId = data[i].cId;
          } else {
            cartId = cartId + "," + data[i].cId
          }
        }
        that.setData({
          cartArray: res.data,
          payMoney: money,
          allNum: num,
          cartIds: cartId
        })
      }

    })
    console.log(options.bName);
    that.setData({
      dateTime: obj.dateTime,
      dateTimeArray: obj.dateTimeArray,
      dateTimeArray1: obj1.dateTimeArray,
      dateTime1: obj1.dateTime,
      bid: options.bid,
      bName: options.bName,
      type: options.type
    });
  },
  //结算
  insert: function() {
    var that = this;
    var time = that.data.dateTimeArray1[0][that.data.dateTime1[0]] + "-" + that.data.dateTimeArray1[1][that.data.dateTime1[1]] + "-" + that.data.dateTimeArray1[2][that.data.dateTime1[2]] + " " + that.data.dateTimeArray1[3][that.data.dateTime1[3]] + ":" + that.data.dateTimeArray1[4][that.data.dateTime1[4]];

    var tOutTradeNo = that.change();
    // if (that.data.tid == "" && that.data.type == 1) {
    //   wx.showToast({
    //     title: '请选择桌号',
    //     icon: 'none',
    //     duration: 1000
    //   })
    //   return;
    // }

    // if (that.data.tid == "") {
    //   that.data.tid == 0;
    // }
    if (that.data.tid == "") {
      wx.showToast({
        title: '请选择桌号',
        icon: 'none',
        duration: 1000
      })
      return;
    }
    if (parseInt(that.data.carArray[0].carNum) < 1 && that.data.type != 3) {
      wx.showToast({
        title: '请选择就餐人数',
        icon: 'none',
        duration: 1000
      })
      return;
    }
    if (that.data.dateTime1 == null && that.data.type == 2) {
      wx.showToast({
        title: '请选择就餐时间',
        icon: 'none',
        duration: 1000
      })
      return;
    }
    console.log(that.data.cartIds);
    wx.request({
      url: app.globalData.url + '/order/insertByCart',
      method: "POST",
      data: {
        "oCount": that.data.allNum,
        "uId": app.globalData.uid,
        "tId": that.data.tid,
        "payMoney": that.data.payMoney,
        "bId": that.data.bid,
        "orderMoney": that.data.payMoney,
        "invoice": that.data.invoice,
        "bName": that.data.bName,
        "diners": that.data.carArray[0].carNum,
        "oType": that.data.type,
        "selectionTime": time,
        "cartIds": that.data.cartIds,
        "tOutTradeNo": tOutTradeNo,
        "teaPosition": that.data.teaPosition,
        "tName": that.data.tname
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res) {
        if (res.data == -1) {
          wx.showToast({
            title: '系统出现异常！',
            icon: 'none',
            duration: 1000
          })
        } else if (res.data == -2) {
          wx.showToast({
            title: '当前时间已经没有餐桌可选，请重新选择时间！',
            icon: 'none',
            duration: 1000
          })
        } else {
          wx.request({
            url: app.globalData.url + '/wechat/pay',
            method: "POST",
            data: {
              "openid": app.globalData.openId,
              "out_trade_no": tOutTradeNo,
              "money": 0.01,
              // "money": that.data.payMoney,
              "goodsName": "众友美食订单结算"
            },
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(res) {
              wx.requestPayment({
                timeStamp: res.data.timeStamp,
                nonceStr: res.data.nonceStr,
                package: res.data.package,
                signType: res.data.signType,
                paySign: res.data.paySign,
                success: function(res) {

                  wx.redirectTo({
                    url: '/pages/succeed/succeed?out_trade_no=' + tOutTradeNo + '',
                  })

                },
                fail: function(res) {
                  wx.navigateBack({
                    changed: true
                  });
                }
              })
            }

          })
        }
      }

    })
  },
  change: function() {
    var d = new Date();
    var vYear = d.getFullYear();
    var vMon = d.getMonth() + 1;
    var vDay = d.getDate();
    var h = d.getHours();
    var m = d.getMinutes();
    var se = d.getSeconds();
    var ms = d.getMilliseconds();
    var billno = "" + vYear + (vMon < 10 ? "0" + vMon : vMon) + (vDay < 10 ? "0" + vDay : vDay) + (h < 10 ? "0" + h : h) + (m < 10 ? "0" + m : m) + (se < 10 ? "0" + se : se) + ms;
    return billno;

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

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

  },

  // 获取该组件的id
  radio: function(e) {

  },
  // 发货地址选择,获取用户选择的单选框的值
  radioChange: function(e) {
    var invoices = 1;
    if (e.detail.value == "否") {
      invoices = 2;
    }
    this.setData({
      arr_guige02: e.detail.value,
      invoice: invoices
    })

  }

})