function getToday() {
  var now = new Date();
  var year = now.getFullYear();
  var month = now.getMonth() + 1;
  var day = now.getDate();
  var hour = now.getHours()
  var minute = now.getMinutes()
  var second = now.getSeconds()
  if (month < 10) {
    month = '0' + month;
  };
  if (day < 10) {
    day = '0' + day;
  };
  if (hour < 10) {
    hour = '0' + hour;
  };
  if (minute < 10) {
    minute = '0' + minute;
  };
  // 如果需要时分秒 

  var formatDate = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':'  + second ;
  return formatDate;
}
//把函数添加到对象属性里 
module.exports = {
  getToday: getToday
}
