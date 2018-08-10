// import jdy from '../assets/js/jdy/'
import format from 'date-fns/format'

// 日期时间通过 date-fns 格式化
export function formatDate(v, form) {
  if (!v) { return '' }
  if (form) {
    return format(v, form)
  }
  return v
}

// 逗号分隔千分位
export function splitByComma(num) {
  const round = (Math.round(Math.abs(num) * 100) / 100) * (+num < 0 ? -1 : 1)
  return round.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
}

export default {
  formatDate,
  splitByComma,
}
