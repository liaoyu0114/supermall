export function debounce(func, delayTime) {
  let timer = null;
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      //这里有个bug ‘Cannot read property 'apply' of undefined’
      func.apply(this);
    }, delayTime)
  }
}
