<template>
  <div class="widget">
    <router-view />
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.widget {
  @apply flex flex-col bg-white;
}
</style>
