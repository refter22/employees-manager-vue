<template>
  <div class="modal-content">
    <h2 class="modal-title">Добавить сотрудника</h2>
    <form @submit.prevent="addEmployee" class="modal-form">
      <div class="form-group">
        <label for="name">Имя:</label>
        <input id="name" v-model="name" required class="form-input" @input="validateName">
        <span v-if="nameError" class="error-message">{{ nameError }}</span>
      </div>
      <div class="form-group">
        <label for="phone">Номер телефона:</label>
        <input id="phone" v-model="formattedPhone" required class="form-input" @input="formatPhone">
        <span v-if="phoneError" class="error-message">{{ phoneError }}</span>
      </div>
      <div class="button-group">
        <button type="submit" class="btn btn-primary" :disabled="!isFormValid">Добавить</button>
        <button type="button" @click="$emit('close')" class="btn btn-secondary">Отмена</button>
      </div>
    </form>
  </div>
</template>

<script>
import { formatPhoneNumber, cleanPhoneNumber } from '@/utils/phoneFormatter'

export default {
  name: 'EmployeesAddModal',
  data () {
    return {
      name: '',
      phone: '',
      formattedPhone: '',
      nameError: '',
      phoneError: ''
    }
  },
  computed: {
    isFormValid () {
      return this.name && this.phone && !this.nameError && !this.phoneError
    }
  },
  methods: {
    addEmployee () {
      if (this.isFormValid) {
        this.$store.dispatch('employees/addEmployee', {
          name: this.name,
          phone: this.phone
        })
        this.$emit('close')
      }
    },
    validateName () {
      const nameRegex = /^[а-яА-Яa-zA-Z\s]+$/
      if (!this.name) {
        this.nameError = 'Имя не может быть пустым'
      } else if (!nameRegex.test(this.name)) {
        this.nameError = 'Имя должно содержать только буквы'
      } else {
        this.nameError = ''
      }
    },
    formatPhone () {
      this.formattedPhone = formatPhoneNumber(this.formattedPhone)
      this.phone = cleanPhoneNumber(this.formattedPhone)
      this.validatePhone()
    },
    validatePhone () {
      const phoneRegex = /^7\d{10}$/
      if (!this.phone) {
        this.phoneError = 'Номер телефона не может быть пустым'
      } else if (!phoneRegex.test(this.phone)) {
        this.phoneError = 'Неверный формат номера телефона'
      } else {
        this.phoneError = ''
      }
    }
  }
}
</script>

<style scoped>
.modal-title {
  margin-bottom: var(--spacing-medium);
  color: var(--primary-color);
}

.modal-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: var(--spacing-medium);
}

.form-group label {
  display: block;
  margin-bottom: var(--spacing-small);
  color: var(--text-color);
}

.form-input {
  width: 100%;
  padding: var(--spacing-small);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  font-size: var(--font-size-medium);
}

.button-group {
  display: flex;
  justify-content: flex-end;
  gap: var(--spacing-small);
  margin-top: var(--spacing-medium);
}

.btn {
  padding: var(--spacing-small) var(--spacing-medium);
  border: none;
  border-radius: var(--border-radius);
  cursor: pointer;
  font-size: var(--font-size-medium);
}

.btn-primary {
  background-color: var(--primary-color);
  color: white;
}

.btn-secondary {
  background-color: var(--secondary-color);
  color: white;
}

.btn:hover {
  opacity: 0.9;
}

.error-message {
  color: red;
  font-size: var(--font-size-small);
  margin-top: var(--spacing-small);
}

.form-input.error {
  border-color: red;
}
</style>
