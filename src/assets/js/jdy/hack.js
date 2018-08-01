import { isIOS } from './env'

// 动态设置当前页面的标题
export default function setTitle(title) {
  document.title = title

  if (isIOS) {
    const $iframe = $('<iframe src="about:blank" style="display:none;"></iframe>').on('load', () => {
      setTimeout(() => {
        $iframe.off('load').remove()
      }, 0)
    }).appendTo('body')
  }
}
