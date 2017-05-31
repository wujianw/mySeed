var Glob = require('glob').Glob
var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')

function resolve (dir) {
	return path.join(__dirname, '..', dir)
}

var options = {
	cwd: path.join(__dirname, '../src/views'), // 在pages目录里找
	sync: true, // 这里不能异步，只能同步
};
var globInstance = new Glob('!(_)*/!(_)*', options); // 考虑到多个页面共用HTML等资源的情况，跳过以'_'开头的目录

console.log("globInstance.found------",globInstance.found)

var env = process.env.NODE_ENV === 'production'
var pageHtml = []
if(env){
	pageHtml = globInstance.found.map((page) => {
		return new HtmlWebpackPlugin({
			filename: `${page}.html`,
			template: path.resolve(options.cwd, page),
			chunks: [page],
			inject: true,
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeAttributeQuotes: false
			},
			chunksSortMode: 'dependency'
		})

	})
}else {
	pageHtml = globInstance.found.map((page) => {
		return new HtmlWebpackPlugin({
			filename: `${page}.html`,
			template: path.resolve(options.cwd, `${page}.html`),
			chunks: [page],
			hash: true, // 为静态资源生成hash值
		})
	})
}
module.exports = pageHtml