<template>
  <article
    class="group flex flex-col items-start gap-y-5"
    :class="{ 'col-span-1 sm:col-span-2': index == 0 }"
  >
    <div class="w-full relative rounded-2xl overflow-hidden">
      <NuxtImg
        :src="post?.image || '/placeholder.jpg'"
        :alt="post?.title"
        class="w-full h-52 sm:h-86 xl:h-96 object-cover will-change-all transition-all duration-1000 group-hover:scale-105 group-hover:opacity-80"
      />

      <NuxtLinkLocale
        :href="resolveLocalePath(post?.path)"
        class="absolute z-10 inset-0"
      ></NuxtLinkLocale>

      <div class="absolute z-20 right-3 bottom-3 sm:right-6 sm:bottom-6">
        <ButtonArrow
          :href="resolveLocalePath(post?.path)"
          :color-inverted="true"
        />
      </div>
    </div>

    <div class="max-w-xl">
      <div class="flex flex-wrap items-center gap-x-4 gap-y-3 text-xs">
        <time :datetime="post?.date" class="text-gray-500 space-x-1">
          <Icon name="solar:calendar-outline" class="text-lg align-bottom" />
          <span v-html="formatDate(post?.date)" />
        </time>
        <span class="text-gray-500 space-x-1">
          <Icon name="solar:alarm-outline" class="text-lg align-bottom" />
          8 min read
        </span>

        <!--
				<NuxtLinkLocale
                    :href="resolveLocalePath(post?.path)"
                    class="relative z-10 rounded-full bg-gray-100 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-200 transition"
                >
                    {{ post?.title }}
                </NuxtLinkLocale>
				-->
      </div>
      <div class="group relative">
        <h4 class="h3 mt-2">
          <NuxtLinkLocale
            :to="resolveLocalePath(post?.path)"
            class="text-inherit"
          >
            <span class="absolute inset-0" />
            {{ post?.title }}
          </NuxtLinkLocale>
        </h4>
        <p
          class="mt-3 line-clamp-3 text-dark-blue"
          v-text="post?.description"
        />
      </div>
    </div>
  </article>
</template>

<script setup>
const { resolveLocalePath, formatDate } = useUtils();

defineProps({
  post: {
    type: Object,
  },
  index: {
    type: Number,
    default: null,
  },
});
</script>
