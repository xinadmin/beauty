const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    beauty_id:"",
    beauty:"",
    min:"",
    hidden:false,
    produce_list_sale:[],
    meirongyuan_name: "",
    meirongyuan_logo: "",
    meirongyuan_code: "",
    meirongyuan_address: "",
    meirongyuan_jingdu:"" ,
    meirongyuan_weidu: "",
    meirongyuan_tel: "",
    meirongyuan_business: "上午9点至下午10点",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var mins="";
    if (options.min>1000){
      mins = (options.min/1000)+"km";
    } else if (options.min<500){
      mins = "<500m";
    }else{
      mins = options.min+"m";
    }
    this.setData({
      beauty_id:options.beauty_id,
      min: mins
    })
    var that = this;
    wx.request({
      url: app.globalData.url +'/meirongyuan/meirongyuanInfo?id='+this.data.beauty_id+'',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        that.setData({
          meirongyuan_name: res.data.meirongyuan_name,
          meirongyuan_logo: res.data.meirongyuan_logo,
          meirongyuan_code: res.data.meirongyuan_code,
          meirongyuan_address: res.data.meirongyuan_address,
          meirongyuan_jingdu: res.data.meirongyuan_jingdu,
          meirongyuan_weidu: res.data.meirongyuan_weidu,
          meirongyuan_tel: res.data.meirongyuan_tel,
          meirongyuan_business: res.data.meirongyuan_business,
          hidden:true
        })

      }

    })
    wx.request({
      url: app.globalData.url +'/zongkunPrduct/alllist?id=1&pageSize=60',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        that.setData({
          produce_list_sale: res.data.list
        })

      }

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
  tel: function () { 
    wx.makePhoneCall({ 
      // phoneNumber: this.data.meirongyuan_tel,
      phoneNumber: "02022126878",
       })
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