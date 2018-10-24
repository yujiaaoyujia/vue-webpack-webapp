import { Toast, Indicator, MessageBox } from 'mint-ui'

const toast = Toast
const loading = Indicator
const dialog = MessageBox
export { toast, loading, dialog }

export function msg(message) {
  toast({
    message,
    position: 'bottom',
    duration: 2000
  })
}

// 路由懒加载 加载动画
export function lazyStart() {
  return new Promise(resolve => resolve(loading.open()))
}
export function lazyEnd() {
  return loading.close()
}
