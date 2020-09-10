module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true,
    mocha: true,
    es6: true
  },
  globals: {
    $: true,
    "expect": true
  },
  extends: [
    'plugin:vue/essential',
    'airbnb-base'
  ],
  plugins: [
    'vue'
  ],
  // check if imports actually resolve
  settings: {
    'import/resolver': {
      webpack: {
        config: 'build/webpack.config.base.js'
      }
    }
  },
  rules: {
    // level: off, warn, error
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      js: 'never',
      vue: 'never'
    }],
    // disallow reassignment of function parameters
    // disallow parameter object manipulation except for specific exclusions
    // 'no-param-reassign': ['error', {
    //   props: true,
    //   ignorePropertyModificationsFor: [
    //     'state', // for vuex state
    //     'acc', // for reduce accumulators
    //     'e' // for e.returnvalue
    //   ]
    // }],
    // allow optionalDependencies
    'import/no-extraneous-dependencies': ['error', {
      optionalDependencies: ['test/unit/index.js']
    }],

    // specify rules
    'import/no-cycle': 'off', // 禁止import引入产生递归
    'semi': ['error', 'never'], // 要求或禁止使用分号代替 ASI
    'comma-dangle': ['error', { // 要求或禁止末尾逗号
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'always-multiline',
      exports: 'always-multiline',
      functions: 'only-multiline',
    }],
    'prefer-template': 'off', // 要求使用模板字面量而非字符串连接
    'max-len': 'off', // 强制一行的最大长度
    'object-curly-newline': 'off', // 强制在花括号内使用一致的换行符
    'no-param-reassign': 'off', // 禁止对 function 的参数进行重新赋值
    'no-shadow': 'off', // 禁止变量声明与外层作用域的变量同名
    'no-plusplus': 'off', // 禁用一元操作符 ++ 和 --
    'no-console': 'off', // 禁用 console
    'prefer-destructuring': 'off', // 优先使用数组和对象解构
    'no-restricted-globals': 'off', // 禁用特定的全局变量
    'prefer-promise-reject-errors': 'off', // 要求使用 Error 对象作为 Promise 拒绝的原因

    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}
