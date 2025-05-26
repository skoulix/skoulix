<template>
  <div class="fixed z-50 bottom-8 right-3">
    <button
      aria-label="scroll to top button"
      class="group relative overflow-hidden cursor-pointer rounded-full flex size-14 items-center justify-center p-1 text-muted transition-all duration-200 bg-dark"
      :class="{ 'opacity-100': isScrolling, 'opacity-0': !isScrolling }"
      @click="scrollToTop"
    >
      <div
        class="absolute inset-0 flex items-center [container-type:inline-size]"
      >
        <div
          class="absolute size-[100cqw] animate-spin bg-[conic-gradient(from_0_at_50%_50%,rgba(255,255,255,0.8)_0deg,transparent_60deg,transparent_300deg,rgba(255,255,255,0.5)_360deg)] opacity-0 transition duration-300 group-hover:opacity-100"
        />
      </div>

      <div
        class="absolute inset-0.5 bg-dark sm:bg-dark/80 sm:backdrop-blur-md rounded-full"
      />

      <div
        class="absolute bottom-0 left-1/2 h-1/4 w-4/5 -translate-x-1/2 bg-white/10 opacity-50 blur-md transition-all duration-500 group-hover:h-2/3 group-hover:opacity-100 rounded-full"
      />

      <Icon name="heroicons:arrow-long-up-20-solid" class="size-8 text-white" />
    </button>
  </div>
</template>

<script setup>
const isScrolling = ref(false);

onMounted(() => {
  window.addEventListener('scroll', () => {
    isScrolling.value = window.scrollY > 640;
  });
});

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}
</script>
