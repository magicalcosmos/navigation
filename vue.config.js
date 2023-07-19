module.exports = {
  publicPath: './',
  productionSourceMap: false,
  devServer: {
    open: true // 启动时自动在浏览器中打开
    // 代理跨域
    // proxy: {
    //   "/website": {
    //     target: "http://localhost:9093",
    //     changeOrigin: true,
    //     ws: true,
    //     // pathRewrite: {
    //     //   "^/api": ""
    //     // }
    //   }
    // }
  }
};
