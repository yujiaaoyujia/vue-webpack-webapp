module.exports = {
  // processors: [
  //   'stylelint-processor-html'
  // ], 
  extends: [
    'stylelint-config-standard',
    'stylelint-plugin-stylus/recommended',
  ], 
  rules: {
    /* stylus rules */

    /* at rule */
    // 禁止使用未知的 at 规则
    'stylus/at-rule-no-unknown': [ true, {
      ignoreAtRules: ['svg', 'rect'],
    }],

    // 要求或禁止在 at 规则之前有空行
    'stylus/at-rule-empty-line-before' : ["always", {
      except: ["blockless-after-same-name-blockless", "first-nested"],
      ignore: ["after-comment"],
    }],

    // 要求在 at 规则之后有一个空格
    'stylus/at-rule-name-space-after' : 'always',

    /* block */
    // 要求或禁止在闭括号之前有空行
    'stylus/block-closing-brace-empty-line-before' : 'never',

    // 在闭括号之后要求有一个换行符或禁止有空行
    'stylus/block-closing-brace-newline-after' : 'always-multi-line',

    // 在闭括号之前要求有一个换行符或禁止有空行
    'stylus/block-closing-brace-newline-before' : 'always-multi-line',

    // 在闭括号之后要求有一个空格或禁止有空格
    'stylus/block-closing-brace-space-after' : null,

    // 在闭括号之前要求有一个空格或禁止有空格
    'stylus/block-closing-brace-space-before' : 'always-single-line',

    // 在块的左大括号后制定一个换行符
    'stylus/block-opening-brace-newline-after' : 'always-multi-line',

    // 在块的左大括号后指定一个空格或禁止留有空格
    'stylus/block-opening-brace-space-after' : 'always-single-line',

    // 在块的左大括号前指定一个空格或禁止留有空格
    'stylus/block-opening-brace-space-before' : 'always',

    /* selector */
    // 在选择器列表的逗号后面需要换行符或不允许使用空格
    'stylus/selector-list-comma-newline-after' : 'always',

    // 在选择器列表的逗号之前需要换行符或禁止使用空格
    'stylus/selector-list-comma-newline-before' : null,

    // 在选择器列表的逗号后面需要一个空格或不允许空格
    'stylus/selector-list-comma-space-after' : null,

    // 在选择器列表的逗号之前需要一个空格或禁止空格
    'stylus/selector-list-comma-space-before' : 'never',

    // 要求或不允许选择器列表逗号
    'stylus/selector-list-comma' : null,

    // 对伪类选择器强制小写或大写
    'stylus/selector-pseudo-class-case' : 'lower',

    // 不允许低特异性的选择器出现在覆盖高特异性的选择器之后
    'no-descending-specificity' : null,

    /* others */
    // 指定十六进制颜色的大小写
    'stylus/color-hex-case' : 'lower',

     // 要求或禁止声明冒号
    'stylus/declaration-colon' : null,

     // 要求或禁止在哈希对象属性中使用逗号
    'stylus/hash-object-property-comma' : ["always", { trailing: "never" }],

     // 指定缩进
    'stylus/indentation' : 2,

    'indentation': null,

     // 要求或禁止使用媒体功能冒号
    'stylus/media-feature-colon' : null,

     // 禁止@require，@import改为使用
    'stylus/no-at-require' : true,

     // 禁止行尾空格
    'stylus/no-eol-whitespace' : true,

    'no-eol-whitespace': null,

    // 对于小于1的小数，要求或不允许前导零
    // 'stylus/number-leading-zero' : 'never',

    // 不允许数字尾随零
    'stylus/number-no-trailing-zeros' : true,

    // 强制使用pythonic或brace样式
    'stylus/pythonic': null,

    // 要求或禁止使用分号
    'stylus/semicolon' : null,

    // 单行注释的双斜杠后需要或禁止空格
    'stylus/single-line-comment-double-slash-space-after' : 'always',

    // 强制使用允许单行注释的注释样式
    'stylus/single-line-comment' : null,
  },
}
