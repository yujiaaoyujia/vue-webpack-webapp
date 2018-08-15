/* global XuntongJSBridge:false */

import jdy from './jdy'

// 设置云之家右上角弹出菜单
export function setPopMenu(option = {}) {
  // *** 用法示例 ***
  // yzj.setPopMenu({
  //   popTitle: '更多',
  //   popTitleCallBack: () => {router.push('/more')},
  //   items: [{title: '自定义', callback: () => {}}],
  //   menuList: ['share']
  // })

  const shareCfg = {
    title: '',
    desc: '',
    link: location.href.replace(location.hash, ''),
    imgUrl: location.protocol + '//' + location.host + '/k3cloud/yun/images/jdy/jdylogo.jpg',
    appLogo: 'iVBORw0KGgoAAAANSUhEUgAAALoAAAC6CAIAAACWbMCmAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MTg3NTdENzZDM0RGMTFFN0JGODREMEY5RkI4NEM0RkQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MTg3NTdENzdDM0RGMTFFN0JGODREMEY5RkI4NEM0RkQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoxODc1N0Q3NEMzREYxMUU3QkY4NEQwRjlGQjg0QzRGRCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoxODc1N0Q3NUMzREYxMUU3QkY4NEQwRjlGQjg0QzRGRCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PrbeXckAABOZSURBVHja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',
    isShowExt: false,
    appName: '金蝶云星空'
  }

  if (option.shareData) {
    shareCfg.title = option.shareData.title
    shareCfg.desc = option.shareData.description
    shareCfg.link = option.shareData.url
    shareCfg.imgUrl = option.shareData.imgUrl
    shareCfg.appLogo = option.shareData.appLogo
  }

  if (jdy.isYzjApp) {
    const popOption = {
      popTitle: '',
      popTitleCallBackId: '',
      items: [],
      menuList: [],
      shareData: {
        isShowExt: shareCfg.isShowExt,
        title: shareCfg.title,
        url: shareCfg.link,
        description: shareCfg.desc,
        appLogo: shareCfg.appLogo,
        appName: shareCfg.appName
      }
    }

    option.shareData = popOption.shareData
    Object.assign(popOption, option)

    if (option.items && option.items.length) {
      popOption.items = option.items.map(
        (item, index) => ({
          text: item.title,
          callBackId: 'callback' + index
        })
      )
    }

    if (!option.popTitle) {
      delete popOption.popTitle // 兼容云之家ios端 在未设置按钮标题时 没有图标的bug
    }

    if (option.popTitleCallBack && typeof option.popTitleCallBack === 'function') {
      popOption.popTitleCallBackId = 'popTitle'
    }

    XuntongJSBridge.call('createPop', popOption, (ret) => {
      if (ret.success.toString() === 'true') {
        const callBackId = ret.data ? ret.data.callBackId : ''

        if (callBackId === 'popTitle') {
          option.popTitleCallBack()
        }

        if (option.items && option.items.length) {
          option.items.forEach((item, index) => {
            if (callBackId === ('callback' + index)) {
              item.callback()
            }
          })
        }
      }
    })
  }
}

// 隐藏右上角弹出菜单
export function closePop() {
  if (jdy.isYzjApp) {
    XuntongJSBridge.call('closePop')
  }
}

// 设置云之家title
export function setYzjTitle(title) {
  if (jdy.isYzjApp) {
    XuntongJSBridge.call('setWebViewTitle', { title })
  }
}

// 获取当前用户身份信息
export function getPersonInfo() {
  return new Promise((resolve, reject) => {
    if (jdy.isYzjApp) {
      XuntongJSBridge.call('getPersonInfo', {}, (result) => {
        if (result.success.toString() === 'true') {
          resolve(result.data)
        } else {
          reject(result)
        }
      })
    } else {
      reject({
        success: 'false',
        error: '运行环境非云之家app'
      })
    }
  })
}

// 选择人员
export function selectPersons(option = {}) {
  const postData = {
    isMulti: false,
    isShowMe: false,
    // range: [], // 如果不需要指定范围，则不传该字段，而不是传空数组
    selected: [],
    ignore: []
  }
  Object.assign(postData, option)

  return new Promise((resolve, reject) => {
    if (jdy.isYzjApp) {
      XuntongJSBridge.call('selectPersons', postData, (result) => {
        if (result.success.toString() === 'true') {
          resolve(result.data)
        } else {
          reject(result)
        }
      })
    } else if (jdy.config.devStatus === 'dev') {
      // Todo: 测试数据
      jdy.msg('调用了选择人员的测试数据')
      const persons = JSON.parse('[{"openId":"585c8c32e4b0ec7cf0952f1a","name":"陈秋泼","eid":"10109","avatarUrl":"http://static.yunzhijia.com/space/c/photo/load?id=59a18a1f9b521a76fcf62c0d"}]')
      resolve({ persons })
    } else {
      reject({
        success: 'false',
        error: '运行环境非云之家app'
      })
    }
  })
}

// 打开群聊界面
export function openChat(option) {
  // option: {
  //   openId: '', // openId & groupId 二选一
  //   groupId: '',
  //   draft: '',
  // }
  return new Promise((resolve, reject) => {
    if (jdy.isYzjApp) {
      XuntongJSBridge.call('chat', option, (result) => {
        if (result.success.toString() === 'true') {
          resolve(result)
        } else {
          reject(result)
        }
      })
    } else {
      reject({
        success: 'false',
        error: '运行环境非云之家app'
      })
    }
  })
}

// 旋转界面
export function rotateUI(orientation) {
  if (jdy.isYzjApp) {
    XuntongJSBridge.call('rotateUI', {
      orientation: orientation || 'landscape' // landscape|portrait
    }, () => {})
  }
}
