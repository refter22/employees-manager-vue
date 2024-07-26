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
  },
  UPDATE_EMPLOYEE (state, updatedEmployee) {
    const index = state.employees.findIndex(emp => emp.id === updatedEmployee.id)
    if (index !== -1) {
      state.employees.splice(index, 1, updatedEmployee)
    }
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
  removeEmployee ({ commit, state }, { employeeId, deleteWithSubordinates }) {
    const removeEmployeeRecursive = (id) => {
      const subordinates = state.employees.filter(emp => emp.managerId === id)
      subordinates.forEach(sub => removeEmployeeRecursive(sub.id))
      commit('REMOVE_EMPLOYEE', id)
    }

    if (deleteWithSubordinates) {
      removeEmployeeRecursive(employeeId)
    } else {
      const employeeToRemove = state.employees.find(emp => emp.id === employeeId)
      const subordinates = state.employees.filter(emp => emp.managerId === employeeId)
      subordinates.forEach(sub => {
        commit('UPDATE_EMPLOYEE', { ...sub, managerId: employeeToRemove.managerId || null })
      })
      commit('REMOVE_EMPLOYEE', employeeId)
    }
  },
  updateEmployee ({ commit }, employee) {
    commit('UPDATE_EMPLOYEE', employee)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
