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
      'address': that.data.province + that.data.city,
      'latitude': that.data.latitude,
      'longitude': that.data.longitude,
      'pageSize': 2,
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

      'http://yiyun.zhonyou.cn/sprogram_img/beauty_banner1.jpg',
      'http://yiyun.zhonyou.cn/foods_img/benner.png',
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
    hidden: true,
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
    var openId = app.globalData.openId;
    if (!openId) {
      wx.redirectTo({
        url: '/pages/login_auth/login_auth'
      })

    }
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    });

    qqmapsdk = new QQMapWX({
      key: '4H6BZ-ZBAHI-SDOGU-5Y5FT-AELGT-H5B3O' //自己的key秘钥 http://lbs.qq.com/console/mykey.html 在这个网址申请
    });
    that.getUserLocation();
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

  getUserLocation: function () {
    let vm = this;
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
          wx.showModal({
            title: '请求授权当前位置',
            content: '需要获取您的地理位置，请确认授权',
            success: function (res) {
              if (res.cancel) {
                wx.showToast({
                  title: '拒绝授权',
                  icon: 'none',
                  duration: 1000
                })
              } else if (res.confirm) {
                wx.openSetting({
                  success: function (dataAu) {
                    if (dataAu.authSetting["scope.userLocation"] == true) {
                      wx.showToast({
                        title: '授权成功',
                        icon: 'success',
                        duration: 1000
                      })
                      //再次授权，调用wx.getLocation的API
                      vm.getLocation();
                    } else {
                      wx.showToast({
                        title: '授权失败',
                        icon: 'none',
                        duration: 1000
                      })
                    }
                  }
                })
              }
            }
          })
        } else if (res.authSetting['scope.userLocation'] == undefined) {
          //调用wx.getLocation的API
          vm.getLocation();
        }
        else {
          //调用wx.getLocation的API
          vm.getLocation();
        }
      }
    })
  },
  // 微信获得经纬度
  getLocation: function () {
    let vm = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy;
        vm.getLocal(res.latitude, res.longitude)
      },
      fail: function (res) {
        console.log('fail' + JSON.stringify(res))
      }
    })
  },
  // 获取当前地理位置
  getLocal: function (latitude, longitude) {
    var that = this;
    // let vm = this;
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: latitude,
        longitude: longitude
      },
      success: function (res) {
        let province = res.result.ad_info.province
        let city = res.result.ad_info.city
        that.setData({
          province: province,
          city: city,
          latitude: latitude,
          longitude: longitude
        })
          app.globalData.province = province,//城市
          app.globalData.city=city,//城市
          app.globalData.longitude = latitude,
          app.globalData.latitude = longitude,
        wx.request({
          url: app.globalData.url + '/business/selectByaddress',
          method:'GET',
          data:{
            'address': province + city,
            'latitude': latitude,
            'longitude': longitude,
            'pageSize':2
          },
          headers: {
            'Content-Type': 'application/json'
          },
          success: function (res) {
            var datas=res.data.list;
            that.setData({
              shoplist: datas
            })
          
            //切割商家展示图字段
            for (var i in that.data.shoplist){
              var images = that.data.shoplist[i].shopImage.split("&");
          
              that.data.shoplist[i].shopImage=images;
              that.setData({
                shoplist: that.data.shoplist

              });
            }
            that.setData({
              hidden: true
            });
          }
        })

      },
      fail: function (res) {
        console.log(res);
        that.setData({
          hidden: true
        });
      },
      complete: function (res) {
        // console.log(res);
        that.setData({
          hidden: true
        });
      }
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
    var that = this;
    // if (that.data.pageNum==1){
    //   that.onLoad();
    // }
   
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
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})