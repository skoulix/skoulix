<template>
  <div class="relative inline-block text-left">
    <button
      type="button"
      class="flex justify-center items-center px-2 py-2 text-sm font-medium hover:bg-white/50 focus:outline-none cursor-pointer transition-colors"
      @click="isOpen = !isOpen"
    >
      <span class="fi" :class="`fi-${getCountryCode(locale)}`" />
    </button>

    <transition name="fade">
      <div
        v-if="isOpen"
        class="absolute z-10 mt-2 w-32 px-2.5 py-2 space-y-2 rounded-md shadow-lg bg-white ring-1 ring-black/15 focus:outline-none"
      >
        <NuxtLink
          v-for="loc in availableLocales"
          :key="loc.code"
          :to="switchLocalePath(loc.code)"
          class="flex items-center text-sm text-gray-700 cursor-pointer gap-x-2"
          @click="isOpen = false"
        >
          <span :class="`fi fi-${getCountryCode(loc.code)}`" />
          {{ loc.name }}
        </NuxtLink>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import 'flag-icons/css/flag-icons.min.css';

const isOpen = ref(false);
const { locales, locale } = useI18n();
const switchLocalePath = useSwitchLocalePath();

const getCountryCode = (code) => {
  switch (code) {
    case 'en':
      return 'gb';
    case 'zh':
      return 'cn';
    default:
      return code;
  }
};

const availableLocales = computed(() =>
  (Array.isArray(locales) ? locales : locales.value).map((l) => ({
    code: l.code,
    name: l.name,
  }))
);
</script>
