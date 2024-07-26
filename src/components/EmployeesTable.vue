<template>
  <div class="employee-table">
    <div class="table-header-actions">
      <h2 v-if="tableTitle" class="table-title">{{ tableTitle }}</h2>
      <button @click="openAddModal" class="add-button">
        <EmployeesIcon class="employees-icon" />
        Добавить сотрудника
      </button>
    </div>
    <div class="table">
      <div class="table-header">
        <div class="header-cell name-column">Имя</div>
        <div class="header-cell phone-column">Номер телефона</div>
        <div class="header-cell actions-column">Действия</div>
      </div>
      <div v-for="employee in displayedEmployees" :key="employee.id" class="table-row">
        <div class="cell name-column">{{ employee.name }}</div>
        <div class="cell phone-column">{{ formatPhoneNumber(employee.phone) }}</div>
        <div class="cell actions-column">
          <div class="actions-wrapper">
            <button v-if="hasSubordinates(employee)" @click="goToSubordinates(employee)"
              class="action-button subordinates-button" title="Перейти к подчинённым">
              <EmployeesIcon class="employees-icon" />
            </button>
            <button @click="openAddModal(employee.id)" class="action-button add-subordinate-button"
              title="Добавить подчиненного">
              <PlusIcon class="plus-icon" />
            </button>
            <button @click="openDeleteModal(employee)" class="action-button delete-button" title="Удалить сотрудника">
              <DeleteIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatPhoneNumber } from '@/utils/phoneFormatter'
import EmployeesIcon from '@/components/icons/EmployeesIcon.vue'
import DeleteIcon from './icons/DeleteIcon.vue'
import PlusIcon from './icons/PlusIcon.vue'
import { modalActions } from '@/store/modules/modal/modal.actions'
import EmployeesAddModal from './EmployeesAddModal.vue'
import EmployeesDeleteModal from './EmployeesDeleteModal.vue'

export default {
  name: 'EmployeesTable',
  components: {
    EmployeesIcon,
    DeleteIcon,
    PlusIcon
  },
  props: {
    displayedEmployees: {
      type: Array,
      required: true
    },
    allEmployees: {
      type: Array,
      required: true
    },
    tableTitle: {
      type: String,
      default: 'Сотрудники верхнего уровня'
    },
    currentManagerId: {
      type: Number,
      default: null
    }
  },
  methods: {
    formatPhoneNumber,
    openAddModal(managerId = null) {
      modalActions.showModal({
        component: EmployeesAddModal,
        props: { defaultManagerId: managerId || this.currentManagerId }
      })
    },
    openDeleteModal(employee) {
      modalActions.showModal({ component: EmployeesDeleteModal, props: { employee } })
    },
    hasSubordinates(employee) {
      return this.allEmployees.some(e => e.managerId === employee.id)
    },
    goToSubordinates(employee) {
      this.$router.push(`/employees/${employee.id}`)
    }
  }
}
</script>

<style scoped>
.table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  margin-top: var(--spacing-medium);
  overflow: hidden;
  background-color: white;
  box-shadow: var(--box-shadow);
}

.table-header-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-medium);
}

.table-title {
  font-size: var(--font-size-large);
  color: var(--primary-color);
  margin: 0;
  text-align: left;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
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
  justify-content: center;
}

.manager-column {
  flex: 1;
  min-width: 150px;
  border-right: 1px solid var(--border-color);
}

.actions-column {
  flex: 1;
  min-width: 100px;
  justify-content: center;
}

.cell.actions-column {
  justify-content: flex-end;
}

.actions-wrapper {
  display: flex;
  gap: var(--spacing-small);
}

.add-button {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-small);
  background-color: var(--secondary-color);
  color: white;
  border: none;
  padding: var(--spacing-small) var(--spacing-medium);
  border-radius: var(--border-radius);
  cursor: pointer;
  font-size: var(--font-size-medium);
  margin-bottom: var(--spacing-medium);
  transition: var(--transition);
}

.add-button:hover {
  background-color: var(--primary-color);
}

.action-button {
  display: flex;
  align-items: center;
  gap: var(--spacing-small);
  color: white;
  border: none;
  padding: var(--spacing-small);
  border-radius: var(--border-radius);
  cursor: pointer;
  margin-right: var(--spacing-small);
  transition: var(--transition);
}

.delete-button {
  background-color: var(--danger-color);
}

.delete-button:hover {
  background-color: var(--danger-color-dark);
}

.subordinates-button {
  background-color: var(--secondary-color);
}

.subordinates-button:hover {
  background-color: var(--primary-color);
}

.employees-icon {
  flex-shrink: 0;
}

.add-subordinate-button {
  background-color: var(--secondary-color);
}

.add-subordinate-button:hover {
  background-color: var(--primary-color);
}

.plus-icon {
  width: 24px;
  height: 24px;
}
</style>
