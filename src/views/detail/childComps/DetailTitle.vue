<template>
  <nav-bar>
    <div slot="left" class="back" @click="backClick">
      <img src="~assets/img/common/back.svg" alt="">
    </div>
    <div slot="center" class="title">
      <div class="title-item" v-for="(item,index) in titles"
           :class="{active: index === currentIndex}"
           @click="titleClick(index)">{{item}}</div>
    </div>
  </nav-bar>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar';

  export default {
    name: "DetailTitle",
    components: {
      NavBar
    },
    data() {
      return {
        titles: ['商品', '参数', '评论', '推荐'],
        currentIndex: 0
      }
    },
    methods: {
      //1.点击事件
      titleClick(index) {
        this.currentIndex = index;
        this.$emit('titleClick', index)
      },
      backClick() {
        this.$router.back();
      },
    }
  }
</script>

<style scoped>
  .back img{
    width: 2.8vh;
    margin: 1.85vh 0;
  }
  .title {
    display: flex;
    font-size: 2.1vh;
  }
  .title-item {
    flex: 1;
  }
  .active {
    color: var(--color-high-text);
  }
</style>
