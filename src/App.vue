<template>
  <div class="widget">
    <router-view />
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss">
.widget {
  @apply flex flex-col bg-primary text-dark;
}
</style>
