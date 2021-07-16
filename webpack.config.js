const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	entry: './src/index.tsx',
	devtool: 'source-map',
	resolve: {
		extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
	},
	output: {
		path: path.join(__dirname, '/dist'),
		filename: 'index.js',
		publicPath: '',
		// https://github.com/GoogleChromeLabs/worker-plugin/issues/20
		globalObject: "(typeof self!='undefined'?self:global)",
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.s[ac]ss$/i,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
			{
				test: /\.(js|ts)x?$/,
				loader: require.resolve('babel-loader'),
				exclude: /node_modules/,
			},
		],
	},
	devServer: {
		historyApiFallback: true,
		// contentBase: './dist',
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './public/index.html',
		}),
	],
}
