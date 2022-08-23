import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tabList: [
      {path: '/home',title: "首页"}
    ]
  },
  mutations: {
    updateTabList(state,val) {
      state.tabList = val
    }
  },
  actions: {
  },
  modules: {
  }
})
