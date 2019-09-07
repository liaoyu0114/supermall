<template>
  <div class="goodsitem">
    <img :src="goodsItem.show.img" alt="">
    <div class="description">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "GoodListItem",
    props: {
      goodsItem: {
        type: Object,
        default() {
          return {}
        }
      }
    }
  }
</script>

<style scoped>
  .goodsitem {
    position: relative;
    width: 46.5%;
    text-align: center;
    font-size: 3.2vw;
    /*font-weight: 500;*/
    padding-bottom: 8vh;
  }
  .goodsitem img {
    width: 100%;
    border-radius: 1vw;
  }
  .description {
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    margin-bottom: 1vh;
  }
  .description p {

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }
  .price {
    color: var(--color-high-text);
    margin-right: 4vw;
  }
  .description .collect {
    position: relative;
    padding-left: 1vw;
  }
  .description .collect:before {
    content: '';
    position: absolute;
    left: -3.2vw;
    /*top: -0.21vw;*/
    width: 3.2vw;
    height: 3.2vw;
    background: url("~assets/img/common/collect.svg") 0 0/3.2vw 3.2vw;
  }
</style>
