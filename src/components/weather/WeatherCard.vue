<template>
  <li class="flex flex-col gap-2 pl-12 pr-8 py-4 rounded-3xl bg-purple-light">
    <h3 class="flex items-center gap-2 text-xs font-medium uppercase">
      <span class="material-symbols-outlined">{{ iconName }} </span>
      <span>{{ title }}</span>
    </h3>
    <span class="font-semibold text-xl">
      <slot />
    </span>
  </li>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  iconName: string;
}>();
</script>
