import axios from 'axios'
// import qs from 'qs'
import config from './config'
// import cookie from './cookie'
import { loading } from './ui'
import { session } from './storage'
import { intervalCondition } from './util'

const CancelToken = axios.CancelToken
config.apiPrefix = config.apiPrefix || {}
config.apiSuffix = config.apiSuffix || {}

export const xhrs = []
// axios.defaults.timeout = 8000
// axios.defaults.baseURL = config.api
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'

// Ajax 通用请求参数
export const params = {
  // version: config.version,
  // mobile: '',
  // device_id: '', // 设备 ID
  // device: device.width + ':' + device.height + '|' + device.dpr, // 用户设备信息
}

// 更新通用参数
export function upParams() {
  // let mobile = cookie('mobile')
  // if (mobile && mobile !== params.mobile) {
  //   params.mobile = mobile
  // }
}

// 初始化参数
upParams()
// console.log('params:', params)

// 初始化加载中队列
const showLoading = []
const ajaxCancels = []

// Ajax 请求封装
export function ajax(opts) {
  upParams()
  opts.params = { ...params, ...opts.params }
  opts.timeoutLimit = opts.timeoutLimit || 1 // 允许超时请求次数上限 (1-无超时重新请求)
  opts.cancelToken = opts.cancelToken || `Cancel${new Date().getTime()}` // 用于取消请求的 token

  return new Promise((resolve, reject) => {
    const cachekey = opts.cachekey
    const cache = cachekey ? session(cachekey) : null
    const done = (res) => {
      // 补充返回服务器时间
      if (res.headers && res.headers.date && res.data && !res.data.serverTime) {
        res.data.serverTime = res.headers.date
      }

      // 缓存数据
      if (cachekey && res.data.success) {
        session(cachekey, res.data)
      }

      if (opts.success) {
        opts.success(res.data)
      }

      resolve(res.data)
    }

    // 如果有缓存则使用缓存数据
    if (cache) {
      done({ data: cache })
      return
    }

    // 调用接口动画
    if (!opts.noLoading) {
      showLoading.push(1)
      loading.show()
    }

    const xhr = axios({
      url: opts.url,
      method: opts.method || opts.type || 'get',

      // 将被添加到 url 前面，除非 url 是绝对的
      baseURL: config.devStatus === 'dev' ? config.devApi : config.api,

      // 与请求一起发送的 URL 参数，必须是纯对象或 URLSearchParams 对象
      params: opts.params,

      // 作为请求主体发送的数据，仅适用于请求方法 PUT、POST 和 PATCH
      data: opts.data,

      // 这里可以在发送请求之前对请求数据做处理，比如form-data格式化等
      // 使用开头引入的 qs，将请求值序列化为 url 形式
      // transformRequest: [
      //   data => (
      //     qs.stringify(data, {
      //       encode: false
      //     })
      //     // 传入后端的 object 格式化为字符串
      //     // Object.keys(data).forEach((item) => {
      //     //   if (typeof data[item] === 'object') {
      //     //     data[item] = JSON.stringify(data[item])
      //     //   }
      //     // })
      //   )
      // ],

      // 这里提前处理返回的数据
      // transformResponse: [data => {
      //   return data
      // }],

      // 服务器将响应的数据类型，包括：arraybuffer、blob、document、json、text、stream
      responseType: opts.responseType || opts.dataType || 'json',

      // headers: {'content-type': 'application/json'},
      headers: opts.headers || opts.header || { 'content-type': 'text/plain' }, // 这里要重设，默认的有跨域问题
      // withCredentials: true, // 指示是否跨站点访问控制请求，允许携带cookie

      // 指定请求超时之前的毫秒数
      timeout: opts.timeout || 30000,

      // `auth` 表示应该使用 HTTP Basic 验证，并提供凭据
      // 这将设置一个 `Authorization` header，覆写掉现有的任意使用 `headers` 设置的自定义 `Authorization` header
      // auth: {
      //   username: 'username',
      //   password: 'password'
      // },

      // 指定用于取消请求的 cancel token
      cancelToken: new CancelToken((cancel) => {
        ajaxCancels.push({ token: opts.cancelToken, cancel })
      }),
    }).then(done).catch((err) => {
      // 请求超时处理
      if (err.code === 'ECONNABORTED') {
        opts.timeoutCount = (opts.timeoutCount || 0) + 1 // 记录请求超时次数
        if (opts.timeoutCount < opts.timeoutLimit) {
          console.log(`请求超时(${opts.timeoutCount}次): [${err}]`)
          ajax(opts).then((data) => resolve(data)).catch((err) => reject(err))
          return
        }
      }

      // 取消请求处理
      if (axios.isCancel(err)) {
        if (opts.cancel) {
          opts.cancel(err)
        }
        return
      }

      if (err.response) {
        // 请求已发出，但服务器响应的状态码不在 2xx 范围内
        console.log(err.response.data)
        console.log(err.response.status)
        console.log(err.response.headers)
      } else {
        // 一些错误是在设置请求时触发的
        console.log('Error', err.message)
      }

      if (opts.error) {
        opts.error(err)
      }

      console.log('网络异常: [' + err + ']')
      reject(err)
    }).finally(() => {
      // 关闭接口动画
      if (!opts.noLoading) {
        showLoading.pop()
        if (showLoading.length <= 0) {
          loading.hide()
        }
      }

      // 移除加载中队列
      const index = ajaxCancels.findIndex((item) => item.token === opts.cancelToken)
      if (index >= 0) {
        ajaxCancels.splice(index, 1)
      }
    })

    xhrs.push(xhr)
  })
}

// 获取完整请求链接
function getEntireUrl(url, opts) {
  // 如果是完整路径
  if (/^(https?:)?\/\//.test(url)) {
    return url
  }

  // 添加前缀后缀
  const apiPrefix = config.apiPrefix[opts.apiPrefix] || config.apiPrefix.default || ''
  const apiSuffix = config.apiSuffix[opts.apiSuffix] || config.apiSuffix.default || ''
  return apiPrefix + url + apiSuffix
}

// get 请求封装
export function get(url, params = {}, opts = {}) {
  opts = Object.assign(opts, {
    url: getEntireUrl(url, opts),
    params,
    method: 'get',
  })
  return ajax(opts)
}

// post 请求封装
export function post(url, data = {}, opts = {}) {
  // data = JSON.stringify(data)
  // data = new URLSearchParams(data)
  // data.append('param1', 'value1')

  opts = Object.assign(opts, {
    url: getEntireUrl(url, opts),
    data: JSON.stringify(data),
    // headers: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8' },
    // headers: { 'content-type': 'application/x-www-form-urlencoded' },
    // headers: { 'content-type': 'multipart/form-data' },
    headers: { 'content-type': 'application/json' },
    method: 'post',
  })
  return ajax(opts)
}

// post 请求堆栈
const xhrArray = []
export function awaitPost(url, data = {}, opts = {}) {
  return new Promise((resolve, reject) => {
    xhrArray.push(1)
    console.log(`xhrArray: ${xhrArray}`)

    const xhrLength = opts.xhrLength || 2
    const success = opts.success
    const error = opts.error
    delete opts.success
    delete opts.error

    // 遍历判断同时允许的接口上限
    intervalCondition({
      condition: () => xhrArray.length <= xhrLength,
      interval: 200,
      timeout: -1,
    }).then(() => {
      post(url, data, opts).then((res) => {
        if (success) {
          success(res)
        }
        resolve(res)
      }).catch((err) => {
        if (error) {
          error(err)
        }
        reject(err)
      }).finally(() => {
        xhrArray.pop()
        console.log(`xhrArray: ${xhrArray}`)
      })
    })
  })
}

// 异步请求本地链接
export function localGet(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, data).then((res) => resolve(res.data)).catch((err) => reject(err))
  })
}

// 设置全局 Authorization 凭据
export function setAuthToken(KEY, AUTH_TOKEN) {
  if (KEY === null) {
    delete axios.defaults.headers.common.Authorization
    return
  }

  if (!KEY) {
    return
  }

  if (!AUTH_TOKEN) {
    AUTH_TOKEN = KEY
    KEY = config.authToken || 'Basic'
  }

  axios.defaults.headers.common.Authorization = `${KEY} ${AUTH_TOKEN}`
}

// 取消接口请求
export function cancelRequest(cancelToken, message) {
  const token = ajaxCancels.find((item) => item.token === cancelToken)
  if (token) {
    token.cancel(message)
  }
}

// 取消所有接口请求
export function cancelAllRequest(message) {
  ajaxCancels.forEach((item) => item.cancel(message))
}

export default {
  xhrs,
  ajax,
  get,
  post,
  awaitPost,
  cancelRequest,
  cancelAllRequest,
}
