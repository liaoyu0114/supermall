<template>
  <div class="recommend">
    <div v-for="item in recommends" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "RecommendView",
    props: {
      recommends: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
 .recommend {
   width: 100vw;
   display: flex;
   text-align: center;
   margin: 1vw 0 0 0;
   padding-bottom: 3vw;
   border-bottom: 1.5vh solid #eee;
   font-size: 4vw;
 }
  .recommend-item {
    flex: 1;
    margin: 1.5vw 2vw;
  }
 .recommend-item img {
   width: 20vw;

 }
 .recommend-item div {
   margin: 5px 0 20px 0;
 }
</style>
