
const path = require('path');

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
    compress: true,
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
        test: /\.(svg|png|jpg|gif|woff(2)?|eot|ttf|otf)$/,
        type: 'asset/resource'
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
    new CleanWebpackPlugin()
  ]

}