<template>
  <li class="card">
    <h3 class="card-top">
      <span class="material-symbols-outlined">{{ iconName }} </span>
      <span>{{ title }}</span>
    </h3>
    <span class="card-bottom">
      <slot />
    </span>
  </li>
</template>

<script setup lang="ts">
type PropTypes = {
  title: string;
  iconName: string;
};

defineProps<PropTypes>();
</script>

<style lang="scss" scoped>
@use '@/assets/scss/utils/variables';
.card {
  @apply flex flex-col gap-2 pl-12 pr-8 py-4 rounded-3xl bg-purple-light;
  border: variables.$b-purple-3;
  &-top {
    @apply flex items-center gap-2 text-xs font-medium uppercase;
  }
  &-bottom {
    @apply font-semibold text-xl;
  }
}
</style>
