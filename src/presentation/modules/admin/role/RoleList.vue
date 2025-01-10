<script setup lang="ts">
import {onMounted, ref} from "vue";
import type {Role} from "@/domain/entities/Role.ts";
import {dependencyLocator} from "@/core/dependicies/dependencyLocator.ts";
import IconButton from "@/presentation/components/shared/IconButton.vue";
import DefaultButton from "@/presentation/components/shared/DefaultButton.vue";
import Modal from "@/presentation/components/shared/Modal.vue";
import TextInput from "@/presentation/components/shared/TextInput.vue";

let roles = ref<Role[]>([]);
let error = ref<string|null>("");
let roleBloc = dependencyLocator.provideRolePloc()
const isModalOpen = ref(false);

function openNewModal() {
  isModalOpen.value = true;
}

function closeModal() {
  isModalOpen.value = false;
}
onMounted(async () => {
  await roleBloc.loadRoles();
  roles.value = roleBloc.store.roles;
  error.value = roleBloc.store.error;
});
</script>

<template>

  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <div class="flex items-center justify-end flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white dark:bg-gray-900">
      <DefaultButton text="Создать" @click="openNewModal"/>
    </div>
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" class="px-6 py-3">
          Наименование
        </th>
        <th scope="col" class="px-6 py-3">
          Действие
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="role in roles" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <th scope="row" class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
          <div class="ps-3">
            <div class="text-base font-semibold">{{role.titleRu}}</div>
          </div>
        </th>
        <td class="px-6 py-4">
          <div class="flex">
            <IconButton type="edit"/>
            <IconButton type="delete"/>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
    <Modal title="Modal" :is-open="isModalOpen" :on-close="closeModal">
      <template #body>
        <form class="mx-auto">
          <TextInput label="Наименование на казахском" placeholder="куратор" required/>
          <TextInput label="Наименование на русском" placeholder="куратор" required/>
          <TextInput label="Наименование на английском" placeholder="куратор" error="Error message"/>
        </form>
      </template>
    </Modal>
  </div>

</template>

<style scoped>

</style>