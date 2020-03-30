import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
//1.安装插件
Vue.use(Vuex)

const state =  {
  //  保存状态
  homeScrollHeight: 0,
  cartList: [{
    iid: '1m70y5k',
    image: '//s11.mogucdn.com/mlcdn/c45406/180808_600abce0g8dc8i4f6ic7k27i7837l_640x960.jpg',
    title: '2018秋季新款韩版百搭格子长袖衬衫+前短后长针织气质开衫外套+高腰直筒九分牛仔裤三件套装',
    desc: '2018秋季新款韩版百搭格子长袖衬衫+前短后长针织气质开衫外套+高腰直筒九分牛仔裤三件套装',
    price: '59.00',
    checked: false,
    count: 1
  }]
};
//2.创建对象
const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {
    //引入多个store对象
  }
});

export default store
