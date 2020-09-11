import qing from './lib/qing'
// import jdy from './jdy'

export const isBridge = qing.isSupportNativeJsBridge

// 初始化qing.config
// 在 qing.config 执行前，所有其它的 ydk api 都不会真正被调用
export function initQingConfig() {
  qing.config({
    debug: false,
    // 声明需要调用的API
    jsApiList: ['setYzjTitle', 'closePop', 'setPopMenu'],
    // 声明需要监听的事件，声明后可通过 document.addEventListener 绑定监听函数
    jsEventList: ['appear', 'disappear'],
  })
}

// appear事件
export function onAppear(callback) {
  if (isBridge) {
    qing.on('appear', callback)
  }
}

// disappear事件
export function onDisappear(callback) {
  if (isBridge) {
    qing.on('disappear', callback)
  }
}

// 设置云之家title
export function setYzjTitle(title) {
  if (isBridge) {
    qing.call('setWebViewTitle', { title })
  }
}

// 隐藏右上角弹出菜单
export function closePop() {
  if (isBridge) {
    qing.call('closePop')
  }
}

// 设置云之家右上角弹出菜单
export function setPopMenu(option = {}) {
  // *** 用法示例 ***
  // yzj.setPopMenu({
  //   popTitle: '更多',
  //   popTitleCallBack: () => {router.push('/more')},
  //   items: [{title: '自定义', callback: () => {}}],
  //   menuList: ['share']
  // })

  // 默认分享信息
  const shareCfg = {
    title: '',
    description: '',
    url: location.href.replace(location.hash, ''),
    appLogo: '', // base64
    appName: '',
    isShowExt: false,
  }

  if (option.shareData) {
    Object.assign(shareCfg, option.shareData)
  }

  if (isBridge) {
    const popOption = {
      popTitle: '',
      popTitleCallBackId: '',
      items: [],
      menuList: [],
      shareData: shareCfg,
    }

    option.shareData = popOption.shareData
    Object.assign(popOption, option)

    if (option.items && option.items.length) {
      popOption.items = option.items.map(
        (item, index) => ({
          text: item.title,
          callBackId: 'callback' + index,
        })
      )
    }

    if (!option.popTitle) {
      delete popOption.popTitle // 兼容云之家ios端 在未设置按钮标题时 没有图标的bug
    }

    if (option.popTitleCallBack && typeof option.popTitleCallBack === 'function') {
      popOption.popTitleCallBackId = 'popTitle'
    }

    qing.call('createPop', Object.assign(popOption, {
      success: (res) => {
        const callBackId = res.data ? res.data.callBackId : ''

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
      },
    }))
  }
}

// 获取当前用户身份信息
export function getPersonInfo() {
  return new Promise((resolve, reject) => {
    if (isBridge) {
      qing.call('getPersonInfo', {
        success: (res) => {
          resolve(res.data)
        },
        error: (err) => {
          reject(err)
        },
      })
    } else {
      reject({
        success: 'false',
        error: '当前webview不支持云之家jsBridge',
      })
    }
  })
}

// 旋转界面
export function rotateUI(orientation) {
  if (isBridge) {
    qing.call('rotateUI', {
      orientation: orientation || 'landscape', // landscape|portrait
    })
  }
}
