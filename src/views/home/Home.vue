<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control :titles="['流行', '新款', '精选']" class="tabcontrol-fixed"
                 @tabClick="tabClick" ref="tabControlFixed" v-show="isShowTabControl"></tab-control>

    <scroll class="scroll" ref="homeScroll" :probe-type="3"
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
    <back-top @click.native="backClick" v-if="isShowBack"/>
  </div>

</template>

<script>
  import NavBar from 'components/common/navbar/NavBar';
  import Scroll from  'components/common/scroll/Scroll'

  import TabControl from 'components/content/tabcontrol/TabControl';
  import GoodsList from 'components/content/goods/GoodsList';
  import BackTop from 'components/content/backtop/BackTop';

  import HomeSwiper from './childComps/HomeSwiper';
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'

  import {getHomeMultidata, getHomeGoods} from "network/home";
  import {debounce} from "common/utils";


  export default {
    name: "Home",
    components: {
      NavBar,
      Scroll,
      TabControl,
      GoodsList,
      BackTop,
      HomeSwiper,
      RecommendView,
      FeatureView
    },

    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        currentType: 'pop',
        isShowBack: false,
        tabOffsetTop: 0,
        isShowTabControl: false,
        scrolledPosition: 0
      }
    },

    created() {
      //不要再这里调用$refs,可能拿不到，挂载后再使用
      //1.请求多个数据
      this.getHomeMultidata();
      //2.请求商品数据
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');


    },
    activated() {
      /**
       * 原本有使用keep-alive无法实现状态记录的bug添加这行代码，但是目前可以
       */
      this.$refs.homeScroll.scroll.scrollTo(0, this.scrolledPosition, 0);
      this.$refs.homeScroll.refresh();
    },
    deactivated() {
      this.scrolledPosition = this.$refs.homeScroll.getPositionY();

      console.log(this.scrolledPosition);
    },
    mounted() {
      //监听goodsitem图片加载完成
      const refresh = debounce(this.$refs.homeScroll.refresh());
      this.$bus.$on('itemImageLoad', () => {
        // console.log('1');
        // refresh();
        this.$refs.homeScroll.refresh();

      })

    },

    methods: {
      /**
       *网络请求相关方法
       */
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1;
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page += 1 ;

          //完成加载更多
          this.$refs.homeScroll.finishPullUp();
        });

      },
      loadMore() {
        // console.log(1);
        //请求此时显示类别的下一页数据
        this.getHomeGoods(this.currentType);

        // //不调用这个方法会造成可滚动区域变小，因为在加载图片的时候，如果在beterscroll计算可滚动区域完成以后图片才加载出来，
        // //此时可滚动区域仅为商品列表无图片的大小，就会出现只能滑动一小部分便开始加载下一页
        // this.$refs.scroll.scroll.refresh();
      },
      //backtop的隐藏/显示，使用v-if。
      currentPosition(position) {
        this.isShowBack = -position.y > 1000;
        this.isShowTabControl = -position.y > this.tabOffsetTop;
      },
      swiperImageLoad(){
        // //所有组件都有$el ,用于获取组件内元素
        this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop;
        // console.log(this.tabOffsetTop);
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
      //点击back 返回到指定位置，
      backClick() {
        this.$refs.homeScroll.uscrollTo(0, 0)
      }
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
