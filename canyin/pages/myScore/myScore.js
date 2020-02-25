var Util = require('../../utils/util.js');
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stars: [0, 1, 2, 3, 4],
    normalSrc: '/pages/img/ping_xing.png',
    selectedSrc: '/pages/img/ping_xing_a.png',
    halfSrc: '/pages/img/ping_xing_a.png',
    key: 0,//服务评分
    stars_a: [0, 1, 2, 3, 4],
    normalSrc_a: '/pages/img/ping_xing.png',
    selectedSrc_a: '/pages/img/ping_xing_a.png',
    halfSrc_a: '/pages/img/ping_xing_a.png',
    key_a: 0,//口碑评分

    previewImageArr: [],
    commenttext:'',//评价
    mouthBranch: 0,//口碑打分
    serviceBranch: 0,//服务打分
    oid:''//订单id
  },

  //服务点击右边,半颗星
  selectLeft: function (e) {
    var that = this;
    var key = e.currentTarget.dataset.key
    console.log("得" + key + "分")
    that.setData({
      key: key,
      serviceBranch:key
    })
  },
  //服务点击左边,整颗星
  selectRight: function (e) {
    var that = this;
    var key = e.currentTarget.dataset.key;
    console.log("得" + key + "分")
    this.setData({
      key: key,
      serviceBranch:key
    })
    
  },

  //口碑点击右边,半颗星
  selectLeft_a: function (e) {
    var that = this;
    var key_a = e.currentTarget.dataset.key
    that.setData({
      mouthBranch: key_a,
      key_a: key_a
    })
  },
  //口碑点击左边,整颗星
  selectRight_a: function (e) {
    var that = this;
    var key_a = e.currentTarget.dataset.key;
    this.setData({
      mouthBranch: key_a,
      key_a: key_a
    })

  },

  previewImage(e) {
    var self = this;
    wx.chooseImage({
      count: 8,
      success(res) {
        var tempFilePaths = res.tempFilePaths;

        wx.uploadFile({
          url: app.globalData.url + '/uploadC/image', // 仅为示例，非真实的接口地址
          filePath: res.tempFilePaths[0],
          name: 'file',
          formData: {
            newpath: 'upload/user/comment',
            open_id: app.globalData.appid
          },
          success(res) {
            console.log(res)
            var data = res.data;
            var imagearray={data};

            self.setData({ previewImageArr: self.data.previewImageArr.concat(imagearray) });
            console.log(self.data.previewImageArr)
          }
        })
        
      }
    })
  },
  changePreview(e) {
    var self = this;
    wx.previewImage({
      current: e.currentTarget.dataset.src,
      urls: self.data.previewImageArr
    })
  },
  uploadImage: function (e) {
    var tempFilePath = this.data.images[0];
    console.log("uploadImage");
    console.log(tempFilePath);
    var that = this;
    
  },
  //提交评价
  insNsGoodsEvaluate:function(e){
    var that=this;
    if (that.data.serviceBranch==0){
      wx.showModal({
        title: '提示',
        content: '请您为该店的服务打分',
        showCancel: false,
        confirmText: '确认'
      })
      return;
    }

    if (that.data.mouthBranch == 0) {
      wx.showModal({
        title: '提示',
        content: '请您为该店的口碑打分',
        showCancel: false,
        confirmText: '确认'
      })
      return;
    }
      wx:wx.request({
        url: app.globalData.url+'/comment/insert',
        data: {
          "uId":app.globalData.uid,
          "oId":that.data.oid,
          "serviceBranch": that.data.serviceBranch,
          "mouthBranch": that.data.mouthBranch,
          "commentImage": JSON.stringify(that.data.previewImageArr)
        },
        method: 'POST',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success: function(res) {
          console.log(res)
            if(res.data==1){
              wx.switchTab({
                url: '/pages/index/index'
              })
            }else{
              wx.showModal({
                title: '提示',
                content: '系统繁忙，请稍后重试！',
                showCancel: false,
                confirmText: '确认'
              })
            }
        }
        
      })
  },
  pingjiaTxt: function (e) {
    console.log(e.detail.value)
    this.setData({
      commenttext: e.detail.value,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showModal({
      title: '提示',
      content: '您评价完成默认同意该订单完成！',
      showCancel: false,
      confirmText: '确认'
    })
    var that=this;
    that.setData({
      oid:options.oid
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
    
  }
})