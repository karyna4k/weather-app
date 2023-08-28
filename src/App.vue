<template>
  <div class="weather">
    <router-view />
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.weather {
  @apply tw-flex tw-flex-col tw-font-Montserrat tw-bg-white;
}
</style>
