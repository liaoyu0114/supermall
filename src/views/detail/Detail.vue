<template>
  <div id="goodDetail">
    <detail-nav-bar class="detail-nav"></detail-nav-bar>
    <scroll class="content" ref="scroll">
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo"
                         @imageLoad="detailImageLoad"></detail-goods-info>
    </scroll>

  </div>
</template>

<script>
  import Scroll from  'components/common/scroll/Scroll'

  import DetailNavBar from './childComps/DetailTitle'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import {getDetail, Goods, Shop} from "network/detail"

  export default {
    name: "Detail",
    components: {
      Scroll,
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo
    },
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {}
      }
    },
    created() {
      //1.保存传入的商品iid
      this.iid = this.$route.query.iid;
      //2.请求商品数据
      this.getDetails(this.iid);

    },
    methods: {
      //网络请求
      getDetails(iid) {
        getDetail(iid).then(res => {
          const data = res.result;
          this.topImages = data.itemInfo.topImages;
          this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

          // 4.获取店铺信息
          this.shop = new Shop(data.shopInfo)
          //
          this.detailInfo = data.detailInfo
        })
      },
      detailImageLoad() {
        this.$refs.scroll.refresh()
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
