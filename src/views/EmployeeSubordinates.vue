<template>
  <div>
    <div v-if="employee">
      <employee-table :displayed-employees="subordinates" :all-employees="employees" :table-title="tableTitle"
        :current-manager-id="parseInt(employeeId)" />
    </div>
    <p v-else>Сотрудник не найден</p>
    <button @click="goBack" class="back-button">⇐ К сотрудникам верхнего уровня</button>
    <modal />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import EmployeeTable from '@/components/EmployeesTable.vue'
import Modal from '@/components/Modal.vue'

export default {
  name: 'EmployeeSubordinates',
  components: {
    EmployeeTable,
    Modal
  },
  props: {
    employeeId: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapState('employees', ['employees']),
    employee () {
      return this.employees.find(emp => emp.id === parseInt(this.employeeId))
    },
    subordinates () {
      return this.employees.filter(emp => emp.managerId === parseInt(this.employeeId))
    },
    tableTitle () {
      return this.employee ? `Подчиненные сотрудника ${this.employee.name}` : ''
    }
  },
  methods: {
    goBack () {
      this.$router.push('/employees')
    }
  }
}
</script>

<style scoped>
.subordinates-title {
  font-size: 24px;
  color: var(--primary-color);
  margin-bottom: var(--spacing-large);
  padding-bottom: var(--spacing-small);
  text-align: center;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.back-button {
  margin-top: var(--spacing-medium);
  background-color: var(--secondary-color);
  color: white;
  border: none;
  padding: var(--spacing-small) var(--spacing-medium);
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.back-button:hover {
  background-color: var(--primary-color);
}
</style>
