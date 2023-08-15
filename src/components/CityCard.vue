<template>
  <li class="city">
    <i class="fa-solid fa-bars city-dragging"></i>
    <h2 class="city-title">{{ `${city.city}, ${city.country}` }}</h2>
    <button class="city-removing" type="button" @click.stop="$emit('remove', city)">
      <i class="fa-solid fa-trash"></i>
    </button>
  </li>
</template>

<script setup lang="ts">
import { type PropType } from 'vue';
import type { CityLocation } from '@/models';

defineProps({
  city: {
    type: Object as PropType<CityLocation>,
    required: true
  }
});
</script>

<style lang="scss" scoped>
.city {
  @apply tw-flex tw-items-baseline tw-gap-3 tw-px-3 tw-py-4 tw-bg-gray-200 tw-cursor-pointer;
  &-title {
    @apply tw-flex-1;
  }
}
</style>
