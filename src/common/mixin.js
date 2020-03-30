import {debounce} from "./utils";
import {TOP_DISTANCE} from "./const";
import BackTop from 'components/content/backtop/BackTop';


export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null
    }
  },
  mounted() {
    //传函数名，不要用括号
    const refresh = debounce(this.$refs.scroll.urefresh, 100);
    //保存这个函数
    this.itemImgListener = () => {
      refresh();
    };
    //监听itemImageLoad
    this.$bus.$on('itemImageLoad', this.itemImgListener);
  }
};

export const backTopMixin = {
  data() {
    return {
      //返回顶部按钮状态
      isShowBack: false,
    }
  },
  components: {
    BackTop
  },
  methods: {
    //点击back 返回到指定位置，
    backClick() {
      this.$refs.scroll.uscrollTo(0, 0, 1000)
    },
    listenShowBackTop(position) {
      this.isShowBack = -position.y > TOP_DISTANCE;
    }
  }
};
