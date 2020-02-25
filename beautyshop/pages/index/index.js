//index.js
//获取应用实例

import { wxRequest, mapApi } from '../../utils/wxRequest';
import { tips } from '../../utils/tip';
const app = getApp();
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');   // 引入腾讯地图SDK核心类
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: '',//城市
    latitude: '',//纬度
    longitude: '',//经度
    imgUrls: [
      'http://yiyun.zhonyou.cn/sprogram_img/beauty_banner1.jpg',
      'http://yiyun.zhonyou.cn/sprogram_img/beauty_banner2.jpg',
      'http://yiyun.zhonyou.cn/sprogram_img/beauty_banner3.jpg',
      'http://yiyun.zhonyou.cn/sprogram_img/beauty_banner4.jpg',
      'http://yiyun.zhonyou.cn/sprogram_img/beauty_banner5.jpg'
    ],
    txtlist: [],
    autoplay: true,
    indicatorDots: false,
    interval: 3000,
    duration: 1000,
    systemInfo: {},
    _api: {},
    navbar: ['推荐', '单品', '沙龙装', '原液', '面部套盒', '身体套盒'],
    currentNavbar: '0',
    swipers: [],
    list: [],
    danpin_produce: [],
    shalong_produce: [],
    yuanye_produce: [],
    mianbu_produce: [],
    body_produce: [],
    current:false,

  },

  /**
   * 切换 navbar
   */
  swichNav(e) {
    var that = this;
    that.setData({
      currentNavbar: e.currentTarget.dataset.idx
    })
    console.log(that.data.currentNavbar)
    if(that.data.currentNavbar == "1"){
      that.setData({
        
        current: true
      })
      
      wx.request({
        url: app.globalData.url + '/zongkunPrduct/alllist?id=1&pageSize=60',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          
          that.setData({
            danpin_produce: res.data.list,
            current: false
          })

        }

      })
    } else if (that.data.currentNavbar == "2"){
      that.setData({
        current: true
      })
      wx.request({
        url: app.globalData.url + '/zongkunPrduct/alllist?id=2&pageSize=22',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          that.setData({
            shalong_produce: res.data.list,
            current: false
          })
        
        }
        
      })
    } else if (that.data.currentNavbar == "3") {
      that.setData({
        current: true
      })
      wx.request({
      url: app.globalData.url +'/zongkunPrduct/alllist?id=3&pageSize=22',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
      
        that.setData({
          yuanye_produce: res.data.list,
          current: false
        })

      }

    })
    } else if (that.data.currentNavbar == "4") {
      that.setData({
        current: true
      })
      wx.request({
        url: app.globalData.url + '/zongkunPrduct/alllist?id=4&pageSize=12',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        success: function (res) {

          that.setData({
            mianbu_produce: res.data.list,
            current: false
          })

        }

      })
    } else if (that.data.currentNavbar == "5") {
      that.setData({
        current: true
      })
      wx.request({
        url: app.globalData.url + '/zongkunPrduct/alllist?id=5&pageSize=40',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        success: function (res) {

          that.setData({
            body_produce: res.data.list,
            current: false
          })

        }

      })
    }
  },
  choiceLocation(e) {
    wx.navigateTo({
      url: '/pages/switchcity/switchcity'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var openId = app.globalData.openId;
    if (!openId) {
      wx.redirectTo({
        url: '/pages/login_auth/login_auth'
      })
     
    }
    wx.request({
      url: app.globalData.url+'/zongkunPrduct/selIsNew',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        that.setData({
          list: res.data
        })

      }

    })

    // 文字轮播
    wx.request({
      url: app.globalData.url + '/beautyAnnouncement/selAll?type=0',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        that.setData({
          txtlist: res.data
        })

      }

    })
    
    var qqmapsdk;
    qqmapsdk = new QQMapWX({
      key: 'ATFBZ-G2OHP-YY7DK-LRKNK-YXLCZ-6TBNF'
    });

    if (app.globalData.city == ""){
      wx.getLocation({  //获取当前地址
        type: 'wgs84',
        success: function (res) {
          var latitude = res.latitude // 纬度，浮点数，范围为90 ~ -90
          var longitude = res.longitude // 经度，浮点数，范围为180 ~ -180

          app.globalData.longitude = res.longitude;
          app.globalData.latitude = res.latitude;
          //根据经纬度获取所在城市
          qqmapsdk.reverseGeocoder({
            location: { latitude: latitude, longitude: longitude },
            success: function (res) {
              //address 城市
              that.setData({
                address: res.result.address_component.city
              })
              app.globalData.city = that.data.address;
              
              wx.showToast({
                title: `当前位置： ` + that.data.address,
                icon: 'none'

              });
            }
          });
        }
      })
      
    }else{
  
      that.setData({
        address : app.globalData.city
      })
      
    }

    
    
  },
  hopSearch :function(e) {
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

})
