var Util = require('../../utils/util.js');
var app = getApp()
Page({
  data: {
    stars: [0, 1, 2, 3, 4],
    normalSrc: '/pages/img/xingxing1.png',
    selectedSrc: '/pages/img/xingxing.png',
    halfSrc: '/pages/img/xingxing.png',
    key: 0,//评分
    haoping: "",
    orderId: 0, //订单id
    orderNo: 0, //订单编号
    orderGoodsId: 0, //订单类型  1为商城订单  2为美容院订单
    goodsId: "", //商品id
    goodsName: "", //商品名称
    goodsPrice: "", //商品id
    goodsImage: "", //商品id
    shopId: 0, //商品id
    shopName: "", //商品id
    content: "", //评价内容
    image: "", //评价图片
    uid: 0, //用户id
    memberName: "", //用户名
    isAnonymous: 0, //是否匿名
    isShow: 0,
    explainType:""
  },
  onLoad: function (options) {
    var that = this;
    this.setData({
      orderId: options.orderId
    })
    console.log(that.data.orderId);

    wx.request({
      url: app.globalData.url + '/meirongorder/selectByid?orderId=' + that.data.orderId + '',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          orderId: res.data.order_id, //订单id
          orderNo: res.data.out_trade_no, //订单编号
          orderGoodsId: 2, //订单类型  1为商城订单  2为美容院订单
          goodsId: res.data.goods_id, //商品id
          goodsName: res.data.goods_name, //商品id
          goodsPrice: res.data.goods_money, //商品id
          goodsImage: res.data.goods_img, //商品id
          shopId: res.data.meirongyuan_id, //商品id
          shopName: res.data.meirongyuan_name, //商品id
          uid: res.data.buyer_id, //用户id
          memberName: res.data.user_name, //用户名
      
        })

      }

    })
  },

  pingjiaTxt:function(e){
    var that = this;
    that.setData({
      content: e.detail.value,

    })

  },
//提交评价
  insNsGoodsEvaluate:function(){
    var that = this;
    if (that.data.content == null || that.data.content == "") {
      wx.showToast({
        title: '请输入评价内容！！',
        icon: 'none',
        duration: 2000
      })
      return
    } else if (that.data.haoping == null || that.data.haoping == "") {
      wx.showToast({
        title: '请选择评价！！',
        icon: 'none',
        duration: 2000
      })
      return
    }
    
    if (that.data.haoping=="好评"){
      that.setData({
        explainType: 1,

      })
    } else if (that.data.haoping == "中评"){
      that.setData({
        explainType: 2,

      })
    } else if (that.data.haoping == "差评") {
      that.setData({
        explainType: 3,

      })
    }
    wx.request({
      url: app.globalData.url + '/goodevaluate/insNsGoodsEvaluate',
      method: 'POST',
      data: Util.json2Form({
        orderId: that.data.orderId, //订单id
        orderNo: that.data.orderNo, //订单编号
        orderGoodsId: 2, //订单类型  1为商城订单  2为美容院订单
        goodsId: that.data.goodsId, //商品id
        goodsName: that.data.goodsName, //商品id
        goodsPrice: that.data.goodsPrice, //商品id
        goodsImage: that.data.goodsImage, //商品id
        shopId: that.data.shopId, //商品id
        shopName: that.data.shopName, //商品id
        content: that.data.content, //评价内容
        image: "", //评价图片
        uid: that.data.uid, //用户id
        memberName: that.data.memberName, //用户名
        isAnonymous: 1, //是否匿名
        scores: that.data.key, //评分1-5
        explainType: that.data.explainType, //好评1 中评2 差评3
        isShow: 1
      }),
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {

        if (res.data == 0) {
          wx.showToast({
            title: '评价失败',
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
  },
  //点击右边,半颗星
  selectLeft: function (e) {
    var that =this;
    var key = e.currentTarget.dataset.key
    var haoping = ["好评","中评","差评"]
    console.log("得" + key + "分")
    that.setData({
      key: key
    })
    if (that.data.key == "1" || that.data.key == "2"){
      that.setData({
        haoping: haoping[2]
      })
    } else if (that.data.key == "3") {
      that.setData({
        haoping: haoping[1]
      })
    } else if (that.data.key == "4" || that.data.key == "5") {
      that.setData({
        haoping: haoping[0]
      })
    }

  },
  //点击左边,整颗星
  selectRight: function (e) {
    var that = this;
    var key = e.currentTarget.dataset.key;
    var haoping = ["好评", "中评", "差评"];
    console.log("得" + key + "分")
    this.setData({
      key: key
    })
    if (that.data.key == "1" || that.data.key == "2") {
      that.setData({
        haoping: haoping[2]
      })
    } else if (that.data.key == "3" ) {
      that.setData({
        haoping: haoping[1]
      })
    } else if (that.data.key == "5" || that.data.key == "4") {
      that.setData({
        haoping: haoping[0]
      })
    }
  }
})
