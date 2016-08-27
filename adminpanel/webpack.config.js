var path = require('path');
var webpack = require('webpack');

module.exports = {
	entry: {
		app: [
			'babel-polyfill',
			'./src/js/app.js'
		]
		   },
	output: {
		path: path.join(__dirname, 'public', 'assets'),
		filename: 'bundle.js',
		publicPath: '/assets'
	},
	plugins: [
		new webpack.optimize.OccurrenceOrderPlugin()
	],
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel',
				exclude: /(node_modules|bower_components)/,
				query: {
					presets: [ 'es2015', 'es2017', 'react' ]
				}
			},
			{ test: /\.css$/, loader: 'style-loader!css-loader' },
			{ test: /\.less$/, loader: 'style!css!less' }
		]
	}
}
