<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import {dependencyLocator} from "@/core/dependicies/dependencyLocator.ts";
import IconButton from "@/presentation/components/shared/IconButton.vue";
import DefaultButton from "@/presentation/components/shared/DefaultButton.vue";
import Modal from "@/presentation/components/shared/Modal.vue";
import TextInput from "@/presentation/components/shared/TextInput.vue";
import {boolean, object, string} from "yup";
import type {RoleCDTO, RoleRDTO} from "@/data/dto/RoleDTO.ts";
import ToggleButton from "@/presentation/components/shared/ToggleButton.vue";
import {transliterateToLatin} from "@/presentation/utils/converter.ts";
import type {PermissionRDTO, RolePermissionCDTO} from "@/data/dto/RolePermissionDTO.ts";
import CheckboxButton from "@/presentation/components/shared/CheckboxButton.vue";

let selectedPermissions = reactive<Record<number, boolean>>({});
let permissionsByRole = ref<PermissionRDTO[]>([])
let permissions = ref<PermissionRDTO[]>([])
let roles = ref<RoleRDTO[]>([]);
let error = reactive<Record<string, string>>({});
let updateModal = ref(false);
let roleID = ref<number>(0);
let modalTitle = ref<string>("Создание новой роли");
let modalButton = ref<string>("Сохранить");
let roleBloc = dependencyLocator.provideRolePloc()
let rolePermissionBloc = dependencyLocator.provideRolePermissionPloc()
const isModalOpen = ref(false);
const isPermissionModalOpen = ref(false);
const formData = reactive({
  titleKk: "",
  titleRu: "",
  titleEn: "",
  isAdmin: false,
  canRegister: false,
});
const schema = object().shape({
  titleKk: string().required('Это поле объязательное'),
  titleRu: string().required('Это поле объязательное'),
  titleEn: string(),
  isAdmin: boolean(),
  canRegister: boolean()
})

async function addPermissionModal(roleId: number) {
  roleID.value = roleId;
  await rolePermissionBloc.getPermissionsByRole(roleId)
  permissionsByRole.value = rolePermissionBloc.store.permissionsByRole
  selectedPermissions = reactive(
      permissionsByRole.value.reduce((acc:any, permission:any) => {
        acc[permission.id] = true; // Установите флаг для каждого разрешения
        return acc;
      }, {} as Record<number, boolean>)
  );
  isPermissionModalOpen.value = true
}
function openNewModal() {
  updateModal.value = false
  modalTitle.value = "Создание новой роли";
  modalButton.value = "Сохранить";
  isModalOpen.value = true;
}

function editRoleModal(roleId: number) {
  roleID.value = roleId;
  updateModal.value = true;
  modalTitle.value = "Редактирование роли";
  modalButton.value = "Изменить";
  isModalOpen.value = true;
  const selectedRole = roles.value.find((role: RoleRDTO) => role.id === roleId);
  if (selectedRole) {
    formData.titleKk = selectedRole.titleKk;
    formData.titleRu = selectedRole.titleRu;
    formData.titleEn = selectedRole.titleEn || "";
    formData.isAdmin = selectedRole.isAdmin;
    formData.canRegister = selectedRole.canRegister;
  }
}

const handleSubmit = async () => {
  try {
    Object.keys(error).forEach((key) => (error[key] = ""));
    // Валидация данных
    await schema.validate(formData, { abortEarly: false });
    // Преобразование formData в DTO
    const dto: RoleCDTO = {
      ...formData,
      titleEn: formData.titleEn || null,
      value: transliterateToLatin(formData.titleRu), // Убедитесь, что это поле задаётся корректно
    };
    await roleBloc.createRole(dto)
    closeModal()
    await initialData()
    clearFormData()
  } catch (err:any) {
    if (err.inner) {
      err.inner.forEach((validationError: any) => {
        if (validationError.path) {
          error[validationError.path] = validationError.message;
        }
      });
    }
  }
}

const handleUpdate = async (id: number) => {
  try {
    Object.keys(error).forEach((key) => (error[key] = ""));
    // Валидация данных
    await schema.validate(formData, { abortEarly: false });
    // Преобразование formData в DTO
    const dto: RoleCDTO = {
      ...formData,
      titleEn: formData.titleEn || null,
      value: transliterateToLatin(formData.titleRu), // Убедитесь, что это поле задаётся корректно
    };
    await roleBloc.updateRole(id, dto)
    closeModal()
    await initialData()
    clearFormData()
  } catch (err:any) {
    if (err.inner) {
      err.inner.forEach((validationError: any) => {
        if (validationError.path) {
          error[validationError.path] = validationError.message;
        }
      });
    }
  }
}

const handleDelete = async (id: number) => {
  await roleBloc.deleteRole(id);
  await initialData();
}

function closeModal(): void {
  isModalOpen.value = false;
  isPermissionModalOpen.value = false;
}

const initialData = async () => {
  await roleBloc.loadRoles();
  await rolePermissionBloc.getPermissions();
  permissions.value = rolePermissionBloc.store.permissions
  roles.value = roleBloc.store.roles;
}

async function saveRolePermissions() {
  const selected = Object.entries(selectedPermissions)
      .filter(([_, isSelected]) => isSelected)
      .map(([id]) => Number(id));
  const dto: RolePermissionCDTO = {
    roleId: roleID.value, // ID текущей роли
    permissionIds: selected, // Список выбранных разрешений
  };
  await rolePermissionBloc.createRolePermissions(dto)
  closeModal()
  await initialData()
}

function clearFormData() {
  formData.titleKk = "";
  formData.titleRu = "";
  formData.titleEn = "";
  formData.isAdmin = false;
  formData.canRegister = false;
}

onMounted(async () => {
  await initialData()
});

</script>

<template>

  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <div class="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white dark:bg-gray-900">
      <h2 class="px-5">Список ролей</h2>
      <DefaultButton text="Создать" @click="openNewModal"/>
    </div>
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" class="px-6 py-3">
          Наименование
        </th>
        <th scope="col" class="px-6 py-3">
          Возможность регистрироваться
        </th>
        <th scope="col" class="px-6 py-3">
          Админ
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
          <div class="flex items-center">
            <div v-if="role.canRegister" class="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>
            <div v-if="!role.canRegister" class="h-2.5 w-2.5 rounded-full bg-red-500 me-2"></div>
          </div>
        </td>
        <td class="px-6 py-4">
          <div class="flex items-center">
            <div v-if="role.isAdmin" class="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>
            <div v-if="!role.isAdmin" class="h-2.5 w-2.5 rounded-full bg-red-500 me-2"></div>
          </div>
        </td>
        <td class="px-6 py-4">
          <div class="flex">
            <IconButton type="plus" @click="addPermissionModal(role.id)"/>
            <IconButton type="edit" @click="editRoleModal(role.id)"/>
            <IconButton @click="handleDelete(role.id)" type="delete"/>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
    <Modal :update-button="updateModal"
           :title="modalTitle"
           :is-open="isModalOpen"
           :on-close="closeModal"
           :on-click="handleSubmit"
           :on-update="() => handleUpdate(roleID)"
    >
      <template #body>
        <Form class="mx-auto">
          <TextInput :error="error.titleKk" v-model="formData.titleKk" label="Наименование на казахском" placeholder="куратор" required/>
          <TextInput :error="error.titleRu" v-model="formData.titleRu" label="Наименование на русском" placeholder="куратор" required/>
          <TextInput :error="error.titleEn" v-model="formData.titleEn" label="Наименование на английском" placeholder="куратор" />
          <ToggleButton label="Возможность регистрироваться" v-model="formData.canRegister" />
          <ToggleButton label="Админ" v-model="formData.isAdmin" />
        </Form>
      </template>
    </Modal>

    <Modal title="Добавление прав" :on-close="closeModal" :is-open="isPermissionModalOpen">
      <template #body>
        <div id="dropdownSearch" class="z-10 bg-white rounded-lg shadow w-full dark:bg-gray-700">
          <div class="p-3">
            <label for="input-group-search" class="sr-only">Поиск</label>
            <div class="relative">
              <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
              </div>
              <input type="text" id="input-group-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search user">
            </div>
          </div>
          <ul class="h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownSearchButton">
            <li v-for="permission in permissions">
              <CheckboxButton
                  :model-value="selectedPermissions[permission.id] || false"
                  @update:model-value="(value:any) => selectedPermissions[permission.id] = value"
                  :label="permission.titleRu"
                  :item-id="permission.id"/>
            </li>
          </ul>
          <a @click="saveRolePermissions" href="#" class="flex items-center p-3 text-sm font-medium text-gray-600 border-t border-gray-200 rounded-b-lg bg-gray-50 dark:border-gray-600 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-500 hover:underline">
            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
            </svg>
            Сохранить
          </a>
        </div>
      </template>
    </Modal>
  </div>

</template>

<style scoped>

</style>