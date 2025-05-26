<template>
  <AppHeader />

  <slot />

  <NotFound
    :statusCode="error.statusCode"
    :message="error.message"
    @handle-error="handleError"
  />

  <AppFooter />
</template>

<script setup>
defineProps({
  error: {
    type: Object,
    required: true,
  },
});

function handleError() {
  clearError({ redirect: '/' });
}
</script>
