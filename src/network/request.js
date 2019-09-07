import axios from 'axios'

//可能封装多个实例，建议
export function request(config) {

  //1.创建axios实例
  const instance = axios.create({
    baseURL: 'http://123.207.32.32:8000/api/v1',
    timeout: 5000
  });


  //2.axios拦截器
  //request传入两个参数
  // instance.interceptors.request.use(config => {
  //   //1.config中一些信息不符合服务器要求
  //   //2.比如每次发送网络请求时，都希望在界面中显示一个请求的 图标
  //   //3.某些网络请求比如登陆，必须携带一些特殊信息
  //   return config
  // }, error => {
  //   console.log(error);
  // });

  //response拦截器
  instance.interceptors.response.use(res => {
    // console.log(res);
    return res.data
  }, error => {
    console.log(error);
  })


  //3.发生网络请求
  return instance(config)
}
