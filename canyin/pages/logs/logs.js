//logs.js
const util = require('../../utils/util.js')
const app = getApp();
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

    carArray: [
      {
        carImage: '/pages/img/cai.png',
        carTitle: '地道大闸蟹套餐',
        carText: '香嫩可口',
        carPrice: '¥30',
        carNum: 0,
        carShow: true
      },
      {
        carImage: '/pages/img/cai.png',
        carTitle: '精致烤肉',
        carText: '香嫩可口',
        carPrice: '¥30',
        carNum: 0,
        carShow: true
      },
    ],
    carArray_a: [
      {
        carImage: '/pages/img/cai.png',
        carTitle: '猪排肉',
        carText: '香嫩可口',
        carPrice: '¥39',
        carPrice_a: '¥50',
        carManjian:'满50减5',
        carHot:'60'
      },
      {
        carImage: '/pages/img/cai.png',
        carTitle: '烤羊排肉',
        carText: '香嫩可口',
        carPrice: '¥199',
        carPrice_a: '¥339',
        carManjian: '满299减60',
        carHot: '100'
      },
    ]
  },

  carAdd: function (event) {
    var that = this;
    var index = event.target.dataset.alphaBeta;
    var con = that.data.carArray[index].carNum + 1;
    var key = 'carArray[' + index + '].carNum';
    var obj = {};
    obj[key] = con;
    this.setData(obj);
  },
  carReduce: function (event) {
    var that = this;
    var index = event.target.dataset.alphaBeta;
    var con = that.data.carArray[index].carNum;
    var key = 'carArray[' + index + '].carNum';
    var obj = {};
    if (con < 1) {
      obj[key] = 0;
      that.setData(obj);
    }
    else {
      con--;
      obj[key] = con;
      that.setData(obj);
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     var that=this
     that.setData({
       mid:options.mid
     })
    // wx.request({
    //   url: app.globalData.url + "/business/selectByaddress?mid="+that.data.mid+"",
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   success: function (res) {
    //     var datas = res.data.list;
    //     that.setData({
    //       shoplist: datas
    //     })
    //   }
    // })
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
    
  }
})
