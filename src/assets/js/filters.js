// import jdy from '../assets/js/jdy/'
import moment from 'moment'

// 日期时间通过moment.js格式化
export function formatMoment(v, format, iso) {
  if (!v) { return '' }
  if (format) {
    return iso ? moment(v, iso).format(format) : moment(v).format(format)
  }
  return v
}

// 逗号分隔千分位
export function splitByComma(num) {
  const round = (Math.round(Math.abs(num) * 100) / 100) * (+num < 0 ? -1 : 1)
  return round.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
}

export default {
  formatMoment,
  splitByComma
}
