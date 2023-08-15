<template>
  <p v-if="loading">loading...</p>
  <p v-if="error">{{ error }}</p>
  <div v-if="cityWeather" class="weather-wrapper">
    <div class="navigation">
      <p class="navigation-title">{{ cityWeather.name }}</p>
      <router-link to="/settings">
        <i class="fa-solid fa-gear"></i>
      </router-link>
    </div>

    <city-weather :weather="cityWeather" />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useWeatherStore } from '@/stores/weather';
import CityWeather from '@/components/CityWeather.vue';

const { cityWeather, loading, error } = storeToRefs(useWeatherStore());
const { fetchCityWeather } = useWeatherStore();

fetchCityWeather();
</script>

<style lang="scss" scoped>
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
