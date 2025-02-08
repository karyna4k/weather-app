<template>
  <li class="card">
    <h3 class="card-title">
      {{ `${city.city}, ${city.country}` }}
    </h3>
    <button
      type="button"
      @click.stop="deleteCity(city.id)"
    >
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
@use '@/assets/scss/utils/variables';
.card {
  @apply flex items-baseline gap-3 px-6 py-4 cursor-pointer rounded-3xl bg-purple-light font-semibold;
  border: variables.$b-purple-3;

  &-title {
    @apply flex-1;
  }
}
</style>

