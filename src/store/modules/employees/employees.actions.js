import { createActionCreators } from '../../vuex.helpers.js'

export const employeesActions = createActionCreators('employees', {
  setEmployees: null,
  addEmployee: null,
  removeEmployee: null
})
