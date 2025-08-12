<template>
  <svg
    :width="width"
    :height="height"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15 14.1668L10.8333 10.0002L15 5.8335M9.16667 14.1668L5 10.0002L9.16667 5.8335"
      :stroke="color"
      stroke-width="1.66667"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script setup>
defineProps({
  width: { type: [String, Number], default: 20 },
  height: { type: [String, Number], default: 20 },
  color: { type: String, default: '#A4A7AE' },
})
</script>


