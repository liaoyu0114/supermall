<template>
  <div id="goodDetail">
    <detail-nav-bar class="detail-nav" ref="nav" @titleClick="titleClick"/>
    <scroll class="content" ref="scroll"
            @scrollPosition="contentScroll"
            :probe-type=3>
      <detail-swiper :topImages="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo"
                         @imageLoad="detailImageLoad"/>
      <detail-param-info :param-info="paramInfo" ref="params"/>
      <detail-comment-info :comment-info="commentInfo" ref="comment"/>
      <goods-list :goods="goodsList" ref="recommends"/>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"/>
    <back-top @click.native="backClick" v-if="isShowBack"/>
  </div>
</template>

<script>
  import Scroll from  'components/common/scroll/Scroll'
  import GoodsList from 'components/content/goods/GoodsList'

  import DetailNavBar from './childComps/DetailTitle'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'
  import DetailCommentInfo from './childComps/DetailCommentInfo'
  import DetailBottomBar from './childComps/DetailBottomBar'

  import {getDetail, getRecommend, Goods, Shop, GoodsParam} from "network/detail"
  import {debounce} from "common/utils";
  import {itemListenerMixin, backTopMixin} from "common/mixin";

  import {mapActions} from 'vuex';

  export default {
    name: "Detail",
    components: {
      Scroll,
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      GoodsList
    },
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        res: {},
        commentInfo: {},
        goodsList: [],
        themesTopYs: [],
        getThemeTopY: null,
        currentIndex: 0
      }
    },
    mixins: [itemListenerMixin, backTopMixin],
    created() {
      //1.保存传入的商品iid
      this.iid = this.$route.query.iid;
      //2.请求商品数据
      this.getDetails(this.iid);
      this.getRecommend();
      //对获取offsetTop进行防抖操作
      this.getThemeTopY = debounce(() => {
        this.themesTopYs.push(0);
        this.themesTopYs.push(this.$refs.params.$el.offsetTop);
        this.themesTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themesTopYs.push(this.$refs.recommends.$el.offsetTop);
        this.themesTopYs.push(Number.MAX_VALUE);
      }, 100)
    },
    methods: {
      //vuex中actions函数映射
      ...mapActions([
        'addCart'
      ]),
      //网络请求商品详情
      getDetails(iid) {
        getDetail(iid).then(res => {
          const data = res.result;
          this.res = data;
          // 1.获取轮播图信息
          this.topImages = data.itemInfo.topImages;
          // 2.获取商品服务信息
          this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);
          // 3.获取店铺信息
          this.shop = new Shop(data.shopInfo);
          //获取商品详细信息
          this.detailInfo = data.detailInfo;
          // 5.保存参数信息
          this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);
          // 6.保存评论数据
          if (data.rate.list) {
            this.commentInfo = data.rate.list[0];
          }
          //等数据接受并渲染完成后调用nextTick
          // this.$nextTick(() => {
          //   this.themesTopYs.push(0);
          //   this.themesTopYs.push(this.$refs.params.$el.offsetTop);
          //   this.themesTopYs.push(this.$refs.comment.$el.offsetTop);
          //   this.themesTopYs.push(this.$refs.recommends.$el.offsetTop);
          //   console.log(this.themesTopYs);
          // });
        })
      },
      //推荐数据s
      getRecommend() {
        getRecommend().then(res => {
          this.goodsList = res.data.list
        })
      },
      //监听详情图片加载完成
      detailImageLoad() {
        debounce(this.$refs.scroll.urefresh, 50);
        // this.$refs.scroll.urefresh();
        //商品详情图片加载完成后，获取评论，参数，推荐的offsetTop
        this.getThemeTopY();
      },
      //点击title滚动到对应的组件
      titleClick(index) {
        switch (index) {
          case 0:
            this.$refs.scroll.uscrollTo(0, -this.themesTopYs[0], 500);
            break;
          case 1:
            this.$refs.scroll.uscrollTo(0, -this.themesTopYs[1], 500);
            break;
          case 2:
            this.$refs.scroll.uscrollTo(0, -this.themesTopYs[2], 500);
            break;
          case 3:
            this.$refs.scroll.uscrollTo(0, -this.themesTopYs[3], 500);
            break;

        }
      },
      //判断title和滚动位置的关系
      contentScroll(position) {
        const positionY = position.y;

        let length = this.themesTopYs.length;
        /**
         * [0, 15816, 17088, 17304，MAX_VALUE]
         * positionY 在 0和15816 之间， index = 0
         * positionY 在 15816和17088 之间， index = 1
         * positionY 在 17088和17304 之间， index = 2
         * positionY 在 17304和MAX_VALUE 之间， index = 3
         */
        for (let i = 1; i < length- 1; i++) {
          if (this.currentIndex !== i && (-positionY >= this.themesTopYs[i]
            && -positionY < this.themesTopYs[i+1])) {
            this.currentIndex = i;
            this.$refs.nav.currentIndex = this.currentIndex;
          }
        }
        this.listenShowBackTop(position);
        /**
         * positionY和themeTop中的值对比，
         * 在themeTop[i] themeTop[i+1]之间，index = i
         * 判断方案一：
         */

        //  有bug
        //   for (let i = 0; i < length; i++){
        //     console.log(this.currentIndex);
        //     if (this.currentIndex !== i &&
        //       ((i < length - 1 && positionY >= this.themesTopYs[i] && positionY < this.themesTopYs[i+1]) ||
        //         (i === length - 1 && positionY >= this.themesTopYs[i]))) {
        //       this.currentIndex = i;
        //       console.log(this.currentIndex);
        //       this.$refs.nav.currentIndex = this.currentIndex;
        //     }
        //   }
        // }
      },
      addToCart() {
        //1.获取商品需要展示的信息
        const product = {};
        product.iid = this.iid;
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        //2.将商品加入购物车
        // this.$store.dispatch('addCart', product).then(res => {
        //
        // })
        //映射使用方法
        this.addCart(product).then(res => {

        })
      }
    }
  }
</script>

<style scoped>
 #goodDetail {
   position: relative;
   height: 100vh;
   z-index: 1;
   background-color: #ffffff;
 }
 .detail-nav {
   position: relative;
   z-index: 2;
   background-color: white;
 }
 .content {
   position: absolute;
   top: 6.5vh;
   bottom: 58px;
   left: 0;
   right: 0;
 }

</style>
