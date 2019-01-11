// import jdy from '../assets/js/jdy/'
import dayjs from 'dayjs'
import NP from 'number-precision'

// 日期时间通过 date-fns 格式化
export function formatDate(v, form) {
  if (!v) { return '' }
  if (form) {
    return dayjs(v).format(form)
  }
  return v
}

// 逗号分隔千分位
export function splitByComma(num) {
  const round = (Math.round(Math.abs(num) * 100) / 100) * (+num < 0 ? -1 : 1)
  return round.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
}

// 基于精度四舍五入
export function roundRatio(num, ratio) {
  return NP.round(num, ratio).toFixed(ratio)
}

export default {
  formatDate,
  splitByComma,
  roundRatio,
}
