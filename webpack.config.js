const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');

const presets = [
  '@babel/preset-env',
  '@babel/preset-react'
];
const plugins = [
  '@babel/plugin-proposal-object-rest-spread',
  '@babel/plugin-proposal-class-properties',
  [
    '@babel/plugin-transform-runtime',
    {
      corejs: false,
      helpers: false,
      regenerator: true,
      useESModules: true
    }
  ]
];

module.exports = {
  devtool: 'source-map',
  entry: path.resolve(__dirname, 'src', 'index.js'),
  output: {
    path: path.resolve(__dirname, 'docs'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  mode: 'production',
  devServer: {
    historyApiFallback: true,
    hot: true,
    contentBase: path.join(__dirname, 'src', 'static'),
    inline: true,
    port: 3000,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: '/node_modules/',
        options: {
          presets: [...presets],
          plugins: [...plugins],
        }
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192,
          },
        }],
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      inject: false,
      template: path.resolve(__dirname, 'src', 'static', 'index.html'),
      filename: 'index.html'
    }),
    new Dotenv(),
    new MiniCssExtractPlugin({
      filename: 'style.css'
    }),
  ],
}
