<template>
  <AdminHeader />
  <AdminSidebar />
  <div class="p-4 sm:ml-64">
    <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
      <RouterView></RouterView>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { RouterView } from 'vue-router';
import { provide, ref } from 'vue';
import AdminHeader from "@/presentation/layouts/admin/AdminHeader.vue";
import AdminSidebar from "@/presentation/layouts/admin/AdminSidebar.vue";

// Состояние для управления Sidebar
const isSidebarOpen = ref(false);

// Предоставляем состояние дочерним компонентам
provide('isSidebarOpen', isSidebarOpen);
provide('toggleSidebar', () => (isSidebarOpen.value = !isSidebarOpen.value));

</script>

<style scoped>
/* Дополнительные глобальные или кастомные стили */
</style>
