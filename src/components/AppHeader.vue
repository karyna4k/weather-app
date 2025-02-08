<template>
  <header class="header">
    <div class="container">
      <div class="flex justify-between items-baseline py-5">
        <slot />
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/utils/variables';
.header {
  @apply bg-purple-dark;
}
</style>
