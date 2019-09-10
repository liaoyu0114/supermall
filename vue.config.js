// 配置
module.exports = {
  configureWebpack: {
    resolve: {
      //省略文件后缀
      // extensions: {},
      //配置文件别名
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
      }
    },
    devServer: {
      disableHostCheck: true
    }
  }
};
