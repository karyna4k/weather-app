<template>
  <div class="not-found">
    <div class="tw-container tw-space-y-4">
      <h1 class="title">Not Found</h1>
      <div class="descr">
        Ooops, we couldn't find that page. Try going to
        <router-link class="link" :to="{ name: 'settings' }">home page</router-link>.
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.not-found {
  @apply tw-flex tw-items-center tw-min-h-screen tw-py-8 tw-bg-slate-200;
}
.title {
  @apply tw-text-3xl sm:tw-text-6xl tw-font-bold;
}
.descr {
  @apply tw-text-xl;
}
.link {
  @apply tw-font-semibold tw-text-gray-800;
}
</style>
