export default function (name, value, opts = {}) {
  function setCookie(name, value, opts) {
    let expires = opts.expires
    const path = opts.path
    const domain = opts.domain
    const secure = opts.secure

    // 缓存时间转为日期对象
    if (typeof expires === 'number') {
      // expires = new Date(new Date().getTime() + (expires * 1000 * 60 * 60)) // 缓存时间单位：小时
      // expires = new Date(new Date().getTime() + (expires * 1000 * 60 * 60 * 24)) // 缓存时间单位：天
      expires = new Date(new Date().getTime() + (expires * 864e+5)) // 缓存时间单位：天
    }

    document.cookie = name + '=' + escape(value)
      + (expires ? '; expires=' + expires.toUTCString() : '')
      + (path ? '; path=' + path : '')
      + (domain ? '; domain=' + domain : '')
      + (secure ? '; secure' : '')

    return true
  }

  function getCookie(name) {
    const arr = document.cookie.match(new RegExp('(^| )' + name + '=([^;]*)(;|$)'))
    if (arr !== null) {
      return unescape(arr[2])
    }
    return ''
  }

  function clearCookie(name, opts) {
    opts.expires = new Date(0)
    return setCookie(name, '', opts)
  }

  if (typeof value === 'undefined') {
    return getCookie(name)
  }
  if (value === null || value === '') {
    return clearCookie(name, opts)
  }
  return setCookie(name, value, opts)
}
