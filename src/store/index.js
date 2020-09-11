import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'

// 因为 babel 6 的模块编译格式问题，这里需要加上 `.default`
const newGetters = require('./getters').default
const newActions = require('./actions').default
const newMutations = require('./mutations').default

Vue.use(Vuex)

const state = {
  foo: {},
  bar: {},
}

const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
})

if (module.hot) {
  module.hot.accept([
    './getters',
    './actions',
    './mutations',
  ], () => {
    store.hotUpdate({
      getters: newGetters,
      actions: newActions,
      mutations: newMutations,
    })
  })
}

export default store
