var path = require('path');
var autoprefixer = require('autoprefixer');
var ExtractPlugin = require('extract-text-webpack-plugin');

var plugins = [
  new ExtractPlugin('main.css'), //To extract CSS
];

module.exports = {

  context: path.join(__dirname, 'app'),

  entry:  ['./main.js', './index.html'],
  output: {
    path:     path.join(__dirname, 'build'),
    filename: 'main.js'
  },

  plugins: plugins,

  module: {
    preLoaders: [
      { test: /\.json$/, loader: 'json' }
    ],
    loaders: [
      { test: /\.scss/, loader: ExtractPlugin.extract('style-loader', 'css-loader!postcss-loader!sass-loader') },
      { test: /\.html/, loader: 'file?name=[name].[ext]' },
      { test: /\.(png|gif|jpe?g|svg)$/i, loader: 'url' },
      { test: /\.handlebars$/, loader: 'handlebars-loader' }
    ]
  },

  postcss: function () {
    return [autoprefixer];
  }
};


