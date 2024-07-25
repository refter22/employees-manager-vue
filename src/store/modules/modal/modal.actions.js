import { createActionCreators } from '../../vuex.helpers.js'

export const modalActions = createActionCreators('modal', {
  showModal: null,
  hideModal: null
})
