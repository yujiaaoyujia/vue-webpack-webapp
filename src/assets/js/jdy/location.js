// 通用地址类作工具
export function getParam(name, url) {
  url = url || window.location.href
  const reg = new RegExp('(^|&|\\?|#)' + name + '=([^&]*?)(&|#|$)')
  const tempHash = url.match(/#.*/) ? url.match(/#.*/)[0] : ''
  url = url.replace(/#.*/, '')

  if (reg.test(tempHash)) {
    return decodeURIComponent(tempHash.match(reg)[2])
  }
  if (reg.test(url)) {
    return decodeURIComponent(url.match(reg)[2])
  }
  return ''
}

export function setParam(name, value, url, isHashMode) {
  if (typeof name === 'undefined' || typeof value === 'undefined' || typeof url === 'undefined') {
    return url
  }

  const reg = new RegExp('(^|&|\\?|#)' + name + '=([^&]*?)(&|#|$)')
  let tempHash = url.match(/#.*/) ? url.match(/#.*/)[0] : ''
  let separator

  url = url.replace(/#.*/, '')
  if (isHashMode === true) {
    if (reg.test(tempHash)) {
      tempHash = tempHash.replace(reg, (m, r1, r2, r3) => (r1 + name + '=' + encodeURIComponent(value) + r3))
    } else {
      separator = tempHash.indexOf('#') === -1 ? '#' : '&'
      tempHash = tempHash + separator + name + '=' + encodeURIComponent(value)
    }
    tempHash = tempHash.replace(reg, (m, r1, r2, r3) => (r1 + name + '=' + encodeURIComponent(value) + r3))
    return url + tempHash
  }
  if (reg.test(url)) {
    url = url.replace(reg, (m, r1, r2, r3) => (r1 + name + '=' + encodeURIComponent(value) + r3))
  } else {
    separator = url.indexOf('?') === -1 ? '?' : '&'
    url = url + separator + name + '=' + encodeURIComponent(value)
  }
  return url + tempHash
}

// 删除指定参数
export function delParam(name, url) {
  const origin = url || window.location.href

  const getDelUrl = (ori) => {
    let result = ori
    const firstIdx = ori.indexOf('?')
    if (firstIdx === -1) {
      return result
    }

    const baseUrl = ori.substr(0, firstIdx)
    const param = ori.substr(firstIdx + 1)
    let search = param.split('#')[0]
    const searchObj = search.split('&')

    for (let i = 0; i < searchObj.length; i++) {
      const paired = searchObj[i].split('=')
      if (paired[0] === name) {
        searchObj.splice(i, 1)
        search = searchObj.join('&')
        break
      }
    }
    result = baseUrl + '?' + search

    const hash = param.split('#')[1]
    if (hash) {
      result = result + '#' + hash.split('?')[0]
      let hashSearch = hash.split('?')[1]
      if (hashSearch) {
        const hashObj = hashSearch.split('&')
        for (let i = 0; i < hashObj.length; i++) {
          const paired = hashObj[i].split('=')
          if (paired[0] === name) {
            hashObj.splice(i, 1)
            hashSearch = hashObj.join('&')
            break
          }
        }
        result = result + '?' + hashSearch
      }
    }

    return result
  }

  // 提供了 url 参数则返回替换结果，否则替换地址栏路径
  if (url) {
    return getDelUrl(origin)
  }

  window.history.replaceState(null, '', getDelUrl(origin))
  return getDelUrl(origin)
}

// 设置 hash 值
export function setHash(hash, url) {
  url = url || window.location.href
  // return url.split('#')[0] + hash
  return url.replace(/(?:#(.*))?$/, hash)
}

export function parseHash(hash) {
  let query
  const param = {}
  const arr = hash.split('?')
  const tag = arr[0]

  if (arr.length > 1) {
    let s
    query = arr[1]
    const seg = query.split('&')

    for (let i = 0; i < seg.length; i++) {
      if (!seg[i]) {
        // eslint-disable-next-line
        continue
      }
      s = seg[i].split('=')
      param[s[0]] = s[1]
    }
  }

  return {
    hash,
    tag,
    query,
    param,
  }
}

export function serializeArray(params) {
  const param = {}
  let temp

  try {
    params = params.split('&')
    for (let i = 0, len = params.length; i < len; i++) {
      if (!params[i]) {
        // eslint-disable-next-line
        continue
      }
      temp = params[i].split('=')
      param[temp[0]] = temp[1]
    }
  } catch (err) {
    // alert('解析公用参数出错：' + err)
  }

  return param
}

// 将 url 中的参数全部提取到一个对象中并返回
export function getObj(url) {
  const obj = parseHash(url)
  return obj.param
}

export function setObj(url, obj) {
  Object.keys(obj).forEach((key) => {
    url = setParam(key, obj[key], url)
  })
  return url
}

// 获取lightapps根目录
export function getRootPath(root) {
  const pathName = window.document.location.pathname.toLowerCase()
  const pos = pathName.indexOf(root || '/kdmobile')
  if (pos > 0) {
    return pathName.substring(0, pathName.substr(1).indexOf('/') + 1)
  }
  return ''
}
