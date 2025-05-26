<template>
  <div class="space-y-3.5">
    <h2 class="">{{ title }}</h2>
    <slot name="body" />
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: 'No posts found.',
  },
});
</script>
