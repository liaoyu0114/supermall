<template>
  <div class="wraper" ref="wraper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll';

  export default {
    name: "Scroll",
    props: {
      //beterscroll相关设置变量
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        scroll: null
      }
    },
    mounted() {
      //1.创建beterscroll对象
      this.scroll = new BScroll(this.$refs.wraper, {
        //设置轮动区域内部元素可点击
        click: true,
        //设置实时监控位置
        probeType: this.probeType,
        //上拉加载事件
        pullUpLoad: this.pullUpLoad
      });
      //2.监听滚动位置
      this.scroll.on('scroll', (position) => {
        this.$emit('scrollPosition', position)
      });

      //3.监听上拉加载
      if (this.pullUpLoad === true) {
        this.scroll.on('pullingUp', () => {
          //发送上拉加载事件
          this.$emit('pillingUp');
        })
      }
    },
    methods: {
      //返回顶部方法
      uscrollTo(x, y, time) {
        //调用这个方法的时候可能scroll组件还未挂载，导致无法调用methods的方法，所以先判断scroll是否存在
        this.scroll && this.scroll.scrollTo(x, y, time);
      },
      //加载完成刷新滑动区域高度
      ufinishPullUp() {
        this.scroll && this.scroll.finishPullUp();
      },
      //刷新方法
      urefresh() {
        this.scroll && this.scroll.refresh();
      },
      //返回已滚动Y值
      getPositionY() {
        return this.scroll.y
      }

    }
  }
</script>

<style scoped>

</style>
