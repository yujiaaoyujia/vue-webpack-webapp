import { Toast, Indicator, MessageBox } from 'mint-ui'

const toast = Toast
const loading = Indicator
const dialog = MessageBox

toast.success = (message, duration) => toast({
  iconClass: 'icon-success',
  message,
  duration: duration || 2000
})

export function msg(message, duration) {
  return toast({
    message,
    position: 'bottom',
    duration: duration || 2000
  })
}

// 路由懒加载 加载动画
export function lazyStart() {
  return new Promise(resolve => resolve(loading.open()))
}
export function lazyEnd() {
  return setTimeout(() => {
    loading.close()
  }, 0)
}

export { toast, loading, dialog }
