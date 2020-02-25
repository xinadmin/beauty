const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selected: true,
    selected1: false,
    selected2: false,
    selected3: false,
    selected4: false,
    selected5: false,
    beauty_id:"",
    min:"",
    hidden:false,
    danpin_produce:[],
    shalong_produce:[],
    all_produce:[],
    yuanye_produce: [],
    mianbu_produce: [],
    body_produce: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      beauty_id: options.beauty_id,
      min: options.min
    })
    var that=this;
    wx.request({
      url: app.globalData.url + '/zongkunPrduct/selAll',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        
        that.setData({
          all_produce: res.data,
          hidden:true
        })

      }

    })
    wx.request({
      url: app.globalData.url + '/zongkunPrduct/alllist?id=1&pageSize=60',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
       
        that.setData({
          danpin_produce: res.data.list
        })

      }

    })
    wx.request({
      url: app.globalData.url + '/zongkunPrduct/alllist?id=2&pageSize=22',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
      
        that.setData({
          shalong_produce: res.data.list
        })

      }

    })
    wx.request({
      url: app.globalData.url + '/zongkunPrduct/alllist?id=3&pageSize=22',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
      
        that.setData({
         yuanye_produce: res.data.list
        })

      }

    })
    wx.request({
      url: app.globalData.url + '/zongkunPrduct/alllist?id=4&pageSize=12',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        
        that.setData({
          mianbu_produce: res.data.list
        })

      }

    })
    wx.request({
      url: app.globalData.url + '/zongkunPrduct/alllist?id=5&pageSize=40',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
     
        that.setData({
         body_produce: res.data.list
        })

      }

    })
  },
  selected: function (e) {

    this.setData({
      selected1: false,
      selected2: false,
      selected3: false,
      selected: true,
      selected4: false,
      selected5: false
    })

  },

  selected1: function (e) {

    this.setData({

      selected1: true,
      selected2: false,
      selected3: false,
      selected: false,
      selected4: false,
      selected5: false,
    })

  },
  selected2: function (e) {

    this.setData({
      selected: false,
      selected1: false,
      selected3: false,
      selected2: true,
      selected4: false,
      selected5: false
    })

  },
  selected3: function (e) {

    this.setData({

      selected1: false,
      selected2: false,
      selected3: true,
      selected4: false,
      selected: false,
      selected5: false

    })

  },
  selected4: function (e) {

    this.setData({

      selected1: false,
      selected2: false,
      selected3: false,
      selected4: true,
      selected5: false,
      selected: false

    })

  },
  selected5: function (e) {

    this.setData({

      selected1: false,
      selected2: false,
      selected3: false,
      selected5: true,
      selected4: false,
      selected: false

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