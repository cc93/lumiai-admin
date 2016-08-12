var webpack = require('webpack');

module.exports = {
  context: __dirname,
  entry: './js/index.js',
  output: {
    path: __dirname + '/build',
    publicPath: '/build/',
    filename: 'index.js'
  },
  module: {
    loaders: [
      //{ test: /\.css$/,  loader: "style!css" },
      //{ test: /\.html$/, loader: 'raw'},
      //{ test: /\.jpg|png|gif$/i, loader:'file'}
    ]
  },
  plugins: [],
  devtool: '#eval'
};

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map';
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({PRODUCTION: JSON.stringify(true)}),
    new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}}),
    new webpack.optimize.OccurenceOrderPlugin()
  ]);
}

