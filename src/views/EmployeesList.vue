<template>
  <div>
    <employee-table :displayed-employees="topLevelEmployees" :all-employees="employees" current-manager-id="null" />
    <modal />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import EmployeeTable from '@/components/EmployeesTable.vue'
import Modal from '@/components/Modal.vue'

export default {
  name: 'EmployeesList',
  components: {
    EmployeeTable,
    Modal
  },
  computed: {
    ...mapState('employees', ['employees']),
    topLevelEmployees () {
      return this.employees.filter(employee => employee.managerId === null)
    }
  }
}
</script>
