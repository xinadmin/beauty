//app.js
App({

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {

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
    province: "",//省份
    city: "",//城市
    longitude: "",//经度
    latitude: "",//纬度
    username: "",
    logo: "",
    uid: "",//用户id
    url: "https://food.zhonyou.cn",//请求后台地址
   //url: "http://192.168.3.66/catering_program",//请求后台地址
    defaultCounty: '',//市区
    avatarUrl:'',//获取用户头像
    nickName: '',//获取用户名称
    username:"",
    yaoqing_code:"",
    usertel:"",
    appid:"wx6702b95c0bab6e7e"
  }
})
