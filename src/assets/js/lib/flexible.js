/**
 * 移动端可伸缩布局方案
 * 版本：v1.3.0
 * 作者：Zero
 * 说明：计算方式：设计图像素尺寸 / 100 = 实际 rem，例: 100px = 1rem
 * 更新：2018-04-08
 */
((window) => {
  const doc = window.document
  const docEl = doc.documentElement
  let designWidth = 750 // 默认设计图宽度
  // const resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
  const flexible = {}

  // 设置基准字体大小：8.55-小于320px不再缩小；11.2-大于420px不再放大
  const setrem = ((function refreshRem() {
    const clientWidth = docEl.getBoundingClientRect().width || window.innerWidth
    flexible.rem = Math.max(Math.min(20 * (clientWidth / designWidth), 11.2), 8.55) * 5
    docEl.style.fontSize = flexible.rem + 'px'
    return refreshRem
  })())

  // 如果有指定设计图宽度
  const designWidthEl = doc.querySelector('meta[name="design-width"]')
  if (designWidthEl) {
    designWidth = parseFloat(designWidthEl.getAttribute('content')) || designWidth
  }

  // 添加倍屏标识，安卓倍屏为 1
  docEl.setAttribute('data-dpr', window.navigator.appVersion.match(/iphone/gi) ? window.devicePixelRatio : 1)

  // 为 html 标签添加类名标识
  if (/iP(hone|od|ad)/.test(window.navigator.userAgent)) {
    doc.documentElement.classList.add('ios') // 添加 IOS 标识

    // IOS8 以上添加 hairline 标识，以便特殊处理
    const matchReg = window.navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/)
    if (matchReg && parseInt(matchReg[1], 10) >= 8) {
      doc.documentElement.classList.add('hairline')
    }
  }

  // 页面加载完成或 resize 时，重设字体大小
  // setTimeout(setrem, 333); // 防止某些机型怪异现象，异步再调用一次
  try {
    window.addEventListener('orientationchange' in window ? 'orientationchange' : 'resize', setrem, false)
    doc.addEventListener('DOMContentLoaded', setrem, false)
    window.addEventListener('pageshow', setrem, false)
  } catch (r) {
    window.onload = setrem
  }

  window.flexible = flexible
})(window)
