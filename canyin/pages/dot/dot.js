const app = getApp();

var getmenuBytypeId = function(that, typeId) {
  /**
   * 获取菜单信息
   */
  wx.request({
    url: app.globalData.url + '/menu/selectByBIdandtypeId',
    method: 'GET',
    data: {
      'bId': that.data.bid,
      'typeId': typeId
    },
    headers: {
      'Content-Type': 'application/json'
    },
    success: function(res) {
      if (res.data.length != 0) {

        var map = {};
        var datas = res.data;
        for (var i in datas)
          map[datas[i].mId] = datas[i];
        /**
         * 获取购物车信息 将数量塞入
         */
        wx.request({
          url: app.globalData.url + '/carts/list',
          method: 'GET',
          data: {
            'Tid': 0,
            'Uid': app.globalData.uid,
            'Bid': that.data.bid
          },
          headers: {
            'Content-Type': 'application/json'
          },
          success: function(re) {
            for (var i in re.data) { //购物车循环
              if (map[re.data[i].mId] != null) {
                map[re.data[i].mId].carNum = re.data[i].num; //将数量插入
              }

            }
            that.setData({
              carArray: map,
            });

          }

        })

      } else {
        that.setData({
          carArray: [],
        });
      }

    }
  })
}

var getcartlist = function(that) {
  /**
   * 获取购物车信息
   */
  wx.request({
    url: app.globalData.url + '/carts/list',
    method: 'GET',
    data: {
      'Tid': that.data.tid,
      'Uid': app.globalData.uid,
      'Bid': that.data.bid
    },
    headers: {
      'Content-Type': 'application/json'
    },
    success: function(res) {
      that.setData({
        cartArray: res.data,
      });

    }

  })
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selected: true,
    selected1: false,
    selected2: false,
    navbar: [],
    currentNavbar: '0',
    navbar_a: [],
    currentNavbar_a: '0',
    showModal: false, //弹窗
    carArray: [], //菜单
    carlen: '0',
    carMoney: '0',
    cartArray: [], //购物车
    mName: '',
    mPrice: '0',
    mImg: '',
    tid: "0", //桌号
    bid: "1", //店铺id
    bName: "", //店铺名
    shop: [],
    type: '', //订餐状态
    typeID: 0
  },
  selected: function(e) {
    var that = this
    getmenuBytypeId(this, that.data.typeID) //重新加载菜单信息
    this.setData({
      selected1: false,
      selected2: false,
      selected: true,
    })

  },

  //购物车
  selected1: function(e) {
    var that = this;
    getcartlist(that)
    this.setData({

      selected1: true,
      selected2: false,
      selected: false,
    })



  },

  selected2: function(e) {

    this.setData({
      selected: false,
      selected1: false,
      selected2: true,

    })

  },
  // 关闭弹窗
  go: function() {
    this.setData({
      showModal: false
    })
  },
  settlement: function() {
    var that = this;
    if (that.data.carMoney == '0') {
      wx.showModal({
        title: '提示',
        content: '请加购商品！',
        showCancel: false,
        confirmColor: '#007aff',
      })
    } else {
      wx.navigateTo({
        url: '/pages/settlement/settlement?tid=' + that.data.tid + '&bid=' + that.data.bid + '&bName=' + that.data.shop.bShop + '&teaPosition=' + that.data.shop.teaPosition + '&type=' + that.data.type,
      })
    }

  },
  // 确认关闭弹窗
  order_take: function() {
    var that = this;
    that.setData({
      showModal: false
    })
  },
  /**
   * 切换 navbar_a
   */
  swichNav_a(e) {

    this.setData({
      currentNavbar_a: e.currentTarget.dataset.idx
    })
  },
  /**
   * 切换 navbar
   */
  swichNav(e) {
    var that = this;
    getmenuBytypeId(that, e.currentTarget.dataset.id)

    that.setData({
      currentNavbar: e.currentTarget.dataset.idx,
      typeID: e.currentTarget.dataset.id
    })
  },

  carAdd: function(event) {
    var that = this;
    var index = event.target.dataset.id; //获取菜单id
    that.data.carArray[index].carNum = that.data.carArray[index].carNum + 1; //数量新增
    that.setData({
      carArray: that.data.carArray,
      carMoney: (parseFloat(that.data.carArray[index].mPrice) + parseFloat(that.data.carMoney)).toFixed(2),
      carlen: parseInt(that.data.carlen) + 1
    })

    wx.request({
      url: app.globalData.url + '/carts/insert',
      method: 'GET',
      data: {
        "tId": that.data.tid,
        "mId": event.target.dataset.id,
        "uId": app.globalData.uid,
        "bId": that.data.bid,
        "num": 1
      },
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        if (res.data < 1) {
          wx.showToast({
            title: '添加失败，',
            icon: 'none',
            duration: 1000
          })
        }
      }

    })
    // console.log(that.data.carArray[index].mSpec)
    // that.setData({
    //   showModal: true,
    //   navbar_a: JSON.parse(that.data.carArray[index].mSpec)
    // });

  },
  //数量减少
  carReduce: function(event) {
    var that = this;
    var index = event.target.dataset.id; //获取菜单id
    if (that.data.carArray[index].carNum == 0) {

    } else {
      that.data.carArray[index].carNum = that.data.carArray[index].carNum - 1; //数量减少
      that.setData({
        carArray: that.data.carArray,
        carMoney: (parseFloat(that.data.carMoney) - parseFloat(that.data.carArray[index].mPrice)).toFixed(2),
        carlen: parseInt(that.data.carlen) - 1
      })
      var url = "";

      wx.request({
        url: app.globalData.url + '/carts/reducesnum',
        method: 'GET',
        data: {
          "tId": that.data.tid,
          "mId": event.target.dataset.id,
          "uId": app.globalData.uid,
          "bId": that.data.bid
        },
        headers: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function(res) {
          if (res.data < 1) {
            wx.showToast({
              title: '修改失败，请重试！',
              icon: 'none',
              duration: 1000
            })
          }
        }

      })
    }

  },
  cartAdd: function(event) {
    var that = this;

    var i = event.target.dataset.alphaBeta;
    var index = event.target.dataset.id; //获取菜单id
    that.data.cartArray[i].num = parseFloat(that.data.cartArray[i].num) + 1;

    wx.request({
      url: app.globalData.url + '/carts/updatenum',
      method: 'GET',
      data: {
        "cId": that.data.cartArray[i].cId,
        "Num": parseInt(that.data.cartArray[i].num)
      },
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        if (res.data < 1) {
          wx.showToast({
            title: '添加失败，',
            icon: 'none',
            duration: 1000
          })
        }
      }

    })

    that.setData({
      carArray: that.data.carArray,
      carMoney: (parseFloat(that.data.cartArray[i].menu.mPrice) + parseFloat(that.data.carMoney)).toFixed(2),
      carlen: parseInt(that.data.carlen) + 1,
      cartArray: that.data.cartArray
    })
  },
  cartReduce: function(event) {
    var that = this;
    var i = event.target.dataset.alphaBeta;
    var index = event.target.dataset.id; //获取菜单id

    if (that.data.cartArray[i].num == 1) { //如果数量为1则删除
      that.data.cartArray
      wx.request({
        url: app.globalData.url + '/carts/deleteCart',
        method: 'GET',
        data: {
          "cId": that.data.cartArray[i].cId
        },
        headers: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function(res) {
          if (res.data < 1) {
            wx.showToast({
              title: '操作失败，',
              icon: 'none',
              duration: 1000
            })
          } else {
            getcartlist(that)
          }
        }

      })
    } else { //否则减少数量
      that.data.cartArray[i].num = parseFloat(that.data.cartArray[i].num) - 1;

      wx.request({
        url: app.globalData.url + '/carts/updatenum',
        method: 'GET',
        data: {
          "cId": that.data.cartArray[i].cId,
          "Num": parseInt(that.data.cartArray[i].num)
        },
        headers: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function(res) {
          if (res.data < 1) {
            wx.showToast({
              title: '操作失败，',
              icon: 'none',
              duration: 1000
            })
          }
        }

      })
    }

    that.setData({
      carArray: that.data.carArray,
      carMoney: (parseFloat(that.data.carMoney) - parseFloat(that.data.cartArray[i].menu.mPrice)).toFixed(2),
      carlen: parseInt(that.data.carlen) - 1,
      cartArray: that.data.cartArray
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    console.log(options)

    if (options != undefined) {
      that.setData({
        bid: options.bid,
        type: options.type
      })
      if (options.tid != undefined) {
        that.setData({
          tid: options.tid
        })
        console.log(that.data)
      }
    }

    //获取分类信息
    wx.request({
      url: app.globalData.url + '/menu/selectMenuTypeBybId',
      method: 'GET',
      data: {
        'bId': that.data.bid
      },
      headers: {
        'Content-Type': 'application/json'
      },
      success: function(re) {
        if (re.data.length != 0) {
          that.setData({
            typeID: re.data[0].typeId
          })
        }
        that.setData({
          navbar: re.data,
        })
        console.log(re.data);
        /**
         * 获取菜单信息
         */
        wx.request({
          url: app.globalData.url + '/menu/selectByBIdandtypeId',
          method: 'GET',
          data: {
            'bId': that.data.bid,
            'typeId': that.data.typeID
          },
          headers: {
            'Content-Type': 'application/json'
          },
          success: function(res) {
            var map = {};
            var datas = res.data;
            for (var i in datas)
              map[datas[i].mId] = datas[i];

            /**
             * 获取购物车信息 将数量塞入
             */
            wx.request({
              url: app.globalData.url + '/carts/list',
              method: 'GET',
              data: {
                'Tid': that.data.tid,
                'Uid': app.globalData.uid,
                'Bid': that.data.bid
              },
              headers: {
                'Content-Type': 'application/json'
              },
              success: function(re) {
                that.data.carlen = 0;
                var carMoneys = 0.00;
                var carlens = 0;
                for (var i in re.data) { //购物车循环

                  if (map[re.data[i].mId] != null) {
                    map[re.data[i].mId].carNum = re.data[i].num; //将数量插入
                  }

                  carMoneys = ((parseFloat(re.data[i].menu.mPrice) * re.data[i].num) + parseFloat(carMoneys)).toFixed(2);
                  carlens = parseInt(re.data[i].num) + parseInt(carlens)
                }


                that.setData({
                  carArray: map,
                  carMoney: carMoneys,
                  carlen: carlens,

                });

              }

            })


          }
        })

      }

    })

    wx.request({
      url: app.globalData.url + '/business/selectBybId',
      method: 'GET',
      data: {
        'bId': that.data.bid
      },
      headers: {
        'Content-Type': 'application/json'
      },
      success: function(re) {
        console.log(re)
        that.setData({
          shop: re.data,
          bid: that.data.bid
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
    var that = this;
    that.onLoad();

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