const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    radioItems: [],
    order_list: [],
    hidden: false,
    order_id: "",
    yuyue_id: "",
    meal_number: "",
    is_show: false,
    order_list_length: "",
    shop_id: ""
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    if (options.order_id != "") {
      that.setData({
        order_id: options.order_id

      })

    }



    wx.request({
      url: app.globalData.url + '/yuyue/selectdetailByUid?Uid=' + that.data.order_id + '',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
      
        that.setData({
          order_list: res.data,
          order_list_length: res.data.length

        })
        wx.request({
          url: app.globalData.url + '/yuyue/selectByorderId?orderId=' + that.data.order_id + '',
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          success: function(res) {
            that.setData({
              yuyue_id: res.data.yuyue_id,
              meal_number: res.data.meal_number,
              shop_id: res.data.shop_id
            })
            if (that.data.order_list_length < that.data.meal_number) {
              that.setData({
                is_show: true
              })
            
            } else {
              that.setData({
                is_show: false

              })
            }
          }

        })

      }

    })




  },

  anliu: function(e) {
    var id = e.currentTarget.id;
    var that = this;
    wx.request({
      url: app.globalData.url + '/yuyue/memberSignature?id=' + id + '',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        if (res.data == 1) {
          wx.showToast({
            title: '签单成功，欢迎再次光临',
            duration: 2000
          })
          // that.onLoad();
          wx.request({
            url: app.globalData.url + '/yuyue/selectdetailByUid?Uid=' + that.data.order_id + '',
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            },
            success: function(res) {
              that.setData({
                order_list: res.data,
                order_list_length: res.data.length

              })
              if (res.data.order_list_length != that.data.meal_number) {
                that.setData({
                  is_show: true
                })
              }
            }

          })
        } else {
          wx.showToast({
            title: '签单失败，联系美容院',
            icon: 'none',
            duration: 2000
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
    var that = this;

    if (app.globalData.ischange) {
      that.setData({
        is_show: false
      })
      wx.request({
        url: app.globalData.url + '/yuyue/selectdetailByUid?Uid=' + that.data.order_id + '',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        success: function(res) {
          that.setData({
            order_list: res.data,
            order_list_length: res.data.length

          })

          if (that.data.order_list_length != that.data.meal_number) {

            that.setData({
              is_show: true
            })

          }
          app.globalData.ischange = false;

        }

      })
    }
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