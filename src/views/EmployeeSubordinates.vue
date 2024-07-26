<template>
  <div>
    <div v-if="employee">
      <employee-table :displayed-employees="subordinates" :all-employees="employees" :table-title="tableTitle"
        :current-manager-id="parseInt(employeeId)" />
      <div class="navigation-buttons">
        <button @click="goBack" class="back-button">⇐ К сотрудникам верхнего уровня</button>
        <button v-if="employee.managerId" @click="goToParent" class="parent-button">↑ К вышестоящему
          руководителю</button>
      </div>
    </div>
    <p v-else>Сотрудник не найден</p>
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
    },
    goToParent () {
      if (this.employee && this.employee.managerId) {
        this.$router.push(`/employees/${this.employee.managerId}`)
      }
    }
  }
}
</script>

<style scoped>
.navigation-buttons {
  display: flex;
  gap: var(--spacing-medium);
  margin-top: var(--spacing-medium);
}

.back-button,
.parent-button {
  background-color: var(--secondary-color);
  color: white;
  border: none;
  padding: var(--spacing-small) var(--spacing-medium);
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.back-button:hover,
.parent-button:hover {
  background-color: var(--primary-color);
}

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
</style>
