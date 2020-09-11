import Vue from 'vue'
import store from './store'
import router from './router'
import App from './App'

// 引入全局样式
import './assets/js/lib/flexible'
import './assets/css/main.styl'
import './assets/css/vant.styl'
// import 'vant/lib/icon/local.css'

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
Object.keys(filters).forEach((k) => Vue.filter(k, filters[k]))
// 定义 vue 自定义指令
Object.keys(directive).forEach((k) => Vue.directive(k, directive[k]))

// 全局守卫
router.beforeEach((to, from, next) => {
  // 根据路由meta设置title
  const title = to.meta.title || document.title
  jdy.setTitle(title)
  next()
})

// 全局后置钩子
// router.afterEach((to, from) => {})

// 初始化vue实例配置
const app = {
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App },
}

// 创建并挂载 vue 实例
function mountApp() {
  initQingConfig()
  new Vue(app) // eslint-disable-line no-new
}

// 根据环境异步加载 mock
if (process.env.MOCK === true) {
  import(/* webpackChunkName: "mock" */ './mock').then(() => mountApp())
} else {
  mountApp()
}
