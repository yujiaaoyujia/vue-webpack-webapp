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
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
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
            name: utils.assetsPath('img/[name].[ext]')
          }
        }
      }, {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: utils.assetsPath('media/[name].[ext]')
          }
        }
      }, {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: utils.assetsPath('fonts/[name].[ext]')
          }
        }
      },
      {
        test: require.resolve('zepto'),
        use: [
          'exports-loader?window.Zepto',
          'script-loader'
        ]
      }
    ]
  },

  plugins: [
    new VueLoaderPlugin(),
    new webpack.ProvidePlugin({
      $: 'zepto',
      Zepto: 'zepto',
      'window.Zepto': 'zepto',
    }),
  ]
}
