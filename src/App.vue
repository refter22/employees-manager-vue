<template>
  <div id="app">
    <h1 class="page-title">Список сотрудников</h1>
    <div class="content-wrapper">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
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
  display: flex;
  flex-direction: column;
}

.content-wrapper {
  padding: var(--spacing-large) 0;
  width: 100%;
}

.page-title {
  color: var(--primary-color);
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  padding: var(--spacing-large) 0;
  background-color: white;
  box-shadow: var(--box-shadow);
  margin-bottom: var(--spacing-large);
}

.content-wrapper {
  max-width: var(--content-max-width);
  margin: 0 auto;
  padding: 0 var(--spacing-large);
  flex-grow: 1;
}
</style>
