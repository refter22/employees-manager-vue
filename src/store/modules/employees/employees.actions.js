import { createActionCreators } from '../../vuex.helpers'

export const employeesActions = createActionCreators('employees', {
  setEmployees: null,
  addEmployee: null,
  removeEmployee: (employeeId, deleteWithSubordinates) => ({ employeeId, deleteWithSubordinates }),
  updateEmployee: null
})
