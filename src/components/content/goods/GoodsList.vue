<template>
  <div class="goods">
    <goods-list-item v-for="(item, index) in goods" :key="index" :goodsItem="item"/>
  </div>
</template>

<script>
  import GoodsListItem from './GoodListItem';

  export default {
    name: "GoodsList",
    props: {
      goods: {
        type: Array,
        default() {
          return []
        }
      }
    },
    methods: {
    },
    components: {
      GoodsListItem
    }
  }
</script>

<style scoped>
 .goods {
   display: flex;
   flex-wrap: wrap;
   /*均分空白地方*/
   justify-content: space-around;
   padding: 2%;
 }
</style>
