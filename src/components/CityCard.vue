<template>
  <li class="city">
    <h2 class="city-title">{{ `${city.city}, ${city.country}` }}</h2>
    <button class="city-removing" type="button" @click.stop="deleteCity(city.id)">
      <span class="material-symbols-outlined"> delete </span>
    </button>
  </li>
</template>

<script setup lang="ts">
import type { City } from '@/models';
import { useCitiesStore } from '@/stores/cities';

type PropTypes = {
  city: City;
};

const { deleteCity } = useCitiesStore();

defineProps<PropTypes>();
</script>

<style lang="scss" scoped>
.city {
  @apply tw-flex tw-items-baseline tw-gap-3 tw-px-6 tw-py-4 tw-bg-white tw-cursor-pointer tw-rounded-2xl;
  &-title {
    @apply tw-flex-1;
  }
}
</style>
