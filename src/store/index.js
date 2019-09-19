import Vue from 'vue'
import Vuex from 'vuex'

//1.安装插件
Vue.use(Vuex)

//2.创建对象

const store = new Vuex.Store({
  state: {
  //  保存状态
    counter: 1000
  },
  mutations: {
  //定义方法,默认由一个 state参数
    increment(state) {
      state.counter++
    },
    decrement(state) {
      state.counter--
    }
  },
  actions: {
  //做异步操作时z
  },
  getters: {
  //类似于computed，返回计算后的值，默认state
    double(state) {
      return state.counter * state.counter
    }
  },
  modules: {

  }
})

export default store
