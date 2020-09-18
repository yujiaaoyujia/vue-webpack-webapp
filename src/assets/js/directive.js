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
  touchStopPropagation,
}
