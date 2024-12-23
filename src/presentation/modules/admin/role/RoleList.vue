<script setup lang="ts">
import {onMounted, ref} from "vue";
import type {RoleEntity} from "@/domain/entities/RoleEntity.ts";
import {dependencyLocator} from "@/core/dependicies/dependencyLocator.ts";

let roles = ref<RoleEntity[]>([]);
let error = ref<string|null>("");
let roleBloc = dependencyLocator.provideRolePloc()

onMounted(async () => {
  await roleBloc.loadRoles();
  roles.value = roleBloc.store.roles;
  error.value = roleBloc.store.error;
});
</script>

<template>
  <div>
    <h1>Roles</h1>
    <ul>
      <li v-for="role in roles" :key="role.id">
        {{ role.titleRu }} - ({{ role.value }})
      </li>
    </ul>
  </div>
</template>

<style scoped>

</style>