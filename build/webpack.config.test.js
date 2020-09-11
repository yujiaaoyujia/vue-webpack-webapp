'use strict'

const baseConfig = require('./webpack.config.base')
const merge = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')
const path = require('path')

module.exports = merge([{
  module: {
    rules: [{
      test: /\.test\.(js|ts)/,
      include: path.resolve('tests/mocha'),
      loader: 'istanbul-instrumenter-loader',
      query: {
        esModules: true,
      },
    }],
  },
}, baseConfig, {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'postcss-loader',
        ],
      }, {
        test: /\.styl(us)?$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'postcss-loader',
          'stylus-loader',
        ],
      },
    ],
  },

  output: {
    // 在源码表中使用绝对路径 (对于在 IDE 中调试时很重要)
    devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]',
  },

  // 外置所有的 NPM 依赖
  externals: [nodeExternals()],
}])
