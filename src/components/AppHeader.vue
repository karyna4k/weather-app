<template>
  <header class="header">
    <div class="container">
      <div class="navigation">
        <slot />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.header {
  @apply bg-white;
}
.navigation {
  @apply flex justify-between items-baseline py-5;
}
</style>
