'use strict'

const config = require('./config')
const baseConfig = require('./webpack.config.base')
const utils = require('./utils')
const webpack = require('webpack')
const merge = require('webpack-merge')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = merge(baseConfig, {
  mode: 'production',
  performance: {
    hints: 'warning',
    maxEntrypointSize: 512000, // default: 250000 bytes
    maxAssetSize: 512000 // default: 250000 bytes
  },
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  output: {
    filename: utils.assetsPath('js/[name].[chunkhash:7].js'),
    path: config.build.assetsRoot,
    chunkFilename: utils.assetsPath('js/[name].[chunkhash:7].js'),
    publicPath: config.build.assetsPublicPath
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: config.build.productionSourceMap,
        parallel: true,
        uglifyOptions: {
          compress: {
            warnings: false
          },
        },
      }),
      // Compress extracted CSS. We are using this plugin so that possible
      // duplicated CSS from different components can be deduped.
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: config.build.productionSourceMap
          ? { map: { inline: false } }
          : {}
      })
    ],
    runtimeChunk: {
      name: 'manifest'
    },
    splitChunks: {
      chunks: 'all',
      minSize: 20000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: true,
      cacheGroups: {
        commons: {
          minChunks: 2,
          priority: -20,
          name: 'common',
          reuseExistingChunk: true,
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          priority: -10
        }
      }
    },
  },
  module: {
    rules: [
      {
        test: /\.css?$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ]
      }, {
        test: /\.styl(us)?$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'stylus-loader'
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),

    // 避免组件全量打包(moment.js) 二者取其一即可
    // new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/),
    // new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),

    new CleanWebpackPlugin(['dist'], {
      root: utils.resolve('./'),
      exclude: ['startUp.js'],
      verbose: false,
      dry: false
    }),

    new MiniCssExtractPlugin({
      filename: utils.assetsPath('css/[name].[contenthash:7].css')
    }),

    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: config.build.index,
      template: 'index.html',
      // favicon: 'favicon.png',
      inject: true,
      hash: false,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),

    // keep module.id stable when vendor modules does not change
    new webpack.HashedModuleIdsPlugin(),

    // copy custom static assets
    new CopyWebpackPlugin([{
      from: utils.resolve('static'),
      to: config.build.assetsSubDirectory,
      toType: 'dir'
    }])
  ]
})
