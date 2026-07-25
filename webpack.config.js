/* global __dirname, module */
const path = require( 'path' );
const TerserPlugin = require( 'terser-webpack-plugin' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const CssMinimizerPlugin = require( 'css-minimizer-webpack-plugin' );
const RemoveEmptyScriptsPlugin = require( 'webpack-remove-empty-scripts' );

const baseConfig = {
	entry: {
		js: './src/index.js',
		css: './assets/css/accessibility-new-window-warnings.css',
	},
	devtool: false,
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							[ '@babel/preset-env', { targets: '> 0.25%, not dead' } ],
						],
					},
				},
			},
			{
				test: /\.css$/,
				use: [ MiniCssExtractPlugin.loader, { loader: 'css-loader', options: { url: false } } ],
			},
		],
	},
};

module.exports = [
	// Non-minified
	{
		...baseConfig,
		name: 'unminified',
		entry: {
			'accessibility-new-window-warnings': './src/index.js',
			style: './assets/css/accessibility-new-window-warnings.css',
		},
		output: {
			path: path.resolve( __dirname, 'assets' ),
			filename: 'js/[name].js',
		},
		plugins: [
			new MiniCssExtractPlugin( { filename: 'css/accessibility-new-window-warnings.css' } ),
			new RemoveEmptyScriptsPlugin(),
		],
		optimization: {
			minimize: false,
		},
	},
	// Minified
	{
		...baseConfig,
		name: 'minified',
		entry: {
			'accessibility-new-window-warnings-min': './src/index.js',
			style: './assets/css/accessibility-new-window-warnings.css',
		},
		output: {
			path: path.resolve( __dirname, 'assets' ),
			filename: 'js/[name].js',
		},
		plugins: [
			new MiniCssExtractPlugin( { filename: 'css/accessibility-new-window-warnings-min.css' } ),
			new RemoveEmptyScriptsPlugin(),
		],
		optimization: {
			minimizer: [
				new TerserPlugin( {
					parallel: true,
					terserOptions: {
						format: {
							// Keep `translators:` comments in the built bundles.
							comments: /translators:/i,
						},
					},
				} ),
				new CssMinimizerPlugin(),
			],
		},
	},
];