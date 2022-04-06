// 参考文献：https://juejin.cn/post/6871148364919111688
const { whenDev, whenProd, when } = require('@craco/craco')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const path = require("path");

function pathResolve(dir) {
	return path.join(__dirname, dir);
}

module.exports = {
	// 设置babel
	babel: {
		presets: [
			[
				'@babel/preset-env',
				{
					modules: false, // 对ES6的模块文件不做转化，以便使用tree shaking、sideEffects等
					useBuiltIns: 'entry', // browserslist环境不支持的所有垫片都导入
					corejs: {
						version: 3, // 使用core-js@3
						proposals: true,
					},
				}
			]
		]
	},
	// 这里都可以覆盖所有的webpack
	webpack: {
		/**
		 * 几乎所有的 webpack 配置均可以在 configure 函数中读取，然后覆盖
		 */
		configure: (webpackConfig, { env, paths }) => {
			// 修改 output
			webpackConfig.output = {
				...webpackConfig.output,
				...{
					filename: whenDev(() => 'static/js/bundle.js', 'static/js/[name].js'),
					chunkFilename: 'static/js/[name].js',
				},
			}
			// 配置扩展扩展名
			webpackConfig.resolve.extensions = [
				...webpackConfig.resolve.extensions,
				...['.scss', '.less', '.stylus'],
			]
			// 覆盖已经内置的 plugin 配置
			webpackConfig.plugins.map((plugin) => {
				whenProd(() => {
				  if (plugin instanceof MiniCssExtractPlugin) {
					Object.assign(plugin.options, 
						{
							filename: 'static/css/[name].css',
							chunkFilename: 'static/css/[name].css',
						}, 
						["@babel/plugin-proposal-private-methods", {"loose": true}],
						["@babel/plugin-proposal-private-property-in-object", { "loose": true }]
					)
				  }
				})
				return plugin
			})
			webpackConfig.module.rules = [
				...webpackConfig.module.rules,
				...[
					{
						test: /\.less$/,
						include: [pathResolve('src')],
						exclude: /\.module\.less$/,
						loader:['style-loader', 'css-loader', 'less-loader' ]
					}
				]
			]
			// // 在webpack 中配置 stylus, 2021/11/23 stylus 没打包成功
			// webpackConfig.module.rules = [
			// 	...webpackConfig.module.rules,
			// 	...[
			// 		{
			// 			test: /\.styl|stylus$/,
			// 			include: [pathResolve('src')],
			// 			exclude: /\.module\.styl|stylus$/,
			// 			loader:['style-loader', 'css-loader', 'stylus-loader' ]
			// 		}
			// 	]
			// ]
			return webpackConfig
		},
		// 设置别名如果是使用了 typescript 那还要在tsconfig.json 里边配置
		alias: {
			'@': pathResolve('src')
		},
		devServer: {
			port: 8080,
			proxy: {
				'/api': {
				target: 'http://127.0.0.1:8080',
				// target: 'https://xwzyyds.com/',
				changeOrigin: true,
				secure: false,
				xfwd: false,
				}
			}
		}
	}
}