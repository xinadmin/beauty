//app.js

App({

  onLaunch: function () {
  },

  /**
  * 当小程序启动，或从后台进入前台显示，会触发 onShow
  */
  onShow: function (options) {
  },
  /**
  * 当小程序从前台进入后台，会触发 onHide
  */
  onHide: function () {

  },

  /**
  * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
  */
  onError: function (msg) {

  },
  globalData: {
    openId: '',//用户微信识别码
    ismember:'',//是否为购买298套盒后的会员
    ismeirongshi:'',//是否为美容师
    userkey: '',
    mapkey: '',
    city: "",//城市
    longitude: "",//经度
    latitude: "",//纬度
    username: "",
    logo: "",
    ischange:false,
    uid: "",//用户id
     url: "https://weixin.zhonyou.cn",//请求后台地址
     //url:"http://192.168.3.66/beauty_program",
    defaultCounty: ''//市区

  }

})