
const path = require('path');

const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
    
  entry: { 
      main: './src/pages/index.js' 
  },
  
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    publicPath : ''
  },
  
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    compress: false,
    port: 8000,
    open : true
  },

  mode : 'development',

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 
          {
            loader : 'css-loader',
            options : {importLoaders: 1}
          },
          "postcss-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/, type: 'asset/resource', 
        generator: {
          filename: 'images/[name].[contenthash][ext]'
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i, type: 'asset/resource', 
        generator: {
          filename: 'vendor/[name].[contenthash][ext]',
        }
      },
      {
        test :/\.js$/,
        loader: 'babel-loader',
        exclude : '/node_modules/'
      },
    ],
  },

  plugins: [

    new HtmlWebpackPlugin({
      template : './src/index.html'
    }),
    new MiniCssExtractPlugin(),
    new CleanWebpackPlugin(),
    new webpack.SourceMapDevToolPlugin({})
  ]

}