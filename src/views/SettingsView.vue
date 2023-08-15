<template>
  <div class="settings">
    <div class="navigation">
      <span class="navigation-title">Settings</span>
      <router-link to="/">
        <i class="fa-solid fa-xmark"></i>
      </router-link>
    </div>

    <div class="cities">
      <city-list v-model="savedCities" :savedCities="savedCities" />
    </div>

    <app-search @add="addCityToList" />
  </div>
</template>

<script setup lang="ts">
import type { DataLocation } from '@/models';
import CityList from '@/components/CityList.vue';
import AppSearch from '@/components/AppSearch.vue';
import { useCitiesStore } from '@/stores/cities';
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';

const { savedCities, selectedCity } = storeToRefs(useCitiesStore());
const { addCity } = useCitiesStore();

function addCityToList(city: DataLocation) {
  addCity(city);
}

onMounted(() => {
  if (localStorage.getItem('savedCities')) {
    savedCities.value = JSON.parse(localStorage.getItem('savedCities'));
    selectedCity.value = JSON.parse(localStorage.getItem('selectedCity'));
  }
});
</script>

<style lang="scss" scoped>
.settings {
  @apply tw-space-y-4;
}
.navigation {
  @apply tw-flex tw-justify-between tw-items-baseline tw-px-3 tw-py-4;
  &-title {
    @apply tw-font-medium;
  }
  i::before {
    @apply tw-text-xl;
  }
}
</style>
