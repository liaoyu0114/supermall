<template>
    <swiper class="detail-swiper">
      <swiper-item v-for="(item, index) in topImages"
                   :key="index" :indicator-count="index">
        <img :src="item" alt="">
      </swiper-item>
    </swiper>
</template>

<script>
  import {Swiper, SwiperItem} from "components/common/swiper";

  export default {
    name: "DetailSwiper",
    components: {
      Swiper,
      SwiperItem
    },
    props: {
      topImages: {
        type: Array,
        default(){
          return []
        }
      }
    },
    data() {
      return {
        startSwiper: 0
      }
    },
    // methods: {
    //   detailImageLoad(index) {
    //     if (index == )
    //   }
    // }
  }
</script>

<style scoped>
 .detail-swiper{
   height: 38vh;
 }
  /*.detail-swiper img*/
</style>
