<template>
  <section class="p-section contain-xl space-y-12">
    <h1 class="h1">Articles</h1>
    <template v-if="posts?.length > 0">
      <div
        class="grid gap-y-8 lg:gap-y-14 gap-x-6 lg:gap-x-8 sm:grid-cols-2 lg:grid-cols-3"
      >
        <CardArticle v-for="post in posts" :key="post.id" :post="post" />
      </div>

      <div class="pagination flex items-center justify-center gap-x-5 my-8">
        <button
          class="px-4 py-2 rounded-2xl bg-gray-200 hover:bg-gray-300 transition-colors mx-2 disabled:opacity-50"
          :disabled="currentPage === 1"
          @click="currentPage--"
        >
          Previous
        </button>
        <span>Page {{ currentPage }} / {{ totalPages }}</span>
        <button
          class="px-4 py-2 rounded-2xl bg-gray-200 hover:bg-gray-300 transition-colors mx-2 disabled:opacity-50"
          :disabled="currentPage === totalPages"
          @click="currentPage++"
        >
          Next
        </button>
      </div>
    </template>

    <EmptyState v-else title="No posts found.">
      <template #body>
        <p>We couldn't find any posts.</p>
      </template>
    </EmptyState>
  </section>
</template>

<script setup>
const { locale } = useI18n();
const currentPage = ref(1);
const perPage = ref(6);
const offset = computed(() => (currentPage.value - 1) * perPage.value);
const totalPages = computed(() => Math.ceil(totalPosts.value / perPage.value));

const { data: totalPosts } = await useAsyncData(
  'total-posts',
  () => queryCollection('blog').where('locale', '=', locale.value).count(),
  {
    watch: [locale],
  },
);

const { data: posts } = await useAsyncData(
  'posts',
  () =>
    queryCollection('blog')
      .where('locale', '=', locale.value)
      .order('date', 'DESC')
      .limit(perPage.value)
      .skip(offset.value)
      .all(),
  {
    watch: [locale, currentPage, perPage],
  },
);

useSeoMeta(posts?.value?.seo);
</script>
