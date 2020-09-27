/* eslint-disable no-underscore-dangle */

export const inBrowser = typeof window !== 'undefined'
export const dpr = window.devicePixelRatio || 1
export const UA = window.navigator.userAgent.toLowerCase()
export const isWeiXin = /MicroMessenger/i.test(UA) // 微信
export const isWeApp = /miniProgram/i.test(UA) || window.__wxjs_environment === 'miniprogram' // 微信小程序
export const isWxWork = /MicroMessenger/i.test(UA) && /wxwork/i.test(UA) // 企业微信
export const isYzjApp = /Qing\/.*;(iOS|iPhone|Android).*/i.test(UA) // 云之家
export const isDingTalk = /DingTalk/i.test(UA) // 钉钉
export const isAlipay = /AlipayClient/i.test(UA) // 支付宝
export const isWeLink = /HuaWei-AnyOffice/i.test(UA) // 华为WeLink
export const isAndroid = UA.indexOf('android') > 0
export const isIOS = /iphone|ipad|ipod|ios/.test(UA)
export const isMobile = /Android|webOS|iPhone|iPad|iPod|ucweb|BlackBerry|IEMobile|Windows Mobile|Opera Mini/i.test(UA)
export const isEdge = UA.indexOf('edge/') > 0
export const isChrome = /chrome\/\d+/.test(UA) && !isEdge
export const isIE = /msie|trident/.test(UA)
export const isIE9 = UA.indexOf('msie 9.0') > 0

// 如果物理像素与实际像素相等，说明返回的值可能有误（比如某些三星手机）
export const screen = window.screen

let dvScreen = screen
if (dvScreen.width === document.documentElement.clientWidth) {
  dvScreen = {
    width: dvScreen.width * dpr,
    height: dvScreen.height * dpr,
  }
} else {
  dvScreen = {
    width: dvScreen.width,
    height: dvScreen.height,
  }
}

// 设备信息
export const device = {
  UA,
  ua: UA,
  dpr,
  width: dvScreen.width,
  height: dvScreen.height,
  inBrowser,
  isWeiXin,
  isYzjApp,
  isAndroid,
  isIOS,
  isMobile,
  isChrome,
  isIE,
  isIE9,
  isEdge,
}
