<template>
  <div>
    <!-- Search Button -->
    <button @click="isOpen = true" class="flex items-center cursor-pointer">
      <Icon name="heroicons:magnifying-glass" class="size-6" />
    </button>

    <!-- Search Modal -->
    <TransitionRoot as="template" :show="isOpen">
      <Dialog as="div" class="relative z-50" @close="isOpen = false">
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black/25 backdrop-blur-sm" />
        </TransitionChild>

        <div class="fixed inset-0 overflow-y-auto p-4 sm:p-6 md:p-20">
          <div
            class="mx-auto max-w-2xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl transition-all"
          >
            <DialogPanel>
              <Combobox @update:modelValue="onSelect">
                <div
                  class="flex items-center justify-between relative border-b border-gray-300 p-3 space-x-3"
                >
                  <Icon
                    name="heroicons:magnifying-glass"
                    class="shrink-0 pointer-events-none size-5 text-gray-400"
                  />
                  <ComboboxInput
                    @change="searchQuery = $event.target.value"
                    @blur="searchQuery = ''"
                    placeholder="Search..."
                    class="w-full border-0 bg-transparent placeholder-gray-400 focus:ring-0 sm:text-sm outline-0"
                  />

                  <!-- Close Button -->
                  <button
                    @click="isOpen = false"
                    aria-label="Close search"
                    class="shrink-0 text-gray-400 hover:text-gray-600"
                  >
                    <Icon
                      name="heroicons:x-mark cursor-pointer"
                      class="relative size-6 top-0.5"
                    />
                  </button>
                </div>

                <div v-if="pending" class="p-4 text-sm text-gray-500">
                  Loading...
                </div>

                <ComboboxOptions
                  static
                  class="max-h-72 scroll-py-2 overflow-y-auto py-2 text-sm text-gray-800"
                >
                  <template
                    v-if="
                      data.length === 0 && !pending && searchQuery.trim() !== ''
                    "
                  >
                    <div class="px-4 py-2 text-gray-500 select-none">
                      No results found for
                      <span class="font-semibold">{{ searchQuery }}</span
                      >.
                    </div>
                  </template>

                  <ComboboxOption
                    v-for="item in data"
                    :key="item._id"
                    :value="item"
                    class="cursor-pointer select-none px-4 py-2 hover:bg-gray-100"
                  >
                    <span class="block font-medium">{{ item.title }}</span>
                    <span class="block text-gray-500">{{
                      item.description
                    }}</span>
                  </ComboboxOption>
                </ComboboxOptions>
              </Combobox>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script setup>
import {
  Dialog,
  DialogPanel,
  Combobox,
  ComboboxInput,
  ComboboxOptions,
  ComboboxOption,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue';

const { resolveLocalePath } = useUtils();
const { locale } = useI18n();
const searchQuery = ref('');
const isOpen = ref(false);

const { data, pending, refresh } = useAsyncData(
  'search-' + locale.value + '-' + searchQuery.value,
  async () => {
    // Query blog posts
    const blogResults = await queryCollection('blog')
      .where('locale', '=', locale.value)
      .where('rawbody', 'LIKE', `%${searchQuery.value}%`)
      .all();

    // Query pages
    const pageResults = await queryCollection('pages')
      .where('locale', '=', locale.value)
      .where('rawbody', 'LIKE', `%${searchQuery.value}%`)
      .all();

    // Combine both arrays
    const combinedResults = [...blogResults, ...pageResults];

    return combinedResults;
  },
);

function onSelect(data) {
  if (data) {
    // router redirect to data.path
    navigateTo(resolveLocalePath(data.path));
  }
}

// Refresh on changes
watch([locale, searchQuery], () => {
  refresh();
});
</script>
