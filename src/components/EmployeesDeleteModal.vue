<template>
  <div class="modal-content">
    <h2 class="modal-title">Удалить сотрудника</h2>
    <p class="modal-message">Вы уверены, что хотите удалить сотрудника {{ employee.name }}?</p>
    <div class="button-group">
      <button @click="confirmDelete" class="btn btn-danger">Удалить</button>
      <button @click="$emit('close')" class="btn btn-secondary">Отмена</button>
    </div>
  </div>
</template>

<script>
import { employeesActions } from '@/store/modules/employees/employees.actions'

export default {
  name: 'EmployeesDeleteModal',
  props: {
    employee: {
      type: Object,
      required: true
    }
  },
  methods: {
    confirmDelete () {
      employeesActions.removeEmployee(this.employee.id)
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
.modal-title {
  margin-bottom: var(--spacing-medium);
  color: var(--primary-color);
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
</style>
