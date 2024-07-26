<template>
  <div>
    <h2>404 - Страница не найдена</h2>
    <p>Извините, запрашиваемая страница не существует.</p>
    <router-link to="/employees">Вернуться к списку сотрудников</router-link>
  </div>
</template>

<script>
export default {
  name: 'NotFound'
}
</script>
