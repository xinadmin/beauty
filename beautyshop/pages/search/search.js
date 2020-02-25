var Util = require('../../utils/util.js');
const app = getApp();
Page({
  data: {
    // 搜索框状态
    inputShowed: false,
    // 搜索框值
    inputVal: "",
    //搜索渲染推荐数据
    list: [
      { name: "面膜" },
      { name: "依梵妮套盒" },
      { name: "养生套盒" },
      { name: "原液" },
      { name: "护肤水" }
    ],
    danpin_produce: [
    ],
  },
  // 显示搜索框
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  // 隐藏搜索框样式
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  // 清除搜索框值
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  // 获取搜索框值
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
    console.log(this.data.inputVal);
  },
  // 搜索
  search: function (e) {
    var that = this;
    // var inputVal = that.data.inputVal
    // that.setData({
    //   inputVal: "",
    // });
    console.log(that.data.inputVal)
    wx.request({
      url: app.globalData.url + '/zongkunPrduct/selProByPname',
      method: 'POST',
      data: Util.json2Form({
        pname: that.data.inputVal
      }),
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          danpin_produce: res.data,
          inputVal: ""
        });
      }
    })
  },
  // 获取选中推荐列表中的值
  btn_name: function (res) {
    console.log(res),
    console.log(res.currentTarget.dataset.index, res.currentTarget.dataset.name);
    this.setData({
      inputVal: "",
    });
  }
});
