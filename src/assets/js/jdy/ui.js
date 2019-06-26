import { Toast } from 'vant'

const toast = Toast
// toast.allowMultiple()

const loading = {
  show() {
    toast({
      type: 'loading',
      forbidClick: true,
      duration: 0,
      className: 'van-loading-custom ignore',
    })
  },
  hide() {
    toast.clear()
  },
}

export function msg(message, duration) {
  return toast({
    message,
    position: 'bottom',
    duration: +duration === 0 ? 0 : (duration || 2000)
  })
}

// 路由懒加载 加载动画
export function lazyStart() {
  return new Promise(resolve => resolve(loading.show()))
}
export function lazyEnd() {
  return setTimeout(() => {
    loading.hide()
  }, 0)
}

export { toast, loading }
