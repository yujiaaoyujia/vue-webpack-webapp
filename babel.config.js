module.exports = {
  presets: [
    ['@babel/preset-env', {
      corejs: 3,
      modules: false,
      useBuiltIns: 'usage'
    }]
  ],
  plugins: [
    ['@babel/plugin-transform-runtime', {
      corejs: 3
    }],
    ['@babel/plugin-syntax-dynamic-import'],
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: name => `${name}/style/less`
    }, 'vant']
  ]
}
