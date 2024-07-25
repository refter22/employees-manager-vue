<template>
  <div class="employee-table">
    <button @click="openAddModal" class="add-button">
      <add-icon />
    </button>
    <div class="table">
      <div class="table-header">
        <div class="header-cell name-column">Имя</div>
        <div class="header-cell phone-column">Номер телефона</div>
        <div class="header-cell actions-column">Действия</div>
      </div>
      <div v-for="employee in employees" :key="employee.id" class="table-row">
        <div class="cell name-column">{{ employee.name }}</div>
        <div class="cell phone-column">{{ formatPhoneNumber(employee.phone) }}</div>
        <div class="cell actions-column">
          <button @click="openDeleteModal(employee)" class="delete-button">
            <delete-icon />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EmployeesAddModal from './EmployeesAddModal.vue'
import EmployeesDeleteModal from './EmployeesDeleteModal.vue'
import { formatPhoneNumber } from '@/utils/phoneFormatter'
import AddIcon from './icons/AddIcon.vue'
import DeleteIcon from './icons/DeleteIcon.vue'

export default {
  name: 'EmployeeTable',
  components: {
    AddIcon,
    DeleteIcon
  },
  props: {
    employees: {
      type: Array,
      required: true
    }
  },
  methods: {
    openAddModal() {
      this.$store.dispatch('modal/showModal', {
        component: EmployeesAddModal
      })
    },

    openDeleteModal(employee) {
      this.$store.dispatch('modal/showModal', {
        component: EmployeesDeleteModal,
        props: { employee }
      })
    },
    formatPhoneNumber
  }
}
</script>

<style scoped>
.employee-table {
  width: 100%;
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: var(--spacing-medium);
}

.table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  margin-top: var(--spacing-medium);
  overflow: hidden;
}

.table-header,
.table-row {
  display: flex;
}

.table-header {
  background-color: var(--primary-color);
  color: white;
  font-weight: bold;
}

.header-cell,
.cell {
  padding: var(--spacing-medium);
  text-align: left;
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--border-color);
}

.header-cell {
  border-bottom: none;
}

.name-column {
  flex: 2;
  min-width: 200px;
  border-right: 1px solid var(--border-color);
}

.phone-column {
  flex: 1;
  min-width: 150px;
  border-right: 1px solid var(--border-color);
}

.actions-column {
  flex: 1;
  min-width: 100px;
  justify-content: center;
}

.table-row:last-child .cell {
  border-bottom: none;
}

.add-button {
  background-color: var(--secondary-color);
  color: white;
  border: none;
  padding: var(--spacing-small) var(--spacing-medium);
  border-radius: var(--border-radius);
  cursor: pointer;
  font-size: var(--font-size-medium);
  margin-bottom: var(--spacing-medium);
}

.add-button:hover {
  opacity: 0.9;
}

.delete-button {
  background-color: transparent;
  color: var(--danger-color);
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-small);
}

.delete-button:hover {
  color: var(--danger-color-dark);
}
</style>