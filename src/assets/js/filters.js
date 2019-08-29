// import jdy from '../assets/js/jdy/'
import dayjs from 'dayjs'
import NP from 'number-precision'

// 避免数据越界告警
NP.enableBoundaryChecking(false)

// 日期时间通过 dayjs 格式化
export function formatDate(v, form) {
  if (!v) { return '' }
  if (form) {
    return dayjs(v).format(form)
  }
  return v
}

// 基于精度四舍五入
export function roundRatio(num, ratio) {
  return NP.round(num, ratio).toFixed(ratio)
}

// 逗号分隔千分位
export function splitByComma(num, ratio = 2) {
  const regExp = /(\d{1,3})(?=(?:\d{3})+(?!\d))/g
  const rounds = roundRatio(num, ratio).split('.')
  return rounds[0].replace(regExp, '$1,') + (rounds[1] ? `.${rounds[1]}` : '')
}

// 按货币对象格式化
export function currencyFormat(value, { amountDigits, sysmbol, fix }) {
  let result = splitByComma(value, amountDigits || 2)
  if (sysmbol) {
    result = fix === 'suffix' ? result + sysmbol : sysmbol + result
  }
  return result
}

// 按货币对象格式化 并将单位处理为万&亿
export function currencyAmountFormat(value, currency = {}) {
  if (isNaN(value)) {
    return value
  }
  if (Math.abs(value) >= 1000000000) {
    return currencyFormat(value / 100000000, currency) + '亿'
  }
  if (Math.abs(value) >= 1000000) {
    return currencyFormat(value / 10000, currency) + '万'
  }
  return currencyFormat(value, currency)
}

export default {
  formatDate,
  roundRatio,
  splitByComma,
  currencyFormat,
  currencyAmountFormat,
}
