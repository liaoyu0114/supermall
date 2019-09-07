<template>
  <div class="tabcontrol">
    <div v-for="(item, index) in titles" class="tabcontrol-item"
         :class="{active: index===currentIndex}" @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabControl",
    props: {
      titles: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        currentIndex: 0
      }
    },
    methods: {
      itemClick(index) {
        this.currentIndex = index;
      }
    }
  }
</script>

<style scoped>
 .tabcontrol {
   display: flex;
   text-align: center;
   height: 6vh;
   line-height: 40px;
   font-size: 4vw;
   /*font-weight: 600;*/
   background-color: white;
 }
  .tabcontrol-item {
    flex: 1;
  }
  .active span{
    border-bottom: 3px solid var(--color-high-text);
    padding: 5px;
    color: var(--color-tint);
  }
</style>
