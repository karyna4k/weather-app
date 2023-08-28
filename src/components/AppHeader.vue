<template>
  <header class="header">
    <div class="tw-container">
      <div class="navigation">
        <slot />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts"></script>

<style scoped>
.header {
  @apply tw-bg-white;
}
.navigation {
  @apply tw-flex tw-justify-between tw-items-baseline tw-py-5;
}
</style>
