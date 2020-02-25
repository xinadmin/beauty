const app = getApp()
//计数器
var interval = null;

//值越大旋转时间越长  即旋转速度
var intime = 50;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    guanbi: false,
    chou:true,
    red_packet:0,
    uId:"",
    color: [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5],
    //9张奖品图片
    images: ['/pages/img/item.png', '/pages/img/item1.png', '/pages/img/item.png', '/pages/img/item1.png', '/pages/img/item.png', '/pages/img/item1.png', '/pages/img/item.png', '/pages/img/item1.png', '/pages/img/item.png'],
    btnconfirm: '/pages/img/dianjichoujiang.png',
    clickLuck: 'clickLuck',
    luckPosition: 0,
  },

  cha:function(e){
    var that = this;
    that.setData({
      guanbi:false,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
     var that=this;
      that.setData({
        pay_money:options.pay_money,
        order_id:options.order_id
      }) 
    that.loadAnimation();
   

  },
  input: function (e) {
    var data = e.detail.value;
    this.setData({
      luckPosition: data
    })
  },


  //点击抽奖按钮
  clickLuck: function () {
    var e = this;
    wx.request({
      url: app.globalData.url + "/wechat/fenhongw5?money=" + e.data.pay_money + "&orderId=" + e.data.order_id + "&Uid=" + app.globalData.uid + "",
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        e.setData({
          red_packet: (res.data).toFixed(2)
        })

      }
    })
  
     
    //判断中奖位置格式
    if (e.data.luckPosition == null || isNaN(e.data.luckPosition) || e.data.luckPosition > 7) {
      wx.showModal({
        title: '提示',
        content: '请填写正确数值',
        showCancel: false,
      })
      return;
    }



    //设置按钮不可点击
    e.setData({
      btnconfirm: '/pages/img/dianjichoujiangd.png',
      clickLuck: '',
    })
    //清空计时器
    clearInterval(interval);
    var index = 0;
    console.log(e.data.color[0]);
    //循环设置每一项的透明度
    interval = setInterval(function () {
      if (index > 7) {
        index = 0;
        e.data.color[7] = 0.5
      } else if (index != 0) {
        e.data.color[index - 1] = 0.5
      }
      e.data.color[index] = 1
      e.setData({
        color: e.data.color,
      })
      index++;
    }, intime);

    //模拟网络请求时间  设为两秒
    var stoptime = 1500;
    setTimeout(function () {
      e.stop(e.data.luckPosition);
    }, stoptime)

  },

  //也可以写成点击按钮停止抽奖
  // clickStop:function(){
  //   var stoptime = 2000;
  //   setTimeout(function () {
  //     e.stop(1);
  //   }, stoptime)
  // },

  stop: function (which) {
    var e = this;
    //清空计数器
    clearInterval(interval);
    //初始化当前位置
    var current = -1;
    var color = e.data.color;
    for (var i = 0; i < color.length; i++) {
      if (color[i] == 1) {
        current = i;
      }
    }
    //下标从1开始
    var index = current + 1;

    e.stopLuck(which, index, intime, 10);
  },


  /**
   * which:中奖位置
   * index:当前位置
   * time：时间标记
   * splittime：每次增加的时间 值越大减速越快
   */
  stopLuck: function (which, index, time, splittime) {
    var e = this;
    //值越大出现中奖结果后减速时间越长
    var color = e.data.color;
    setTimeout(function () {
      //重置前一个位置
      if (index > 7) {
        index = 0;
        color[7] = 0.5
      } else if (index != 0) {
        color[index - 1] = 0.5
      }
      //当前位置为选中状态
      color[index] = 1
      e.setData({
        color: color,
      })
      //如果旋转时间过短或者当前位置不等于中奖位置则递归执行
      //直到旋转至中奖位置
      if (time < 200 || index != which) {
        //越来越慢
        splittime++;
        time += splittime;
        //当前位置+1
        index++;
        e.stopLuck(which, index, time, splittime);
      } else {
        //1秒后显示弹窗
        setTimeout(function () {
          if (which == 1 || which == 3 || which == 5 || which == 7) {
            //中奖
            wx.showModal({
              title: '提示',
              content: '恭喜中奖',
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  //设置按钮可以点击
                  e.setData({
                    btnconfirm: '/pages/img/dianjichoujiang.png',
                    clickLuck: 'clickLuck',
                  })
                  e.loadAnimation();
                }
              }
            })
          } else {
            //中奖
            wx.showModal({
              title: '提示',
              content: '恭喜获得消费返利金额',
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  //设置按钮可以点击
                  e.setData({
                    btnconfirm: '/pages/img/dianjichoujiang.png',
                    clickLuck: 'clickLuck',
                    guanbi: true,
                    chou:false
                  })
                  e.loadAnimation();
                }
              }
            })
          }
        }, 1000);
      }
    }, time);
  },
  //进入页面时缓慢切换
  loadAnimation: function () {
    var e = this;
    var index = 0;
    // if (interval == null){
    interval = setInterval(function () {
      if (index > 4
      ) {
        index = 0;
        e.data.color[7] = 0.5
      } else if (index != 0) {
        e.data.color[index - 1] = 0.5
      }
      e.data.color[index] = 1
      e.setData({
        color: e.data.color,
      })
      index++;
    }, 1000);
    // }  
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