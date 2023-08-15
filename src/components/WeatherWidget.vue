<template>
  <div class="weather">
    <div class="tw-container">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.weather {
  @apply tw-flex tw-flex-col tw-font-Montserrat tw-bg-white;
}
</style>
