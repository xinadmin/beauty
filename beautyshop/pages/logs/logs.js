//logs.js
const util = require('../../utils/util.js')
const app = getApp();
import {
  wxRequest
} from '../../utils/wxRequest';
import {
  tips
} from '../../utils/tip';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [],
    autoplay: true,
    indicatorDots: false,
    showModal: false, //弹窗
    interval: 3000,
    duration: 1000,
    array: [],
    hidden:false,
    indexs: 0,
    carArray: [{
      carNum: 1,
      carShow: true
    }, ],
    Num: "1",
    address: '', //城市
    latitude: '', //纬度
    longitude: '', //经度
    beauty_goods: [],
    goods_evalution: [],
    id: "",
    buauty_id: "",
    pid: "",
    p_discount_price: "",
    meirongyuan_name: "",
    meirongyuan_logo: "",
    meirongyuan_code: "",
    meirongyuan_address: "",
    meirongyuan_jingdu: "",
    meirongyuan_weidu: "",
    meirongyuan_tel: "",
    meirongyuan_business: "上午9点至下午22点",
    produce_brank: "",
    distance: "",
    buy: 1,
    none_a: false,
    title:""
  },

  carAdd: function(event) {
    var that = this;
    if (that.data.pid == "ZY001"){
      wx.showToast({
        title: '当前优惠套盒最多购买一个！',
        icon: 'none',
        duration: 1000
      })
      return;
    }else {
    var index = event.target.dataset.alphaBeta;
    var con = that.data.carArray[index].carNum + 1;
    var key = 'carArray[' + index + '].carNum';
    var obj = {};
    obj[key] = con;
    that.setData({
      Num: con
    })
    this.setData(obj);
    }
  },
  carReduce: function(event) {
    var that = this;
    var index = event.target.dataset.alphaBeta;
    var con = that.data.carArray[index].carNum;
    var key = 'carArray[' + index + '].carNum';
    var obj = {};
    if (con <= 1) {
      obj[key] = 1;
      that.setData({
        Num: 1
      })
      that.setData(obj);
    } else {
      con--;
      obj[key] = con;
      that.setData(obj);
      that.setData({
        Num: con
      })
    }
  },

  //选择门店
  bindPickerChange: function(e) {
    var that = this
    var distances = "";
    if (that.data.array[e.detail.value].min > 1000) {
      distances = (that.data.array[e.detail.value].min / 1000) + "km";
    } else if (that.data.array[e.detail.value].min < 500) {
      distances = "<500m";
    } else {
      distances = that.data.array[e.detail.value].min + "m";
    }
    this.setData({
      indexs: e.detail.value,
      buauty_id: that.data.array[e.detail.value].id,
      meirongyuan_address: that.data.array[e.detail.value].meirongyuan_address,
      meirongyuan_tel: that.data.array[e.detail.value].meirongyuan_tel,
      distance: distances,
      meirongyuan_name: that.data.array[e.detail.value].meirongyuan_name
    })

  },

  submit: function() {
    var that = this;
    if (that.data.buy == 0 && app.globalData.ismember == 1) {
      wx.showToast({
        title: '您只可以享受一次该产品优惠！',
        icon: 'none',
        duration: 1000
      })
    } else {
      that.setData({
        showModal: true
      })
    }

  },
  go: function() {
    this.setData({
      showModal: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {


    if (options.pid == 'ZY001') {
      this.data.buy = 0;

    }
    this.setData({
      pid: options.pid

    })

    var that = this;
    wx.request({
      url: app.globalData.url + '/zongkunPrduct/selZongkucunProduct?pid=' + that.data.pid + '',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        var pic = res.data.p_pic1.split("&");
        if (that.data.pid == 'ZY001') {
          var p_price_cost = 1999.00;
          that.setData({
         title :"参与会员价"
          })
        } else {

          var p_price_cost = (parseFloat(res.data.pprice) * 1.2).toFixed(2)
        }
        that.setData({
          pid: res.data.pid,
          pname: res.data.pname,
          pdetail: res.data.pdetail,
          pprice: (res.data.pprice).toFixed(2),
          p_price_cost: p_price_cost,
          phanliang: res.data.phanliang,
          produce_fenlei: res.data.produce_fenlei,
          imgUrls: pic,
          produce_brank: res.data.produce_brank,
          p_pic: res.data.p_pic,
          p_discount: (res.data.pgongxiao * res.data.pprice).toFixed(2),
          p_discount_price: (res.data.pprice - res.data.pgongxiao * res.data.pprice).toFixed(2),
          hidden:true
        })

      }

    })
    wx.request({
      url: app.globalData.url + '/goodevaluate/selPingjia?goods_id=' + that.data.pid + '&shop_id=3&status=1',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function(res) {

        that.setData({
          goods_evalution: res.data
        })

      }

    })
    if (options.buauty_id == undefined) {

      that.setData({
        address: app.globalData.city,
        latitude: app.globalData.latitude,
        longitude: app.globalData.longitude

      })
      wx.request({
        url: app.globalData.url + '/meirongyuan/selectshopAddress?shopAddress=' + that.data.address + '&latitude=' + that.data.latitude + '&longitude=' + that.data.longitude + '',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        success: function(res) {
          if (res.data.length == 0) {
            that.setData({
              none_a: true
            })
            return;
          }
          var distances = "";
          if (res.data[0].min > 1000) {
            distances = (res.data[0].min / 1000) + "km";
          } else if (res.data[0].min < 500) {
            distances = "<500m";
          } else {
            distances = res.data[0].min + "m";
          }

          that.setData({
            array: res.data,
            buauty_id: res.data[0].id,
            meirongyuan_name: res.data[0].meirongyuan_name,
            meirongyuan_address: res.data[0].meirongyuan_address,
            distance: distances,
            meirongyuan_tel: res.data[0].meirongyuan_tel
          })
        }
      })

    } else {

      this.setData({
        buauty_id: options.buauty_id
      })
      wx.request({
        url: app.globalData.url + '/meirongyuan/meirongyuanInfo?id=' + that.data.buauty_id + '',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        success: function(res) {
          console.log(res)
          that.setData({
            array: res.data.meirongyuan_name,
            meirongyuan_logo: res.data.meirongyuan_logo,
            meirongyuan_code: res.data.meirongyuan_code,
            meirongyuan_address: res.data.meirongyuan_address,
            meirongyuan_jingdu: res.data.meirongyuan_jingdu,
            meirongyuan_weidu: res.data.meirongyuan_weidu,
            meirongyuan_tel: res.data.meirongyuan_tel,
            meirongyuan_business: res.data.meirongyuan_business
          })

        }

      })
    }
    wx.request({
      url: app.globalData.url + '/zongkunPrduct/selProNumber',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        that.setData({
          beauty_goods: res.data
        })
      }
    })
  },
  order_take(e) {
    var that = this;
    if (app.globalData.ismember == 1 && that.data.pid == "ZY001") {
      wx.showToast({
        title: '您只可以享受一次该产品优惠！',
        icon: 'none',
        duration: 1000
      })
      return;
    }
    wx.navigateTo({
      url: '/pages/placeOrder/placeOrder?pid=' + that.data.pid + '&num=' + that.data.Num + '&beauty_id=' + that.data.buauty_id + '',
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
  tel: function() {
    wx.makePhoneCall({
      // phoneNumber: this.data.meirongyuan_tel,
      phoneNumber: "02022126878",
    })
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