<template>
  <div class="flex items-center min-h-screen py-8">
    <div class="container space-y-4">
      <h1 class="text-3xl sm:text-6xl font-bold">
        Not Found
      </h1>
      <div class="text-xl">
        Ooops, we couldn't find that page. Try going to
        <router-link
          class="ont-semibold text-gray-800"
          :to="{ name: 'settings' }"
        >
          home page
        </router-link>.
      </div>
    </div>
  </div>
</template>

