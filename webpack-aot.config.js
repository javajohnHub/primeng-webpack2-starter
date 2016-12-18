let webpack = require('webpack');
let path    = require('path');
let ngtools = require('@ngtools/webpack');

module.exports = {

  entry: {
    'vendor': './app/vendor-aot.ts',
    'app':    './app/main.ts',
  },

  output: {
    path: __dirname + '/build/',
    filename: '[name].js',
  },

  devtool: 'source-map',

  resolve: { extensions: ['.js', '.ts'] },

  module: {
    loaders: [
      {
        test: /\.ts$/,
        loaders: ['awesome-typescript-loader', 'angular2-template-loader'],
      },
      {
        test: /\.html$/,
        loader: "html-loader?minimize=false",
      },
      {
        test: /\.css$/,
        loader: ['exports-loader?module.exports.toString()', 'css-loader'],
        include: path.resolve(__dirname, "app"),
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
        exclude: path.resolve(__dirname, 'app'),
      },
      {
        test: /\.(png|jpg|gif|svg|woff|woff2|ttf|eot)$/,
        loader: 'url-loader?limit=25000',
      },
    ]
  },

  plugins: [
    new ngtools.AotPlugin({
      tsConfigPath: 'tsconfig-aot.json',
      entryModule: 'app/app.module#AppModule'
    })
  ]
};