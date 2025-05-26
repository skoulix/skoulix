<template>
  <div>
    <Transition name="fade" mode="out-in">
      <div v-if="pending" class="flex w-full h-screen"></div>
      <ContentRenderer v-else-if="page" :value="page" />
      <NotFound v-else />
    </Transition>
  </div>
</template>

<script setup>
const route = useRoute();
const { locale } = useI18n();
const { setContent, clearContent } = useCurrentContent();
const slug = computed(() => String(route.params.slug));

const { data: page, pending } = await useAsyncData(
  'page-' + locale.value + '-' + slug.value,
  async () => {
    const data = await queryCollection('pages')
      .path(`/${locale.value}/${slug.value}`)
      .first();
    setContent(data.description);

    return data;
  },
  {
    watch: [locale, slug],
  }
);

useSeoMeta(page?.value?.seo);

onBeforeRouteLeave(() => {
  clearContent();
});
</script>
