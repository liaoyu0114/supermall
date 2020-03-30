<template>
  <div class="cart">
    <cart-nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </cart-nav-bar>
    <cart-list/>
    <cart-bottom-bar/>
  </div>
</template>

<script>
  import CartNavBar from 'components/common/navbar/NavBar'
  import CartList from './childComps/CartList'
  import CartBottomBar from './childComps/CartBottomBar'

  import { mapGetters } from 'vuex'

  export default {
    name: "Cart",
    components: {
      CartNavBar,
      CartList,
      CartBottomBar

    },
    computed: {
      // 使用对象展开运算符将 getter 混入 computed 对象中
      ...mapGetters([
        'cartLength',
        'cartList'
      ])
    }
  }
</script>

<style scoped>
  .nav-bar {
    color: white;
    background-color: var(--color-tint);
  }
</style>
