import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import employees from './modules/employees/employees.store'
import modal from './modules/modal/modal.store'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    employees,
    modal
  },
  plugins: [createPersistedState({
    key: 'my-app',
    paths: ['employees', 'modal'],
    storage: window.localStorage
  })]
})

export default store
