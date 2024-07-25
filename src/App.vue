<template>
  <div id="app">
    <h1 class="page-title">Список сотрудников</h1>
    <employee-table :employees="employees" />
    <modal />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import EmployeeTable from './components/EmployeesTable.vue'
import Modal from './components/Modal.vue'

export default {
  name: 'App',
  components: {
    EmployeeTable,
    Modal
  },
  computed: {
    ...mapState('employees', ['employees'])
  }
}
</script>

<style>
@import './assets/variables.css';
@import './assets/reset.css';

#app {
  font-family: var(--font-family);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--text-color);
  background-color: var(--background-color);
  min-height: 100vh;
  padding: var(--spacing-large);
}

.page-title {
  color: var(--primary-color);
  margin-bottom: var(--spacing-large);
  font-size: var(--font-size-large);
  font-weight: bold;
  text-align: center;
  padding: var(--spacing-medium);
}
</style>