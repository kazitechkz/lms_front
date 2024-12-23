<template>
  <div class="h-screen flex flex-col md:flex-row">
    <!-- Левая часть с изображением -->
    <div class="hidden md:block w-1/2 bg-[#0F0F3E] relative">
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <img
            src="/login_bg.png"
            alt="Person Image"
            class="rounded-full w-[300px] h-[300px] object-cover"
        />
      </div>
    </div>

    <!-- Правая часть -->
    <div class="flex-1 flex flex-col bg-white relative">
      <!-- Header -->
      <header class="w-full px-6 py-4 flex items-center justify-end">
        <Menu as="div" class="relative inline-block text-left w-[100px]">
          <div>
            <MenuButton class="inline-flex justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
              {{ locale == "ru" ? 'Русский' : 'Қазақ' }}
              <ChevronDownIcon class="-mr-1 size-5 text-gray-400" aria-hidden="true" />
            </MenuButton>
          </div>

          <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
            <MenuItems class="absolute w-[100px] right-0 z-10 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
              <div class="py-1">
                <MenuItem v-slot="{ active }">
                  <a @click="changeLanguage('ru')" href="#" :class="[active ? 'bg-gray-100 text-gray-900 outline-none' : 'text-gray-700', 'block px-4 py-2 text-sm']">Русский</a>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <a @click="changeLanguage('kk')" href="#" :class="[active ? 'bg-gray-100 text-gray-900 outline-none' : 'text-gray-700', 'block px-4 py-2 text-sm']">Қазақ</a>
                </MenuItem>
              </div>
            </MenuItems>
          </transition>
        </Menu>
      </header>

      <!-- Контент формы -->
      <div class="flex-1 flex items-center justify-center px-6 py-10 md:px-16">
        <div class="w-full max-w-md p-10 rounded-lg shadow-lg">
          <h2 class="text-3xl font-bold text-[#0F0F3E] mb-2">{{ $t('message.login_title') }}</h2>
          <p class="text-gray-500 mb-6">
            Don't have an account yet?
            <a href="#" class="text-purple-600 font-medium">Sign up for free</a>
          </p>

          <!-- Форма -->
          <form @submit.prevent="submitLogin">
            <div class="mb-4">
              <label class="block text-gray-700 font-medium mb-1" for="email"
              >Username Or Email</label
              >
              <input
                  id="email"
                  type="email"
                  placeholder="Name"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-purple-300"
              />
            </div>
            <div class="mb-6">
              <label class="block text-gray-700 font-medium mb-1" for="password"
              >Password</label
              >
              <input
                  id="password"
                  type="password"
                  placeholder="Password"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-purple-300"
              />
            </div>

            <button
                type="submit"
                class="w-full bg-[#00FF7F] text-white py-2 rounded-lg font-semibold text-lg hover:bg-green-500 transition"
            >
              Login
            </button>

            <div class="text-center my-6 text-gray-500">Or sign in using</div>

            <div class="flex justify-between gap-4">
              <button
                  class="flex-1 border-2 border-blue-600 text-blue-600 py-2 rounded-lg font-medium hover:bg-blue-50"
              >
                Log In via Facebook
              </button>
              <button
                  class="flex-1 border-2 border-red-600 text-red-600 py-2 rounded-lg font-medium hover:bg-red-50"
              >
                Log In via Google+
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, computed} from 'vue';
import {Menu, MenuButton, MenuItem, MenuItems} from "@headlessui/vue";
import { ChevronDownIcon } from '@heroicons/vue/20/solid'
import {localeBloc} from "@/presentation/bloc/localeBloc/LocaleBloc.ts";


const locale = computed(() => localeBloc.getState().locale);
const username = ref('');
const password = ref('');

let menuOpen = ref(false);

function changeLanguage(newLocale: "ru" | "kk" = "ru"): void {
  localeBloc.setLocale(newLocale);
}

async function submitLogin(): Promise<void> {
  console.log("Login form submitted!");
}
</script>

<style scoped>
  /* Дополнительные стили для фона */
  .bg-login-left {
    @apply bg-[#1B0A3E];
  }
</style>