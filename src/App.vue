<template>
  <div class="weather">
    <router-view />
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.weather {
  @apply flex flex-col font-Montserrat bg-white;
}
</style>
