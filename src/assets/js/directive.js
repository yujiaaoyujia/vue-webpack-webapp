import jdy from './jdy'

// 长按事件 v-longtap
const longtap = {
  bind(el, binding) {
    let timeOutEvent = 0
    let touchX = 0
    let touchY = 0

    const touchStart = (event) => {
      event.stopPropagation()
      const eventClass = event.target.className || ''
      const noPrevent = eventClass.indexOf && eventClass.indexOf('no-prevent')
      if (noPrevent >= 0) {
        return false
      }

      const touches = event.targetTouches[0]
      touchX = touches.clientX
      touchY = touches.clientY

      timeOutEvent = setTimeout(() => {
        if (typeof binding.value === 'function') {
          binding.value()
        } else if (typeof binding.value === 'object') {
          const callback = binding.value.callback
          if (callback) {
            callback(binding.value.param, event)
          }
        }
      }, 500)

      return true
    }

    const touchMove = (event) => {
      const touches = event.targetTouches[0]
      const moveX = Math.abs(touchX - touches.clientX)
      const moveY = Math.abs(touchY - touches.clientY)

      const distance = moveX + moveY
      if (distance >= 10) {
        clearTimeout(timeOutEvent)
        timeOutEvent = 0
      }
    }

    const touchEnd = (event) => {
      const eventClass = event.target.className || ''
      const noPrevent = eventClass.indexOf && eventClass.indexOf('no-prevent')
      if (noPrevent >= 0) {
        return false
      }

      if (event.cancelable) {
        event.preventDefault()
      }

      clearTimeout(timeOutEvent)
      return true
    }

    el.addEventListener('touchstart', touchStart, { passive: true })
    el.addEventListener('touchmove', touchMove, { passive: true })
    el.addEventListener('touchend', touchEnd, { passive: false })
  },
}

// 右键菜单事件 v-menu
const menu = {
  bind(el, binding) {
    if (jdy.isMobile && binding.modifiers.pconly) {
      el.addEventListener('contextmenu', (event) => {
        event.stopPropagation()
        event.preventDefault()
      }, { passive: false })
    } else {
      el.addEventListener('contextmenu', (event) => {
        event.stopPropagation()
        event.preventDefault()
        if (typeof binding.value === 'function') {
          binding.value()
        } else if (typeof binding.value === 'object') {
          const callback = binding.value.callback
          if (callback) {
            callback(binding.value.param, event)
          }
        }
      }, { passive: false })
    }
  },
}

// css:active扩充, 触发时添加指定类名 v-active
// 接受修饰符 v-active.bubble 不阻止冒泡
const active = {
  bind(el, binding) {
    const value = binding.value || 'active'
    const modifiers = binding.modifiers || {}

    const touchStart = (event) => {
      if (!modifiers.bubble) {
        event.stopPropagation()
      }

      const eventClass = event.target.className || ''
      const noPrevent = eventClass.indexOf && eventClass.indexOf('no-prevent')
      if (noPrevent >= 0) {
        return false
      }

      if (!el.classList.contains(value)) {
        el.classList.add(value)
      }
      return true
    }

    const touchEnd = (event) => {
      if (!modifiers.bubble) {
        event.stopPropagation()
      }

      const eventClass = event.target.className || ''
      const noPrevent = eventClass.indexOf && eventClass.indexOf('no-prevent')
      if (noPrevent >= 0) {
        return false
      }

      if (el.classList.contains(value)) {
        el.classList.remove(value)
      }
      return true
    }

    el.addEventListener('touchstart', touchStart, { passive: true })
    el.addEventListener('mousedown', touchStart, { passive: true })
    el.addEventListener('touchend', touchEnd, { passive: true })
    window.addEventListener('mouseup', touchEnd, { passive: true })
  },
}

// 单击事件结束后 添加类并在指定时间后移除
const flash = {
  bind(el, binding) {
    let value = binding.value || {}
    if (typeof value === 'string') {
      value = { className: value }
    } else if (typeof value === 'number') {
      value = { timeOut: value }
    }

    const className = value.className || 'active'
    const timeOut = value.timeOut || 200

    const click = () => {
      if (!el.classList.contains(className)) {
        el.classList.add(className)
      }
      setTimeout(() => {
        if (el.classList.contains(className)) {
          el.classList.remove(className)
        }
      }, timeOut)
    }

    el.addEventListener('click', click, { passive: true })
  },
}

const drag = {
  bind(el, binding) {
    // 初始化当前位置
    let currentX = 0
    let currentY = 0

    const touchStart = (event) => {
      event.stopPropagation()
      if (event.cancelable) {
        event.preventDefault()
      }

      // 判断pc端或移动端 拿到event事件
      const touch = event.touches ? event.touches[0] : event
      const { clientX, clientY } = touch

      // 记录当前元素触摸位置
      const touchX = clientX
      const touchY = clientY
      let distance = 0 // 触摸点发生位移的总距离

      const touchMove = (event) => {
        event.stopPropagation()
        if (event.cancelable) {
          event.preventDefault()
        }

        // 判断pc端或移动端 拿到event事件
        const touch = event.touches ? event.touches[0] : event
        const { clientX, clientY } = touch

        // 通过事件委托，计算移动的距离
        const distX = clientX - touchX
        const distY = clientY - touchY
        let tranX = distX + currentX
        let tranY = distY + currentY
        distance = Math.abs(distX) + Math.abs(distY)

        // 移动当前元素
        const transformStyle = `translate3d(${tranX}px, ${tranY}px, 1px)`
        el.style.transform = transformStyle
        el.style.mozTransform = transformStyle
        el.style.webkitTransform = transformStyle

        // 计算移动后的四边位置
        const { left, right, top, bottom } = el.getBoundingClientRect()
        const docWidth = document.documentElement.clientWidth || document.body.clientWidth
        const docHeight = document.documentElement.clientHeight || document.body.clientHeight

        // 超出边界不要移动元素
        if (left < 0) {
          tranX -= left
        }
        if (right > docWidth) {
          tranX -= right - docWidth
        }
        if (top < 0) {
          tranY -= top
        }
        if (bottom > docHeight) {
          tranY -= bottom - docHeight
        }

        // 保持当前元素位置
        if (left < 0 || right > docWidth || top < 0 || bottom > docHeight) {
          const resetStyle = `translate3d(${tranX}px, ${tranY}px, 1px)`
          el.style.transform = resetStyle
          el.style.mozTransform = resetStyle
          el.style.webkitTransform = resetStyle
        }
      }

      const touchEnd = () => {
        // 解析matrix的正则
        const matrix3dReg = /^matrix3d\((?:[-\d.]+,\s*){12}([-\d.]+),\s*([-\d.]+)(?:,\s*[-\d.]+){2}\)/
        const matrixReg = /^matrix\((?:[-\d.]+,\s*){4}([-\d.]+),\s*([-\d.]+)\)$/

        // 获取解析后的transform样式属性值(计算后的样式)
        const matrix3dSourceValue = jdy.getStyle(el, 'transform')
        const matrix3dArrValue = matrix3dSourceValue.match(matrix3dReg) || matrix3dSourceValue.match(matrixReg)

        // 记录matrix解析后的translateX & translateY的值
        if (matrix3dArrValue) {
          currentX = +matrix3dArrValue[1]
          currentY = +matrix3dArrValue[2]
        }

        el.removeEventListener('touchmove', touchMove)
        el.removeEventListener('mousemove', touchMove)
        el.removeEventListener('touchend', touchEnd)
        window.removeEventListener('mouseup', touchEnd)

        // 如果有回调事件
        if (typeof binding.value === 'function' && distance < 5) {
          binding.value()
        }
      }

      // 添加移动和松开事件
      el.addEventListener('touchmove', touchMove, { passive: false })
      el.addEventListener('mousemove', touchMove, { passive: false })
      el.addEventListener('touchend', touchEnd, { passive: true })
      window.addEventListener('mouseup', touchEnd, { passive: true })
    }

    // 添加触发事件
    el.addEventListener('touchstart', touchStart, { passive: false })
    el.addEventListener('mousedown', touchStart, { passive: false })
  },
}

// 阻止touch事件冒泡引发滚动 v-touch-stop-propagation
const touchStopPropagation = {
  bind(el) {
    let touchY = 0
    let scrollTop = 0
    let scrollEnd = 0

    const touchStart = (event) => {
      const touches = event.targetTouches[0]
      touchY = touches.clientY
      scrollTop = el.scrollTop
      scrollEnd = el.scrollHeight - el.clientHeight
    }

    const touchMove = (event) => {
      const touches = event.changedTouches[0]
      const moveY = touches.clientY - touchY

      // 滚动至顶部时向上滚动
      if (scrollTop <= 0 && moveY >= 0 && event.cancelable) {
        event.preventDefault()
      }

      // 滚动至底部时向下滚动
      if (scrollTop >= scrollEnd && moveY < 0 && event.cancelable) {
        event.preventDefault()
      }
    }

    el.addEventListener('touchstart', touchStart, { passive: true })
    el.addEventListener('touchmove', touchMove, { passive: false })
  },
}

export default {
  longtap,
  menu,
  active,
  flash,
  drag,
  touchStopPropagation,
}
