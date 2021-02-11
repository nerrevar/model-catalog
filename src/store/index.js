import Vue from 'vue'
import Vuex from 'vuex'

import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    Language: 'en',
    Auth: {
      user: null,
      credential: null,
      error: null,
    },
  },
  getters: { ...getters },
  actions: { ...actions },
  mutations: { ...mutations },
})
