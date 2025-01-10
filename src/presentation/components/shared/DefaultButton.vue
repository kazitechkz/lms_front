<script setup lang="ts">
  defineProps({
  href: {
    type: String,
    required: false,
  },
  text: {
    type: String,
    required: true,
  },
  type: {
    type: String as () => "button" | "submit" | "reset" | undefined,
    required: false,
    default: undefined,
  },
  bgColor: {
    type: String,
    required: false,
    default: "bg-white",
  },
  textColor: {
    type: String,
    required: false,
    default: "text-gray-700",
  },
  borderColor: {
    type: String,
    required: false,
    default: "border-gray-300",
  },
  hoverBgColor: {
    type: String,
    required: false,
    default: "hover:bg-gray-100",
  },
  hoverTextColor: {
    type: String,
    required: false,
    default: "hover:text-gray-900",
  },
  hoverBorderColor: {
    type: String,
    required: false,
    default: "hover:border-gray-400",
  },
  focusRingColor: {
    type: String,
    required: false,
    default: "focus:ring-gray-100",
  },
  // Dark mode styles
  darkBgColor: {
    type: String,
    required: false,
    default: "dark:bg-gray-800",
  },
  darkTextColor: {
    type: String,
    required: false,
    default: "dark:text-gray-400",
  },
  darkBorderColor: {
    type: String,
    required: false,
    default: "dark:border-gray-600",
  },
  darkHoverBgColor: {
    type: String,
    required: false,
    default: "dark:hover:bg-gray-700",
  },
  darkHoverTextColor: {
    type: String,
    required: false,
    default: "dark:hover:text-white",
  },
  darkHoverBorderColor: {
    type: String,
    required: false,
    default: "dark:hover:border-gray-600",
  },
  darkFocusRingColor: {
    type: String,
    required: false,
    default: "dark:focus:ring-gray-700",
  },
});
</script>

<template>
  <Button :type="type"
      :class="[
      bgColor,
      textColor,
      borderColor,
      hoverBgColor,
      hoverTextColor,
      hoverBorderColor,
      focusRingColor,
      darkBgColor,
      darkTextColor,
      darkBorderColor,
      darkHoverBgColor,
      darkHoverTextColor,
      darkHoverBorderColor,
      darkFocusRingColor,
    ]"
      class="mx-3 inline-flex items-center border focus:outline-none font-medium rounded-lg text-sm px-3 py-1.5"
  >
    <RouterLink :to="href ? '/' + href : '#'">{{ text }}</RouterLink>
  </Button>

</template>

<style scoped></style>
