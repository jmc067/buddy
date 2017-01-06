module.exports = {
	entry: "./app/Main.js",
	output: {
		path: 'public',
		filename: 'bundle.js',
		publicPath: '/'
	},	
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel',
				query: {
					presets: ['react','es2015']
				}
			},
			{
				test: /\.scss$/,
				loaders: ['style', 'css', 'sass']
			}
		]
	}
}
