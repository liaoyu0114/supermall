<template>
  <div class="tabcontrol" >
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
        //记录选择状态
        currentIndex: 0
      }
    },
    methods: {
      itemClick(index) {
        this.currentIndex = index;
        this.$emit('tabClick', index);
      }
    }
  }
</script>

<style scoped>
 .tabcontrol {
   display: flex;
   text-align: center;
   height: 6vh;
   line-height: 6vh;
   font-size: 2.5vh;
   /*font-weight: 600;*/

   margin-bottom: 0.5vh;
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
  @media screen and (max-device-width: 370px) {

  }
</style>
