import { Toast, Dialog } from 'vant'

const toast = Toast
const dialog = Dialog
toast.allowMultiple() // 允许同时弹出toast

const loading = {
  instance: {}, // toast实例
  opened: false,
  show() {
    // loading基于toast，须特殊处理使其全局只有一个
    if (this.opened) {
      return
    }

    this.opened = true
    this.instance = toast({
      type: 'loading',
      forbidClick: true,
      duration: 0,
      className: 'van-loading-custom ignore',
    })
  },
  hide() {
    if (this.opened) {
      this.instance.clear()
      this.opened = false
    }
  },
}

export function msg(message, duration) {
  return toast({
    message,
    position: 'bottom',
    duration: +duration === 0 ? 0 : (duration || 2000),
  })
}

// 路由懒加载 加载动画
export function lazyStart() {
  return new Promise((resolve) => resolve(loading.show()))
}
export function lazyEnd() {
  loading.hide()
}

export { toast, dialog, loading }
