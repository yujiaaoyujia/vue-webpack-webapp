import Vue from 'vue'
import Router from 'vue-router'
import { lazyStart, lazyEnd } from '@/assets/js/jdy/ui'

// 静态路由
import Home from '@/views/Home'

// 路由懒加载
const Page = () => lazyStart().then(() => import(/* webpackChunkName: "page" */ '@/views/Page').finally(lazyEnd))

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Home',
      component: Home,
      meta: { title: 'Home' },
    },
    {
      path: '/Page',
      component: Page,
      meta: { title: 'Page' },
    },
    {
      path: '*',
      redirect: '/Home',
    },
  ],
})
