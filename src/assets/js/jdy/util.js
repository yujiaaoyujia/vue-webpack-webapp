import TWEEN from '@tweenjs/tween.js'

// 获取元素的样式值
export function getStyle(el, attr) {
  if (typeof window.getComputedStyle !== 'undefined') {
    return window.getComputedStyle(el, null)[attr]
  }
  if (typeof el.currentStyle !== 'undefined') {
    return el.currentStyle[attr]
  }
  return ''
}

// 分割数组
export function getChunkList(list, len) {
  const result = []
  for (let i = 0; i < list.length; i += len) {
    result.push(list.slice(i, i + len))
  }
  return result
}

// 对象深拷贝
export function deepExtend(...rest) {
  const out = rest[0] || {}
  for (let i = 1; i < rest.length; i++) {
    const obj = rest[i]
    Object.keys(obj).forEach((key) => {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        if (typeof obj[key] === 'object') {
          if (obj[key] instanceof Array === true) {
            out[key] = obj[key].slice(0)
          } else {
            out[key] = this.deepExtend(out[key], obj[key])
          }
        } else {
          out[key] = obj[key]
        }
      }
    })
  }
  return out
}

// 平滑滚动
export function tweenTo({ target, scrollTop, targetTop = 0, duration = 300 }) {
  return new Promise((resolve) => {
    function execScrollTop(y) {
      if (target) {
        target.scrollTop = y
      } else {
        document.documentElement.scrollTop = y
        document.body.scrollTop = y
      }
    }

    scrollTop = scrollTop || document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset
    if (window.scrollTween) {
      window.scrollTween.stop()
    }

    window.scrollTween = new TWEEN.Tween({ y: scrollTop })
      .to({ y: targetTop }, duration)
      .easing(TWEEN.Easing.Quadratic.Out)
      .onUpdate(({ y }) => {
        execScrollTop(parseInt(y, 10))
      })
      .onComplete(() => {
        execScrollTop(targetTop)
      })
      .start()

    function animate() {
      if (TWEEN.update()) {
        requestAnimationFrame(animate)
      }
    }
    animate()

    setTimeout(() => resolve(), duration)
  })
}

// 按字符占位计算字符串长度
export function getStringLength(str = '') {
  let len = 0
  for (let i = 0; i < str.length; i++) {
    len += str.charCodeAt(i) > 127 || str.charCodeAt(i) === 94 ? 2 : 1
  }
  return len
}

// 轮询判断直到为 true 才回调
export function intervalCondition(option) {
  return new Promise((resolve, reject) => {
    // 配置默认值
    if (typeof option !== 'object') {
      option = { condition: option || (() => true) }
    }
    option.interval = option.interval || 300
    option.timeout = option.timeout || 10000

    // 条件满足直接回调
    if (option.condition()) {
      resolve()
      return
    }

    // 轮询判断条件
    const interval = setInterval(() => {
      if (option.condition()) {
        clearInterval(interval)
        setTimeout(() => {
          resolve()
        }, 0)
      }
    }, option.interval)

    // 超时回调异常
    if (option.timeout >= 0) {
      setTimeout(() => {
        clearInterval(interval)
        reject()
      }, option.timeout)
    }
  })
}
