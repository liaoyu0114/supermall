<template>
  <div class="back-top">
    <img src="~assets/img/common/top.png" alt="">
  </div>
</template>

<script>
  export default {
    name: "BackTop"
  }
</script>

<style scoped>
 .back-top {
   position: fixed;
   right: 0.2vw;
   bottom: 6.8vh;
   z-index: 9;
 }
 .back-top img {
   width: 6.2vh;
   }
</style>
