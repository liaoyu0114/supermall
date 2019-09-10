<template>
  <swiper ref="homeSwiper">
    <swiper-item v-for="(item, index) in banners" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper, SwiperItem} from "components/common/swiper";

  export default {
    name: "HomeSwiper",
    data() {
      return {
        isImageLoad: false
      }
    },
    components: {
      Swiper,
      SwiperItem
    },
    props: {
      banners: {
        type: Array,
        default() {
          return []
        }
      }
   },
    methods: {
      imageLoad() {
        /**
         *  只需要发送一次，实现：使用isImageLoad记录状态,
         *  第一次加载发送事件，第二次
         */
        if (!this.isImageLoad){
          this.$emit('swiperImageLoad');
          this.isImageLoad = true;
        }
      }
    }
  }
</script>

<style scoped>

</style>
