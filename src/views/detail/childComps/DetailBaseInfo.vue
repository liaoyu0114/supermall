<template>
  <div v-if="Object.keys(goods).length !== 0" class="base-info">
   <div class="info-title">{{goods.title}}</div>
    <div class="info-price">
      <span class="new-price">{{goods.newPrice}}</span>
      <span class="old-price">{{goods.oldPrice}}</span>
      <span class="discount" v-if="goods.discount">{{goods.discount}}</span>
    </div>
    <div class="info-other">
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <span>{{goods.services[goods.services.length-1].name}}</span>
    </div>
    <div class="info-services">
      <span class="info-services-item"
            v-for="index in goods.services.length-1">
        <img :src="goods.services[index - 1].icon" alt="">
        <span>{{goods.services[index-1].name}}</span>
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailBaseInfo",
    props: {
      goods: {
        type: Object,
        default() {
          return {}
        }
      }
    }
  }
</script>

<style scoped>
  .base-info {
    margin-top: 1.4vw;
    padding: 0 8px;
    color: #999;
    border-bottom: 5px solid #f2f5f8;
  }

  .info-title {
    color: #222;
    font-size: 3.8vw;
  }

  .info-price {
    margin-top: 1.2vw;

  }

  .info-price .new-price {
    color: var(--color-high-text);
    font-size: 5vw;
  }

  .info-price .old-price {
    font-size: 3vw;
    margin-left: 1.2vw;
    text-decoration: line-through;
  }

  .info-price .discount {
    font-size: 2vw;
    padding: .6vw 1vw;
    color: #fff;
    background-color: var(--color-high-text);
    border-radius: 2.2vw;
    margin-left: 1vw;
    letter-spacing: 0.8vw;

    /*让元素上浮一些: 使用相对定位即可*/
    position: relative;
    top: -1.5vw;
  }

  .info-other {
    margin-top: 1.5vw;
    line-height: 2.8vw;
    display: flex;
    padding: 1vw 0 1.5vw 0;
    font-size: 2.5vw;
    border-bottom: 1px solid rgba(100,100,100,.1);
    justify-content: space-between;
  }

  .info-services {
    display: flex;
    justify-content: space-between;
    line-height: 5.6vw;
    padding: 1vw 0;
  }

  .info-services-item img {
    width: 3vw;
    position: relative;
    top: 0.5vw;
    margin-right: 0.5vw;
  }

  .info-services-item span {
    font-size: 3vw;
    color: #333;
  }
</style>
