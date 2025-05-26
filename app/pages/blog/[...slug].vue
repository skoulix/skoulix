<template>
    <ContentRenderer
        v-if="post"
        :value="post"
        class="blog max-w-7xl mx-auto px-5 sm:px-8 py-8 lg:py-16 space-y-4 lg:space-y-6 xl:space-y-10"
    />
    <NotFound v-else />
</template>

<script setup>
const route = useRoute();
const { locale } = useI18n();
const { setContent, clearContent } = useCurrentContent();
const slug = computed(() => String(route.params.slug));

const { data: post } = await useAsyncData(
    'post-' + slug.value,
    async () => {
        const data = await queryCollection('blog')
            .path(`/${locale.value}/blog/${slug.value}`)
            .first();

        setContent(data.description);
        return data;
    },

    {
        watch: [locale],
    },
);

useSeoMeta(post?.value?.seo);

onBeforeRouteLeave(() => {
    clearContent();
});
</script>
