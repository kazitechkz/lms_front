<template>
  <div class="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
    <input :checked="modelValue"
           @input="$emit('update:modelValue', $event.target.checked)" :id="'checkbox-item-'+itemId" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
    <label :for="'checkbox-item-'+itemId" class="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">{{label}}</label>
  </div>
</template>

<script setup lang="ts">

import {number} from "yup";

defineProps({
    itemId: {
      type: number,
      required: true
    },
    modelValue: {
      type: Boolean,
      required: false
    },
    label: {
      type: String,
      required: true
    }
  })
</script>