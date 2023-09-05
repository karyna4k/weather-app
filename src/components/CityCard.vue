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
  @apply flex items-baseline gap-3 px-6 py-4 bg-white cursor-pointer rounded-2xl;
  &-title {
    @apply flex-1;
  }
}
</style>
