//index.js
//获取应用实例
const app = getApp()
import { tips } from '../../utils/tip';
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');   // 引入腾讯地图SDK核心类
var qqmapsdk;
var page = 1;

var GetList = function (that) {
  that.setData({
    hidden: false
  });
  wx.request({
    url: app.globalData.url + '/business/selectByaddress',
    method: 'GET',
    data: {
      'address': app.globalData.province + app.globalData.city,
      'latitude': app.globalData.latitude,
      'longitude': app.globalData.longitude,
      'pageSize': 3,
      'pageNum':that.data.pageNum+1
    },
    headers: {
      'Content-Type': 'application/json'
    },
    success: function (res) {
      var datas = res.data.list;

      //切割商家展示图字段
      for (var i in datas) {
        var image = [];
        if (datas[i].shopImage != "" || datas[i].shopImage != null){       
            var images = datas[i].shopImage.split("&");

          
            datas[i].shopImage = images;
        }
      }
      that.setData({
        shoplist: that.data.shoplist.concat(datas),
        hidden: true,
        pageNum: parseInt(that.data.pageNum)+1
      });
    }
  });
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      'http://yiyun.zhonyou.cn/foods_img/benner.png',
      'http://yiyun.zhonyou.cn/sprogram_img/beauty_banner1.jpg',
      'http://yiyun.zhonyou.cn/sprogram_img/beauty_banner2.jpg'
    ],
    autoplay: true,
    indicatorDots: false,
    interval: 3000,
    duration: 1000,

    province: '',
    city: '',//城市
    latitude: '',//纬度
    longitude: '',//经度
    hidden: false,
    list: [],
    scrollTop: 0,
    scrollHeight: 0,
    shoplist:[],
    pageNum:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: app.globalData.url + '/business/selectByaddress',
      method: 'GET',
      data: {
        'address': app.globalData.province + app.globalData.city,
        'latitude': app.globalData.latitude,
        'longitude': app.globalData.longitude,
        'pageSize': 3
      },
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res.data.list)
        var datas = res.data.list;
        that.setData({
          shoplist: datas
        })
       
        //切割商家展示图字段
        for (var i in that.data.shoplist) {
          var images = that.data.shoplist[i].shopImage.split("&");
          that.data.shoplist[i].shopImage = images;
          that.setData({
            shoplist: that.data.shoplist

          });
        }
        that.setData({
          hidden: true
        });
      },
      fail: function (res) {
        console.log(res);
        that.setData({
          hidden: true
        });
      },
    })

  },
  
  bindDownLoad: function () {
    var that = this;
    GetList(this)
  },
  scroll: function (event) {
    
  },
  refresh: function (event) {
    page = 1;
    this.setData({
      list: [],
      scrollTop: 0
    });
    
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
    console.log("下拉");
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("上拉");
    var that = this;
    GetList(this)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})