<template>
  <div class="modal-content">
    <h2 class="modal-title">Удалить сотрудника</h2>
    <p class="modal-message">
      {{ deleteMessage }}
    </p>
    <div v-if="hasSubordinates" class="checkbox-group">
      <input type="checkbox" id="deleteSubordinates" v-model="deleteWithSubordinates">
      <label for="deleteSubordinates">Удалить вместе с подчиненными</label>
    </div>
    <div class="button-group">
      <button @click="confirmDelete" class="btn btn-danger">Удалить</button>
      <button @click="$emit('close')" class="btn btn-secondary">Отмена</button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { employeesActions } from '@/store/modules/employees/employees.actions'

export default {
  name: 'EmployeesDeleteModal',
  props: {
    employee: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      deleteWithSubordinates: false
    }
  },
  computed: {
    ...mapState('employees', ['employees']),
    hasSubordinates () {
      return this.employees.some(emp => emp.managerId === this.employee.id)
    },
    deleteMessage () {
      if (this.hasSubordinates) {
        return `Сотрудник ${this.employee.name} имеет подчиненных. Выберите действие для удаления.`
      }
      return `Вы уверены, что хотите удалить сотрудника ${this.employee.name}?`
    }
  },
  methods: {
    confirmDelete () {
      employeesActions.removeEmployee({
        employeeId: this.employee.id,
        deleteWithSubordinates: this.deleteWithSubordinates
      })
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
.modal-title {
  color: var(--primary-color);
  font-size: var(--font-size-large);
  margin-bottom: var(--spacing-medium);
}

.modal-message {
  margin-bottom: var(--spacing-medium);
  color: var(--text-color);
}

.button-group {
  display: flex;
  justify-content: flex-end;
  gap: var(--spacing-small);
}

.btn {
  padding: var(--spacing-small) var(--spacing-medium);
  border: none;
  border-radius: var(--border-radius);
  cursor: pointer;
  font-size: var(--font-size-medium);
  transition: var(--transition);
}

.btn-danger {
  background-color: var(--danger-color);
  color: white;
}

.btn-secondary {
  background-color: var(--secondary-color);
  color: white;
}

.btn:hover {
  opacity: 0.9;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.checkbox-group {
  margin-bottom: var(--spacing-medium);
  display: flex;
  align-items: center;
}

.checkbox-group input[type="checkbox"] {
  margin-right: var(--spacing-small);
}
</style>
