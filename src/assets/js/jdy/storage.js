import config from './config'

// 数据存储（注意此方式存储经过了 JSON 解析，会还原原数据类型）
function storage(type, key, val) {
  // 如果不支持本地缓存，很可能是启用了『无痕模式』
  // if (!window[type]) {
  //   alert('为了能享受更好的服务，请关闭浏览器的无痕模式！');
  //   return;
  // }

  // 不支持/无痕模式/禁用了缓存（safari 禁用缓存会报 SecurityError: Dom Exception 18）
  try {
    window[type].setItem('test-storage', 'test')
    window[type].removeItem('test-storage')
  } catch (err) {
    // alert('您开启了无痕模式或禁用了缓存，为了能享受更好的服务，请更改您的设置。')
    return false
  }

  if (typeof val === 'undefined') { // 读取
    try {
      return JSON.parse(window[type].getItem(key))
    } catch (r) {
      return window[type].getItem(key)
    }
  } else if (val === null || val === '') { // 删除
    return window[type].removeItem(key)
  } else { // 写入
    // 当本地存储满了，再往里面写数据，将会触发 error
    // return window[type].setItem(key, JSON.stringify(val))
    try {
      return window[type].setItem(key, JSON.stringify(val))
    } catch (e) {
      if (type === 'sessionStorage') {
        window.sessionStorage.clear() // 删除缓存
      }
      return window[type].setItem(key, JSON.stringify(val))
    }
  }
}

// 纯净的本地存储-sessionStorage，可用于页面间传参
export function pureSession(key, val) {
  return storage('sessionStorage', key, val)
}

// 本地存储-sessionStorage，可用于页面间传参
export function session(key, val) {
  let prefix = ''
  if (config.storageGUID) {
    prefix = config.storageGUID + '-'
  }

  const StorageAreaGUID = pureSession('StorageAreaGUID')
  if (StorageAreaGUID) {
    prefix = prefix + StorageAreaGUID + '-'
  }

  key = prefix + key
  return storage('sessionStorage', key, val)
}

// 纯净的本地存储-localStorage
export function pureStore(key, val) {
  return storage('localStorage', key, val)
}

// 本地存储-localStorage
export function store(key, val) {
  let prefix = ''
  if (config.storageGUID) {
    prefix = config.storageGUID + '-'
  }

  const StorageAreaGUID = pureSession('StorageAreaGUID')
  if (StorageAreaGUID) {
    prefix = prefix + StorageAreaGUID + '-'
  }

  key = prefix + key
  return storage('localStorage', key, val)
}

// 删除 key 值中包含所给字符的缓存
export function removeStoragesByKeyContains(str, type) {
  const storage = window[type || 'sessionStorage']
  let storageLen = storage.length
  let storageKey

  // 如果不支持本地缓存，很可能是启用了『无痕模式』
  if (!storage) {
    // alert('为了能享受更好的服务，请关闭浏览器的无痕模式！')
    return
  }

  // 获取缓存 storageGUID 前缀
  let prefix = ''
  const StorageAreaGUID = pureSession('StorageAreaGUID')
  if (config.storageGUID) {
    prefix = config.storageGUID + '-'
  }
  if (StorageAreaGUID) {
    prefix = prefix + StorageAreaGUID + '-'
  }

  // 遍历缓存
  while (storageLen) {
    storageLen--
    storageKey = storage.key(storageLen)

    // 判断须移除 storageGUID 干扰
    const pureKey = storageKey.replace(prefix, '')
    if (pureKey.indexOf(str) !== -1) {
      storage.removeItem(storageKey)
    }
  }
}

// 删除除了所给 key 值的缓存，参数格式：'key1|key2|key3'
export function removeStoragesBut(keys, type) {
  keys = keys.split('|')
  const storage = window[type || 'localStorage']
  let len = storage.length
  let key

  // 如果不支持本地缓存，很可能是启用了『无痕模式』
  if (!storage) {
    // alert('为了能享受更好的服务，请关闭浏览器的无痕模式！')
    return
  }

  while (len) {
    len--
    key = storage.key(len)
    if (keys.indexOf(key) === -1) {
      storage.removeItem(key)
    }
  }
}
