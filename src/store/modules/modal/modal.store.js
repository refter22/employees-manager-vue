const state = {
  showModal: false,
  modalComponent: null,
  modalProps: {}
}

const mutations = {
  SHOW_MODAL (state, { component, props }) {
    state.showModal = true
    state.modalComponent = component
    state.modalProps = props
  },
  HIDE_MODAL (state) {
    state.showModal = false
    state.modalComponent = null
    state.modalProps = {}
  }
}

const actions = {
  showModal ({ commit }, payload) {
    commit('SHOW_MODAL', payload)
  },
  hideModal ({ commit }) {
    commit('HIDE_MODAL')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
