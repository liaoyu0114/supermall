<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <!--使用v-bind动态绑定class//动态传入颜色，不确定使用计算属性-->
    <!--<div :class="{active: isActive}"><slot name="item-text"></slot></div>-->
    <div :style="activeStyle" class="text"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
  export default {
    name: "TabBarItem",
    props: {
      path: String,
      activeColor: {
        default: "#ff5777",
        type:String
      }
    },
    computed: {
      isActive() {
        //判断当前活跃route中是否有和传入的path的相同路径
        // = -1 没有找到 = 1 找到了
        //active时 style动态决定颜色，使用v-bind绑定 在使用item时需要传入颜色
        return this.$route.path.indexOf(this.path) !== -1
      },
      activeStyle() {
        //如果处于活跃，添加{color: this.activeColor} 否则不添加
        return this.isActive ? {color: this.activeColor} : {}
      }
    },
    data() {
      return {
        // //不能写死，那个item活跃那个设置为true，可以用计算属性
        // isActive: true
      }
    },
    methods: {
      itemClick() {
        this.$router.replace(this.path)
        // console.log(this.path);
      }
    }
  }
</script>
<style scoped>
  .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 6.7vh;
    font-size: 1.8vh;
    letter-spacing: 0.5vw;
  }

  .tab-bar-item img {
    width: 3.3vh;
    height: 3.3vh;
    margin-top: 0.8vh;
    vertical-align: middle;
    margin-bottom: 2px;
  }
  .text {
    position: relative;
    left: 0.25vw;
  }
  /*.active {*/
    /*color: #ff5777;*/
  /*}*/
</style>
