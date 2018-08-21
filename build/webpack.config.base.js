'use strict'

const config = require('./config')
const utils = require('./utils')
const webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')

const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [
    utils.resolve('src'),
    utils.resolve('test')
  ],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})

module.exports = {
  entry: {
    app: ['babel-polyfill', './src/main.js']
  },
  output: {
    filename: '[name].js',
    path: config.build.assetsRoot,
    chunkFilename: '[name].js',
    publicPath: config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': utils.resolve('src'),
      '@static': utils.resolve('static'),
    }
  },

  module: {
    rules: [
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        test: /\.vue$/,
        use: 'vue-loader'
      }, {
        test: /\.js$/,
        include: [
          utils.resolve('src'),
          utils.resolve('test'),
        ],
        use: {
          loader: 'babel-loader',
          options: {
            compact: 'false'
          }
        }
      }, {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: utils.assetsPath('img/[name].[hash:7].[ext]')
          }
        }
      }, {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: utils.assetsPath('media/[name].[hash:7].[ext]')
          }
        }
      }, {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
          }
        }
      },
    ]
  },

  plugins: [
    new VueLoaderPlugin(),
  ]
}
