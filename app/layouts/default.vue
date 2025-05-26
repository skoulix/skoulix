<template>
  <NuxtLoadingIndicator color="#ffffff" class="relative z-10" />
  <AppHeader />

  <main
    class="relative z-20 overflow-hidden bg-gradient-to-b from-black via-transparent to-black"
    :style="{ marginBottom: 'var(--footer-height)' }"
  >
    <slot />
  </main>

  <AppGrid />

  <AppFooter />

  <ScrollToTop />
</template>

<script setup>
const { locale } = useI18n();

useHead({
  htmlAttrs: {
    lang: locale.value,
    class: 'bg-black',
  },
  meta: [{ charset: 'utf-8' }],
});
</script>
