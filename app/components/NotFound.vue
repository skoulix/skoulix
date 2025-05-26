<template>
  <div class="min-h-[60svh] grid place-items-center">
    <div class="text-center">
      <h1 class="text-5xl font-semibold tracking-tight text-balance">
        {{ statusCode }}
      </h1>

      <p class="mt-6 text-lg text-balance text-gray-500">
        {{ message }}
      </p>

      <div
        class="mt-10 flex items-center flex-col md:flex-row justify-center gap-4"
      >
        <button variant="primary" @click="$emit('handle-error')">
          Go back home
        </button>

        <NuxtLinkLocale to="/contact" variant="gray" icon-position="right">
          Contact support
        </NuxtLinkLocale>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  statusCode: {
    type: Number,
    default: 404,
  },
  message: {
    type: String,
    default: 'Sorry, we couldn’t find the page you’re looking for.',
  },
});

const emit = defineEmits(['handle-error']);
</script>
