<template>
  <header
    class="fixed z-40 top-0 left-0 right-0 w-full text-white mix-blend-difference p-5 md:p-10 lg:px-14 lg:py-12 xl:px-18 xl:py-16 transition-all"
  >
    <div
      class="max-w-xxl mx-auto flex items-center justify-between"
      aria-label="Global"
    >
      <NuxtLinkLocale to="/" class="uppercase text-lg tracking-wider">
        <span class="sr-only">Skoulix</span>
        Skoulix
      </NuxtLinkLocale>

      <!--
      <nav>
        <ul v-if="menu" class="flex space-x-4 items-center">
          <li v-for="item in menu" :key="item.path" class="relative group">
            <NuxtLinkLocale
              :to="resolveLocalePath(item.path)"
              class="flex items-center gap-1 py-2 px-4"
              :class="{
                underline: $route.path === resolveLocalePath(item.path),
                'border-transparent border-s border-e border-t rounded-t-xl group-hover:border-gray-200 group-hover:bg-white':
                  item.submenu,
              }"
            >
              {{ item?.navigation?.title }}

              <Icon
                v-if="item?.submenu"
                name="heroicons:chevron-down-solid"
                class="size-4"
              />
            </NuxtLinkLocale>

            <ul
              v-if="item?.submenu"
              class="absolute left-0 top-full flex divide-x-1 divide-gray-200 bg-white border border-gray-200 rounded-xl rounded-tl-none shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 py-10 mix-blend"
            >
              <li
                v-for="subItem in item.submenu"
                :key="subItem.path"
                class="px-8 w-[15vw] max-w-3xs"
              >
                <NuxtLinkLocale
                  :to="resolveLocalePath(subItem.path)"
                  class="block space-y-3"
                >
                  <div class="flex items-center gap-x-4">
                    <div
                      class="flex items-center justify-center w-8 h-8 rounded-lg bg-orange"
                    >
                      <Icon
                        :name="subItem.navigation.icon"
                        class="size-5 text-white"
                      />
                    </div>

                    <span>
                      {{ subItem.navigation?.title }}
                    </span>
                  </div>

                  <span class="text-sm text-dark-blue">
                    {{ subItem.navigation?.description }}
                  </span>
                </NuxtLinkLocale>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
      -->

      <!--
      <div class="flex gap-x-4 items-center">
        <LanguageSwitcher />
        <ButtonTextToSpeech />
        <Search />
      </div>
      -->
    </div>
  </header>
</template>

<script setup>
const { resolveLocalePath } = useUtils();
const menu = useNavigation();
</script>
