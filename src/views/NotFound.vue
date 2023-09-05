<template>
  <div class="not-found">
    <div class="container space-y-4">
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
  @apply flex items-center min-h-screen py-8 bg-slate-200;
}
.title {
  @apply text-3xl sm:text-6xl font-bold;
}
.descr {
  @apply text-xl;
}
.link {
  @apply font-semibold text-gray-800;
}
</style>
