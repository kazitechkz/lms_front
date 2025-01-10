<template>
  <div class="mb-5">
    <label v-if="label" :class="error != '' ? 'text-red-700 dark:text-red-500' : ''" class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-500">{{label}}</label>
    <div class="relative">
      <div v-if="icon" class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
        <span v-html="icon"></span>
      </div>
      <input :required="required" :disabled="disabled" :placeholder="placeholder" :class="error != '' ? 'bg-red-50 border-red-500 text-red-900 dark:text-red-400 placeholder-red-700 dark:placeholder-red-500 focus:ring-red-500 focus:border-red-500 dark:border-red-500' : ''" type="text" class="border text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700">
      <p v-if="error" class="mt-2 text-sm text-red-600 dark:text-red-500"><span class="font-medium">{{ error }}</span></p>
    </div>

  </div>
</template>

<script setup lang="ts">
  defineProps({
    label: {
      type: String,
      required: false
    },
    icon: {
      type: String,
      required: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'text'
    },
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    },
    error: {
      type: String,
      default: ''
    }
  })
</script>