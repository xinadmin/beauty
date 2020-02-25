const app = getApp();
var Util = require('../../utils/util.js');



Page({

  /**
   * 页面的初始数据
   */
  data: {
    radioItems: [],
    array: ['请选择', '脸部按摩', '身体按摩'],
    indexs: 0,
    hidden: false,
    date: '请选择', //日期
    current_data: "",
    time: '请选择', //开始时间
    timess: '', //结束时间
    renming: "", //美容师
    selected: 1,
    mid: "", //mid
    yuyue_id: 1,
    start_time: "",
    end_time: "",
    shop_id: ""
  },
  check_seledct:function() {
    var that=this;
    if (that.data.mid != "") {
      if (that.data.start_time == "") {
        return
      } else if (that.data.end_time == "") {
        return;
      } else {
        var select_val = that.data.renming
        wx.request({
          url: app.globalData.url + '/yuyue/selectBytime?startTime=' + that.data.start_time + '&endTime=' + that.data.end_time + '&beactucianName=' + select_val + '',
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          success: function (res) {
            console.log(res).data;
            that.setData({
              selected: res.data
            })

          }

        })
      }

    }
  },
  radioChange: function(e) {
    var that = this;
    var ren = e.detail.value

    var wen = ren.split("-");
    that.setData({
      renming: wen[0],
      mid: wen[1]
    })
    this.check_seledct();

    // if (that.data.mid != "") {
    //   if (that.data.start_time == "") {
    //     return
    //   } else if (that.data.end_time == "") {
    //     return;
    //   } else {
    //     var select_val = that.data.renming
    //     wx.request({
    //       url: app.globalData.url + '/yuyue/selectBytime?startTime=' + that.data.start_time + '&endTime=' + that.data.end_time +            '&beactucianName=' + select_val + '',
    //       method: 'GET',
    //       headers: {
    //         'Content-Type': 'application/json'
    //       },
    //       success: function(res) {
    //         console.log(res).data;
    //         that.setData({
    //           selected: res.data
    //         })

    //       }

    //     })
    //   }

    // }


  },

  //选择服务
  bindPickerChange: function(e) {
    if (this.data.mid == "") {
      wx.showToast({
        title: '请先选择美容师',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    this.setData({
      indexs: e.detail.value
    })
    this.check_seledct();
  },
  //选择日期
  bindDateChange: function(e) {
    if (this.data.mid == "") {
      wx.showToast({
        title: '请先选择美容师',
        icon: 'none',
        duration: 2000
      })
      return;
    }

    this.setData({
      date: e.detail.value
    })
    if (this.data.time == "请选择") {
      return
    } else {
      var start_time = this.data.date + " " + this.data.time + ":00"
      var end_time = this.data.date + " " + this.data.timess + ":00"
      var select_val = this.data.renming
      if (select_val == "") {
        wx.showToast({
          title: '请先选择美容师！！',
          icon: 'none',
          duration: 2000
        })
        return
      }
      this.setData({
        end_time: end_time,
        start_time: start_time
      })

      wx.request({
        url: app.globalData.url + '/yuyue/selectBytime?startTime=' + start_time + '&endTime=' + end_time + '&beactucianName=' + select_val + '',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        success: function(res) {
          console.log(res.data);
          this.setData({
            selected: res.data
          })
          if (res.data == 1) {
            wx.showToast({
              title: '当前选择的时间段已经有人预约了',
              icon: 'none',
              duration: 2000
            })
          }
        }

      })
    }
  },
  //选择时间
  bindTimeChange: function(e) {
    if (this.data.mid == "") {
      wx.showToast({
        title: '请先选择美容师',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    var that = this;

    var times = e.detail.value.split(":");
    var timesr = parseInt(times[0]) + 1 + ':' + times[1];
    that.setData({
      time: e.detail.value,
      timess: timesr
    })
    if (that.data.date == "请选择") {
      return
    } else {
      var start_time = that.data.date + " " + that.data.time + ":00"
      var end_time = that.data.date + " " + that.data.timess + ":00"
      var select_val = that.data.renming
      that.setData({
        end_time: end_time,
        start_time: start_time
      })

      wx.request({
        url: app.globalData.url + '/yuyue/selectBytime?startTime=' + start_time + '&endTime=' + end_time + '&beactucianName=' + select_val + '',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        success: function(res) {
          console.log(res.data);
          
          that.setData({
            selected: res.data
          })

        }
      })
    }


  },

  //提交免费预约
  freeBooking: function(e) {
    var that = this;
    if (that.data.date == "请选择") {
      wx.showToast({
        title: '请填写服务日期',
        icon: 'none',
        duration: 2000
      })
      return;
    } else if (that.data.time == "请选择") {
      wx.showToast({
        title: '请填写服务时间',
        icon: 'none',
        duration: 2000
      })
      return;
    } else if (that.data.array[that.data.indexs] == "请选择") {
      wx.showToast({
        title: '请填写服务内容',
        icon: 'none',
        duration: 2000
      })
      return;
    } else if (that.data.selected==1) {
      wx.showToast({
        title: '当前选择的时间段已经有人预约了',
        icon: 'none',
        duration: 2000
      })
      return;
    } else {

      wx.request({
        url: app.globalData.url + '/yuyue/insertdetail',
        method: 'POST',
        data: Util.json2Form({
          uid: that.data.yuyue_id,
          fuwu_meirongshi_id: that.data.mid,
          beautician_name: that.data.renming, //选择的美容师id
          fuwu_times: that.data.start_time,
          xuanze_meirongshi_times: that.data.end_time, //预约详情的id，
          yuyue_body: that.data.array[that.data.indexs],
        }),


        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success: function(res) {
          if (res.data == 1) {
            wx.showToast({
              title: '预约成功！！',
              duration: 2000
            })
            app.globalData.ischange = true;
            wx.navigateBack({
              changed: true
            });
          } else {
            wx.showToast({
              title: '预约失败',
              icon: 'none',
              duration: 2000
            })
          }


        }

      })
      return;
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var timestamp = Date.parse(new Date());
    var date = new Date(timestamp);
    //获取年份  
    var Y = date.getFullYear();
    //获取月份  
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    //获取当日日期 
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    console.log("当前时间：" + Y + '年' + M + '月' + D + '日');
    that.setData({
      yuyue_id: options.yuyue_id,
      shop_id: options.shop_id,
      tis: Y + '-' + M + '-' + D,
      tiss: Y+1 + '-' + M + '-' + D
    })
 
     
   

    wx.request({
      url: app.globalData.url + '/meirongyuan/meirongshibyshopid?shopId=' + that.data.shop_id + '',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        that.setData({
          radioItems: res.data
        })

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