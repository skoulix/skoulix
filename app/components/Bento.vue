<template>
  <div class="bg-gradient-to-b from-black to-transparent">
    <div
      class="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8 pt-24 sm:pt-32"
      v-gsap.preset="'stagger-default'"
    >
      <h2 class="text-center text-base/7 font-semibold text-indigo-400">
        Deploy faster
      </h2>
      <div
        class="mx-auto mt-2 max-w-lg text-center text-4xl sm:text-5xl leading-tight font-semibold text-white"
      >
        Everything you need to deploy your app.
      </div>
      <div
        class="group grid gap-4 lg:grid-cols-3 lg:grid-rows-2 mt-10 sm:mt-16"
        v-spotlight
        v-gsap.preset="'stagger-default'"
      >
        <!-- Card 1 -->
        <div
          class="card relative border border-slate-800 rounded-lg lg:row-span-2"
        >
          <div class="bg-black/80 relative rounded-lg flex h-full flex-col">
            <div class="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
              <p
                class="mt-2 text-lg font-medium tracking-tight text-white max-lg:text-center"
              >
                Mobile friendly
              </p>
              <p
                class="mt-2 max-w-lg text-sm/6 text-gray-400 max-lg:text-center"
              >
                Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
                lorem cupidatat commodo.
              </p>
            </div>
            <div
              class="@container relative min-h-120 w-full grow max-lg:mx-auto max-lg:max-w-sm"
            >
              <div
                class="absolute inset-x-10 top-10 bottom-0 overflow-hidden rounded-t-[12cqw] border-x-[3cqw] border-t-[3cqw] border-gray-700 bg-gray-900 shadow-2xl"
              >
                <img
                  class="size-full object-cover object-top"
                  src="https://tailwindcss.com/plus-assets/img/component-images/bento-03-mobile-friendly.png"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Card 2 -->
        <div
          class="card relative border border-slate-800 rounded-lg max-lg:row-start-1"
        >
          <div
            class="bg-black/80 relative rounded-lg flex h-full flex-col overflow-hidden"
          >
            <div class="px-8 pt-8 sm:px-10 sm:pt-10">
              <p
                class="mt-2 text-lg font-medium tracking-tight text-white max-lg:text-center"
              >
                Performance
              </p>
              <p
                class="mt-2 max-w-lg text-sm/6 text-gray-400 max-lg:text-center"
              >
                Lorem ipsum, dolor sit amet consectetur adipisicing elit maiores
                impedit.
              </p>
            </div>
            <div
              class="flex flex-1 items-center justify-center px-8 max-lg:pt-10 max-lg:pb-12 sm:px-10 lg:pb-2"
            >
              <img
                class="w-full max-lg:max-w-xs"
                src="https://tailwindcss.com/plus-assets/img/component-images/bento-03-performance.png"
                alt=""
              />
            </div>
          </div>
        </div>

        <!-- Card 3 -->
        <div
          class="card relative border border-slate-800 rounded-lg max-lg:row-start-3 lg:col-start-2 lg:row-start-2"
        >
          <div
            class="bg-black/80 relative rounded-lg flex h-full flex-col overflow-hidden"
          >
            <div class="px-8 pt-8 sm:px-10 sm:pt-10">
              <p
                class="mt-2 text-lg font-medium tracking-tight text-white max-lg:text-center"
              >
                Security
              </p>
              <p
                class="mt-2 max-w-lg text-sm/6 text-gray-400 max-lg:text-center"
              >
                Morbi viverra dui mi arcu sed. Tellus semper adipiscing
                suspendisse semper morbi.
              </p>
            </div>
            <div
              class="@container flex flex-1 items-center max-lg:py-6 lg:pb-2"
            >
              <img
                class="h-[min(152px,40cqw)] object-cover"
                src="https://tailwindcss.com/plus-assets/img/component-images/bento-03-security.png"
                alt=""
              />
            </div>
          </div>
        </div>

        <!-- Card 4 -->
        <div
          class="card relative border border-slate-800 rounded-lg lg:row-span-2"
        >
          <div
            class="bg-black/80 relative rounded-lg flex h-full flex-col overflow-hidden"
          >
            <div class="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
              <p
                class="mt-2 text-lg font-medium tracking-tight text-white max-lg:text-center"
              >
                Powerful APIs
              </p>
              <p
                class="mt-2 max-w-lg text-sm/6 text-gray-400 max-lg:text-center"
              >
                Sit quis amet rutrum tellus ullamcorper ultricies libero dolor
                eget sem sodales gravida.
              </p>
            </div>
            <div class="relative min-h-120 w-full grow">
              <div
                class="absolute top-10 right-0 bottom-0 left-10 overflow-hidden rounded-tl-xl bg-gray-900 shadow-2xl"
              >
                <div class="flex bg-gray-800/40 ring-1 ring-white/5">
                  <div class="-mb-px flex text-sm/6 font-medium text-gray-400">
                    <div
                      class="border-r border-b border-r-white/10 border-b-white/20 bg-white/5/5 px-4 py-2 text-white"
                    >
                      NotificationSetting.jsx
                    </div>
                    <div class="border-r border-gray-600/10 px-4 py-2">
                      App.jsx
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
