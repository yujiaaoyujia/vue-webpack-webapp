'use strict'

const path = require('path')
const packageConfig = require('../package.json')
const config = require('./config')

module.exports = {
  resolve(dir) {
    return path.join(__dirname, '..', dir)
  },

  assetsPath(_path) {
    const assetsSubDirectory = process.env.NODE_ENV === 'production'
      ? config.build.assetsSubDirectory
      : config.dev.assetsSubDirectory

    return path.posix.join(assetsSubDirectory, _path)
  },

  createNotifierCallback() {
    const notifier = require('node-notifier')

    return (severity, errors) => {
      if (severity !== 'error') return

      const error = errors[0]
      const filename = error.file && error.file.split('!').pop()

      notifier.notify({
        title: packageConfig.name,
        message: severity + ': ' + error.name,
        subtitle: filename || '',
        icon: path.join(__dirname, 'logo.png')
      })
    }
  }
}
