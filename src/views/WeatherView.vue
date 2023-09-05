<template>
  <app-header>
    <router-link :to="{ name: 'settings' }" class="text-2xl font-bold">Forecast</router-link>
    <router-link :to="{ name: 'settings' }">
      <span class="material-symbols-outlined"> settings </span>
    </router-link>
  </app-header>
  <section class="weather">
    <div class="container">
      <div v-if="store.loading" class="loading">Loading...</div>
      <div v-if="store.error" class="error">{{ store.error }}</div>
      <city-weather v-if="store.weather" :weather="store.weather" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { defineAsyncComponent, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useWeatherStore } from '@/stores/weather';

const AppHeader = defineAsyncComponent(() => import('@/components/AppHeader.vue'));
const CityWeather = defineAsyncComponent(() => import('@/components/CityWeather.vue'));

const route = useRoute();

const store = useWeatherStore();

onMounted(async () => {
  const { lat, lon } = route.query;

  store.fetchWeather(lat, lon);
});
</script>

<style lang="scss" scoped>
.weather {
  @apply min-h-screen py-8;
}
</style>
