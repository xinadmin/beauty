const app = getApp();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    uid: "",
    user_name: "",
    user_tel: "",
    pid: "",
    num: "",
    member: 0,
    beauty_id: "",
    meirongyuan_name: "",
    meirongyuan_code: "",
    meirongyuan_address: "",
    meirongyuan_tel: "",
    meirongyuan_logo:"",
    buyer_message: "",
    meal_number: "",
    paytype: "",
    goods_img: "",
    username: "",
    showModal_name: false,
    show_name: false,
    user_names: "",
    name_type: "",
    update_name:false,
    order_id:"",
    hidden:false,
    is_take:false,
    p_discount:0.00,
    p_discount_price: 0.00

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    if(options.pid=="ZY001"){
       
    }
    that.setData({
      pid: options.pid,
      num: options.pid == "ZY001" ? 1:options.num,
      beauty_id: options.beauty_id,
      uid: app.globalData.uid,
      type: null
    })
    wx.request({
      url: app.globalData.url + '/user/selUserInfo?uid=' + that.data.uid + '',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        if (res.data.real_name == null || res.data.real_name == "") {
          that.setData({
            showModal_name: true,
            name_type: 1
          })
        }

        that.setData({
          user_name: res.data.real_name,
          user_tel: res.data.user_tel,
          member: res.data.is_member,
          user_names: res.data.user_name,
        })

     
    
    wx.request({
      url: app.globalData.url + '/zongkunPrduct/selZongkucunProduct?pid=' + that.data.pid + '',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        if (that.data.member == 0) {
          var p_discount_price = (res.data.pprice * that.data.num).toFixed(2);
          var p_discount = 0.00;
        } else if (that.data.member == 1) {
          var p_discount_price = (res.data.pprice * that.data.num * res.data.pgongxiao).toFixed(2);
          var p_discount = (res.data.pprice * that.data.num * (1 - res.data.pgongxiao)).toFixed(2);
        }
        if (res.data.produce_fenlei == "经典单品系列" || res.data.produce_fenlei == "沙龙装系列" || res.data.produce_fenlei == "经典原液系列") {
          var type = 2;
          that.data.paytype = 2;
        } else if (res.data.produce_fenlei == "超值套盒系列") {
          var type = 1;
          that.data.meal_number = 6;
          that.data.paytype = 298;
        } else {
          var type = 1;
          that.data.paytype = 1;
          that.data.meal_number = 10;
        }
        that.setData({
          pname: res.data.pname,
          costprice: (res.data.pprice).toFixed(2),
          pprice: ((res.data.pprice) * that.data.num).toFixed(2),
          phanliang: res.data.phanliang,
          type: type,
          p_pic: res.data.p_pic,
          p_discount: p_discount,
          p_discount_price: p_discount_price,
          goods_img: res.data.p_pic,
          hidden:true
        })
      }

    })
      }

    })
    wx.request({
      url: app.globalData.url + '/meirongyuan/meirongyuanInfo?id=' + that.data.beauty_id + '',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        that.setData({
          meirongyuan_name: res.data.meirongyuan_name,
          meirongyuan_address: res.data.meirongyuan_address,
          meirongyuan_tel: res.data.meirongyuan_tel,
          meirongyuan_logo: res.data.meirongyuan_logo
        })

      }

    })
  },
  buyer_message: function(e) {
    var that = this;
    that.setData({
      buyer_message: e.detail.value,

    })
  },
  inputusername: function(e) {
    var that = this;
    that.setData({
      username: e.detail.value.replace(/\s+/g, ""),

    })
   
  },
  onConfirm: function(e) {
    var that = this;
    if (that.data.username == "") {
      wx.showToast({
        title: '请输入',
        icon: 'none',
        duration: 1000
      })
      return;
    }else{
      that.setData({
        user_name: that.data.username,
        showModal_name: false,
        show_name: false


      })
    }

  },
  onCancel: function() {
    var that = this;
    if (that.data.user_name!=""){
      that.setData({
        showModal_name: false,
        show_name: false,

      })
    }else {
    that.setData({
      showModal_name: false,
      show_name: true,
   
    })
    }
  },
  onshowusernamemoal: function(e) {
    var that = this;
    that.setData({
      showModal_name: true,

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
  take_goods: function() {
    var that = this;
    if (!that.data.is_take) {
      that.setData({
        is_take: true
      })
    } 
    var out_trade_no = that.change();
    if (that.data.user_name == "" || that.data.user_name == null) {
      wx.showToast({
        title: '请输入提货人姓名',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    wx.request({
      url: app.globalData.url + '/meirongorder/insert',
      method: 'POST',
      data: Util.json2Form({
        out_trade_no: out_trade_no, //支付外部编号
        shipping_type: that.data.type, //配送方式  1 到店服务  2 到店提货 
        buyer_id: app.globalData.uid, //用户id
        user_name: that.data.user_names, //用户名
        buyer_message: that.data.buyer_message, //购买者留着
        meirongyuan_id: that.data.beauty_id, //美容院id
        receiver_mobile: that.data.user_tel,//手机号
        meirongyuan_name: that.data.meirongyuan_name, //美容院店名
        meirongyuanaddress: that.data.meirongyuan_address,//美容院地址
        goods_name: that.data.pname,//商品名
        goods_id: that.data.pid, //商品编号
        goods_img: that.data.goods_img, //商品图片
        goods_hanliang: that.data.phanliang, //商品规格
        goods_money: that.data.pprice, //商品价格
        goods_num: that.data.num, //数量
        order_money: that.data.pprice, //订单总价
        pay_money: that.data.p_discount_price, //支付价格
        meal_number: that.data.meal_number * that.data.num,//商品数量
        meal_id: that.data.pid,//套盒id
        receiver_name: that.data.user_name,//用户名
        name_type: that.data.name_type//
      }),
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res) {
        if (res.data == "-1") {
          wx.showToast({
            title: '系统繁忙，稍后再试',
            icon: 'none',
            duration: 2000
          })
         
        } else if (res.data == "0") {
          wx.showToast({
            title: '系统繁忙，稍后再试',
            icon: 'none',
            duration: 2000
          })
        } else {
          console.log(res.data);
          that.setData({
            order_id:res.data
          })
          wx.request({

            url: app.globalData.url + "/wechat/returnparam", //调用java后台的方法
            data: {
              'openid': app.globalData.openId, //需要你获取用户的openid
              'out_trade_no': out_trade_no, //订单名称 这里随便定义shoplist
               'money': that.data.p_discount_price, //支付金额
              // 'money': 0.01, //支付金额
              'goodsName': that.data.pname,
              'paytype': that.data.paytype,
            },
            method: 'POST',
            header: {
              "content-type": 'application/x-www-form-urlencoded'
            },
            success: function(res) {
              wx.requestPayment({
                timeStamp: res.data.timeStamp,
                nonceStr: res.data.nonceStr,
                package: res.data.package,
                signType: res.data.signType,
                paySign: res.data.paySign,
                success: function(res) {
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
                    url: '/pages/succeed/succeed?pay_money=' + that.data.p_discount_price + '&order_id=' + that.data.order_id + '',
                  })
                },
                fail: function(res) {
                  wx.navigateBack({ changed: true });
                
                }
              })

            }
          })
        }

      }

    })
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

  }
})
var Util = require('../../utils/util.js');