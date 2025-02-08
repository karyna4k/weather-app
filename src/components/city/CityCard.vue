<template>
  <li class="card flex items-baseline gap-3 px-6 py-4 cursor-pointer rounded-3xl bg-purple-light font-semibold">
    <h3 class="flex-1">
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

const { deleteCity } = useCitiesStore();

defineProps<{
  city: City
}>();
</script>
