<script setup lang="ts">
import {onMounted, ref} from "vue";
import type {Role} from "@/domain/entities/Role.ts";
import {dependencyLocator} from "@/core/dependicies/dependencyLocator.ts";
import {useRoute} from "vue-router";

let role = ref<Role|null>(null);
let error = ref<string|null>("");
let roleBloc = dependencyLocator.provideRolePloc()
let route = useRoute();

onMounted(async () => {
  await roleBloc.getRoleById(route.params.id).catch((error) => {console.error(error)});
  role.value = roleBloc.store.role;
  error.value = roleBloc.store.error;
});
</script>

<template>
  <h1>Role Detail Page</h1>
  <p v-if="role">{{role.titleRu}}</p>
</template>

<style scoped>

</style>