const state = {
  employees: []
}

const mutations = {
  SET_EMPLOYEES (state, employees) {
    state.employees = employees
  },
  ADD_EMPLOYEE (state, employee) {
    state.employees.push(employee)
  },
  REMOVE_EMPLOYEE (state, employeeId) {
    state.employees = state.employees.filter(employee => employee.id !== employeeId)
  }
}

const actions = {
  setEmployees ({ commit }, employees) {
    commit('SET_EMPLOYEES', employees)
  },
  addEmployee ({ commit }, employee) {
    const newEmployee = { ...employee, id: Date.now() }
    commit('ADD_EMPLOYEE', newEmployee)
  },
  removeEmployee ({ commit }, employeeId) {
    commit('REMOVE_EMPLOYEE', employeeId)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
