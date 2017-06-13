const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: [
    'webpack-dev-server/client?/',
    'webpack/hot/dev-server',
    './src/index.jsx'
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.scss']
  },
  devServer: {
    historyApiFallback: true
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.js|\.jsx?$/,
        use: ['babel-loader?presets[]=react,presets[]=es2015,plugins[]=transform-decorators-legacy'],
        exclude: [path.resolve(__dirname, 'node_modules/')]
      },
      {
        test: /\.scss|\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader!sass-loader!less-loader',
        }),
      },
    ]
  },
  target: 'web',
  plugins: [
    new ExtractTextPlugin('css/bundle.style.css'),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    })
  ]
};
