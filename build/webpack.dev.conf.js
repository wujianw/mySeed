var utils = require('./utils')
var path = require('path')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})


// views下文件夹为一个页面项目 开发环境下通过 HtmlWebpackPlugin插件 打入内存
var pages = utils.pagesPath.map((page) => {
  return new HtmlWebpackPlugin({
    filename: `${page}.html`,
    chunks:[page],
    template: path.resolve(path.join(__dirname, '../src/views'), `${page}/index.html`)
  })
})

// https://github.com/ampedandwired/html-webpack-plugin
// 主页面
pages.push(new HtmlWebpackPlugin({
  filename: 'index.html',
  template: path.join(__dirname, '..','index.html'),
  chunks:["app"],
  inject: true
}))


module.exports = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
      // 编译时可以配置的全局常量
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    ...pages,
    new FriendlyErrorsPlugin()
  ]
})
