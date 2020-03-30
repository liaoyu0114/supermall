import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation-types'

export default  {
  /**
   * 设计原则。mutation中的方法尽可能完成的事件比较单一
   * 做多个操作在vuex中无法区分是 count+1 或者添加新的商品
   * @param state
   * @param position
   */
  //定义方法,默认由一个 state参数
  changeHomeScrollHeight(state, position) {
    state.homeScrollHeight = position;
  },
  //已有商品增加count
  [ADD_COUNTER](state, payload) {
    payload.count++;
  },
  //购物车添加新商品
  [ADD_TO_CART](state, payload) {
    state.cartList.push(payload);
  }
}
