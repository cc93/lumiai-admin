var webpack = require('webpack');
var fs = require("fs");

var getDirFilesPathArr = function(path){
  var dirFilesPathArr = {};
  var fileName = '';
  var fileArr = fs.readdirSync(path);
  fileArr.forEach( function (file,index){
    fileName =  file.match(/(.+)\.js$/)[1];
    dirFilesPathArr[fileName] = path + file;
  });
  return dirFilesPathArr;
};
module.exports = {
  context: __dirname,
  entry: getDirFilesPathArr(__dirname + '/src/js/'),
  output: {
    path: __dirname + '/build/',
    publicPath: 'build/',
    filename: '[name].js'
  },
  module: {
    //preloaders:[
    //  { test: /\.js$/, loader: 'eslint', include: /js/}
    //],
    loaders: [
      { test: /\.js$/, loader: 'babel', include: /js/, exclude: /node_modules/, query:{presets:['es2015','react']}}
      //{ test: /\.css$/,  loader: "style!css" },
      //{ test: /\.jp(e)?g|png|gif|svg|ttf|eot|woff|woff2$/, loader:'url?limit=8192&name=./build/[hash].[ext]'},
      //{ test: /\.svg|ttf|eot|woff|woff2$/, loader:'file&name=./build/[hash].[ext]'}
    ]
  },
  plugins: [
    new webpack.DefinePlugin({PRODUCTION: JSON.stringify(process.env.NODE_ENV === 'production')})
  ],
  devtool: '#eval'
};

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map';
  module.exports.plugins = (module.exports.plugins || []).concat([
      new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}}),
    new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.AggressiveMergingPlugin(),
      new webpack.NoErrorsPlugin()
  ]);
}

