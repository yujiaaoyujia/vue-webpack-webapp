import config from './config'
import { device, isWeiXin, isYzjApp, isAndroid, isIOS, isMobile } from './env'
import { getParam, setParam, delParam, setObj, getRootPath } from './location'
import setTitle from './hack'
import cookie from './cookie'
import { pureStore, store, pureSession, session, removeStoragesByKeyContains } from './storage'
import { msg, toast, dialog, loading } from './ui'
import { ajax, get, post, awaitPost, xhrs, params, upParams, cancelRequest, cancelAllRequest } from './ajax'
import { getStyle, deepExtend, getStringLength, intervalCondition } from './util'

// 工具函数库
export default {
  // 通用配置
  version: config.version,
  config,

  // 环境变量
  device,
  isWeiXin,
  isYzjApp,
  isAndroid,
  isIOS,
  isMobile,

  // 通用工具
  noop: () => {},

  // 常用工具
  getParam,
  setParam,
  delParam,
  setObj,
  getRootPath,
  setTitle,

  // 数据存储
  cookie,
  pureStore,
  store,
  pureSession,
  session,
  removeStoragesByKeyContains,

  // UI 组件
  msg,
  toast,
  dialog,
  loading,

  // ajax
  ajax,
  get,
  post,
  awaitPost,
  xhrs,
  params,
  upParams,
  cancelRequest,
  cancelAllRequest,

  // util
  getStyle,
  deepExtend,
  getStringLength,
  intervalCondition,
}
