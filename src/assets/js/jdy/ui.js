import { Toast, Indicator, MessageBox } from 'mint-ui'

// export {Toast as toast}
// export function toast(option) {
//   Toast(option)
// }
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

// export {Confirm as confirm}
// export {Notify as notify}

// export {Message as message}
// export {Modal as modal}

// export function loading(msg = '玩命加载中', delay = 2000) {
//   Loading.open(msg)
//   hideLoading(delay)
// }

// export const hideLoading = Loading.close
// export function hideLoading(delay = 0) {
//   setTimeout(Loading.close, delay)
// }

// export function tips(msg = '没有提示的提示', timeout = 1500) {
//   Toast({
//     mes: msg,
//     timeout
//   })
// }

// export function tips(content = '没有提示的提示', duration = 2) {
//   Message.info({
//     content,
//     duration
//   })
// }

// export function notify(msg = '注意', timeout = 5000, callback = noop) {
//   Notify({
//     mes: msg,
//     timeout,
//     callback
//   })
// }

// export function confirm({title, msg, opts}) {
//   Confirm({
//     title,
//     mes: msg,
//     opts
//   })
// }

// export function confirm({content, title = null, okText = '取消', cancelText = '确定', onOk = noop, onCancel = noop}) {
//   Modal.confirm({
//     title,
//     content,
//     okText,
//     cancelText,
//     onOk,
//     onCancel
//   })
// }
