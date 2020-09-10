<template>
  <span>{{formatValue}}</span>
</template>

<script>
import TWEEN from '@tweenjs/tween.js'

export default {
  name: 'AnimatedInteger',
  props: {
    value: {
      required: true,
      default: 0,
    },
    max: {
      default: 0,
    },
    format: {
      type: Function,
    },
    duration: {
      type: Number,
      default: 500,
    },
  },

  data() {
    return {
      tweeningValue: 0,
    }
  },

  computed: {
    formatValue() {
      if (this.format) {
        return this.format(this.tweeningValue)
      }
      return this.tweeningValue
    },
  },

  watch: {
    value(newValue, oldValue) {
      this.tween(oldValue, newValue)
    },
  },

  mounted() {
    this.tween(0, this.value)
  },

  methods: {
    animate() {
      if (TWEEN.update()) {
        requestAnimationFrame(this.animate)
      }
    },

    tween(startValue, endValue) {
      // 错误数据返回0
      if (Number.isNaN(+endValue)) {
        return 0
      }

      // 动画数字的位数
      let fixed = 0
      if (parseInt(endValue, 10) !== +endValue) {
        const float = endValue.toString().split('.')[1]
        if (float) {
          fixed = float.length
        }
      }

      // 动画数字最大值（同时影响显示值）
      if (+this.max && +this.max <= endValue) {
        endValue = +this.max
      }

      new TWEEN.Tween({ animateValue: startValue })
        .to({ animateValue: endValue }, this.duration)
        .easing(TWEEN.Easing.Quartic.Out) // see http://sole.github.io/tween.js/examples/03_graphs.html
        .onUpdate((item) => {
          this.tweeningValue = item.animateValue.toFixed(fixed)
        })
        .start()

      return this.animate()
    },
  },
}
</script>
