<template>
  <li class="flex flex-col gap-2 pl-12 pr-8 py-4 rounded-2xl bg-primary shadow-2xl">
    <h3 class="flex items-center gap-2 text-xs font-medium">
      <span class="material-symbols-outlined">{{ iconName }} </span>
      <span class="uppercase">{{ title }}</span>
    </h3>
    <span class="font-semibold text-xl">
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
