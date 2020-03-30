<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街{{store.startTimer()}}</div>
    </nav-bar>
    <tab-control :titles="['流行', '新款', '精选']" class="tabcontrol-fixed"
                 @tabClick="tabClick" ref="tabControlFixed" v-show="isShowTabControl"></tab-control>

    <scroll class="scroll" ref="scroll" :probe-type="3"
            :pull-up-load="true"
            @scrollPosition="currentPosition"
            @pillingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control :titles="['流行', '新款', '精选']"
                   @tabClick="tabClick" ref="tabControl"></tab-control>
      <goods-list :goods="goods[currentType].list"/>
    </scroll>
    <!--对组件使用实践要加。native修饰符-->
    <back-top @click.native="backClick" v-if="isShowBack"></back-top>

  </div>

</template>

<script>
  import NavBar from 'components/common/navbar/NavBar';
  import Scroll from  'components/common/scroll/Scroll'

  import TabControl from 'components/content/tabcontrol/TabControl';
  import GoodsList from 'components/content/goods/GoodsList';

  import HomeSwiper from './childComps/HomeSwiper';
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'

  import {getHomeMultidata, getHomeGoods} from "network/home";
  import {debounce} from "common/utils";
  import {itemListenerMixin, backTopMixin} from "common/mixin";


  export default {
    name: "Home",
    components: {
      NavBar,
      Scroll,
      TabControl,
      GoodsList,
      HomeSwiper,
      RecommendView,
      FeatureView
    },
    data() {
      return {
        //轮播图
        banners: [],
        //推荐信息
        recommends: [],
        //商品列表
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        //商品类型
        currentType: 'pop',
        //tabControl距离顶部高度
        tabOffsetTop: 0,
        //是否展示吸顶效果的tabControl
        isShowTabControl: false,
        //已滑动距离
        scrolledPosition: 0
      }
    },
    mixins: [itemListenerMixin, backTopMixin],
    created() {
      // //1.请求多个数据
      this.getHomeMultidata();
      //2.请求商品数据
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');
    },
    activated() {
      /**
       * 每次重新进入home组件，scrollerHeight都会被重置为0
       * 于是使用vuex记录离开时的scrollerHeight
       * 再次进入home组件时，将beterscroll的scrollerHeight设置为保存的scrollerHeight
       */
      this.$refs.scroll.scroll.scrollerHeight = this.$store.state.homeScrollHeight;
      this.$refs.scroll.urefresh();
      //返回离开前的位置，即保留用户以滑动的状态
      this.$refs.scroll.uscrollTo(0, this.scrolledPosition, 0);
      this.$refs.scroll.urefresh();
    },
    deactivated() {
      //获取已经滑动的高度
      this.scrolledPosition = this.$refs.scroll.getPositionY();
      //记录此时可滚动区域高度
      this.$store.commit('changeHomeScrollHeight', this.$refs.scroll.scroll.scrollerHeight);
      //取消全局事件监听 事件名，响应方法名
      this.$bus.$off('imageLoad', this.itemImgListener);
    },
    methods: {
      //获取首页数据
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      //获取首页商品
      getHomeGoods(type) {
        const page = this.goods[type].page + 1;
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page += 1 ;

          //完成加载更多
          this.$refs.scroll.ufinishPullUp();
        });

      },
      //加载更多
      loadMore() {
        //请求此时显示类别的下一页数据
        console.log('loadmore');
        this.getHomeGoods(this.currentType);
      },
      currentPosition(position) {
        this.listenShowBackTop(position);

        //吸顶TabControl的隐藏/显示，使用v-if。
        this.isShowTabControl = -position.y > this.tabOffsetTop;
      },
      //轮播图加载完成后获取tabControl的offsetTop
      swiperImageLoad(){
        // //所有组件都有$el ,用于获取组件内元素
        this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop;
      },

      /**
       * 点击事件
       */
      //tabcontrol点击切换对应数据传入goodslist
      tabClick(index) {
        switch (index) {
          case 0 :
            this.currentType = 'pop';
            break
          case 1 :
            this.currentType = 'new';
            break
          case 2 :
            this.currentType = 'sell';
            break
        }
        //同步吸顶tabcontrol和滚动tabcontrol的选中状态
        this.$refs.tabControl.currentIndex = index;
        this.$refs.tabControlFixed.currentIndex = index;
      },

    }
  }


</script>

<style scoped>
  #home {
    /*padding-top: 6.5vh;*/
    height: 100vh;
    position: relative;
  }
  .home-nav {
    color: white;
    background-color: var(--color-tint);
    /*使用原生滚动让homenav不滚动*/
    /*position: fixed;*/
    /*top: 0;*/
    /*left: 0;*/
    /*right: 0;*/
    /*z-index: 1;*/
  }
  /*.tabcontrol {*/
    /*position: sticky;*/
    /*top: 6.5vh;*/
    /*z-index: 9;*/
  /*}*/
  .scroll {
    position: absolute;
    top: 6.5vh;
    bottom: 49px;
    right: 0;
    left: 0;
    overflow: hidden;
  }
  .tabcontrol-fixed {
    position: relative;
    z-index: 9;
  }
</style>
