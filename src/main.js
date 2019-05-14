import Vue from 'vue'
import store from './store'
import router from './router'
import { i18n, loadLanguage } from './lang'
import App from './App'

// 引入全局样式
import './assets/js/flexible'
import './assets/css/main.styl'
import './assets/css/mintUi.styl'

// 引入脚本
import jdy from './assets/js/jdy'
import filters from './assets/js/filters'
import directive from './assets/js/directive'
import { initQingConfig } from './assets/js/yunzhijia'

window.jdy = jdy
Vue.prototype.$jdy = jdy

// 关闭生产模式下的提示
Vue.config.productionTip = false
// if (!jdy.getParam('debug')) {
//   console.log = console.error = console.debug = console.warn = console.info = window.alert = jdy.noop
// }

// 定义 vue 过滤器
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]))
// 定义 vue 自定义指令
Object.keys(directive).forEach(k => Vue.directive(k, directive[k]))

// 全局守卫
router.beforeEach((to, from, next) => {
  // 根据路由meta设置title
  const title = i18n.t(to.meta.title) || document.title
  jdy.setTitle(title)
  next()
})

// 全局后置钩子
// router.afterEach((to, from) => {})

// 获取语言包以后再初始化
loadLanguage().then(() => {
  // 云之家jsbridge
  initQingConfig()

  // 创建vue实例
  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    i18n,
    store,
    router,
    template: '<App/>',
    components: { App }
  })
})
