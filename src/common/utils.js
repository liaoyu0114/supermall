// 防抖函数
export function debounce(func, delayTime) {
  let timer = null;
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delayTime)
  }
}
//格式化时间
export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    //RegExp.$1是/(y+)/.test(fmt)匹配到的对象，substr截取字符串
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
}
//前置添加0 4:4:4 => 04:04:04
function padLeftZero (str) {
  return ('00' + str).substr(str.length);
}
