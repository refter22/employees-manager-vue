import { createActionCreators } from '../../vuex.helpers'

export const modalActions = createActionCreators('modal', {
  showModal: null,
  hideModal: null
})
