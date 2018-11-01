import jdy from './jdy'

// 长按事件 v-longtap
const longtap = {
  bind(el, binding) {
    let timeOutEvent = 0
    let touchX = 0
    let touchY = 0

    const touchStart = (event) => {
      event.stopPropagation()
      const noPrevent = event.target.className.indexOf('no-prevent')
      if (noPrevent !== -1) {
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
      const noPrevent = event.target.className.indexOf('no-prevent')
      if (noPrevent !== -1) {
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
  }
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
  }
}

// css:active扩充, 触发时添加指定类名 v-active
const active = {
  bind(el, binding) {
    const value = binding.value || 'active'
    const touchStart = (event) => {
      event.stopPropagation()
      const noPrevent = event.target.className.indexOf('no-prevent')
      if (noPrevent !== -1) {
        return false
      }

      if (!el.className) {
        el.className = value
      } else if (el.className.indexOf(value) === -1) {
        el.className = el.className + ' ' + value
      }
      return true
    }

    const touchEnd = (event) => {
      event.stopPropagation()
      const noPrevent = event.target.className.indexOf('no-prevent')
      if (noPrevent !== -1) {
        return false
      }

      if (el.className.indexOf(value) >= 0) {
        const reg = new RegExp('\\s*' + value, 'g')
        el.className = el.className.replace(reg, '')
      }
      return true
    }

    el.addEventListener('touchstart', touchStart, { passive: true })
    el.addEventListener('mousedown', touchStart, { passive: true })
    el.addEventListener('touchend', touchEnd, { passive: true })
    window.addEventListener('mouseup', touchEnd, { passive: true })
  }
}

export default {
  longtap,
  menu,
  active,
}
