<!-- src/presentation/modules/Dashboard.vue -->
<template>
  <div>
    <h1>Dashboard</h1>
    <p>Welcome to the protected Dashboard page!</p>
    <button @click="logout">Logout</button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

function logout() {
  localStorage.removeItem('auth_token'); // Удаляем токен
  router.push('/login'); // Перенаправляем на страницу входа
}
</script>
