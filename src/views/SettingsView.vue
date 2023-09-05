<template>
  <app-header>
    <span class="font-lg font-semibold">Settings</span>
    <div class="cursor-pointer" @click="goBack">
      <span class="material-symbols-outlined"> close </span>
    </div>
  </app-header>
  <section class="settings">
    <div class="container">
      <app-search />

      <div class="cities">
        <div v-if="store.loading" class="loading">Loading...</div>
        <div v-if="store.error" class="error">{{ store.error }}</div>
        <template v-if="store.cities">
          <city-card
            v-for="city in store.cities"
            :key="city.id"
            :city="city"
            @click="goToWeather(city.coords)"
          />
        </template>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { defineAsyncComponent, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useCitiesStore } from '@/stores/cities';
import type { Coordinates, Weather } from '@/models';

const AppHeader = defineAsyncComponent(() => import('@/components/AppHeader.vue'));
const AppSearch = defineAsyncComponent(() => import('@/components/AppSearch.vue'));
const CityCard = defineAsyncComponent(() => import('@/components/CityCard.vue'));

const store = useCitiesStore();

const router = useRouter();

const goBack = () => {
  const weather: Weather = JSON.parse(localStorage.getItem('weather'));
  router.push({ name: 'weather', query: { lat: weather.coord.lat, lon: weather.coord.lon } });
};

const goToWeather = (coords: Coordinates) => {
  router.push({ name: 'weather', query: { lat: coords.lat, lon: coords.lon } });
};

onMounted(() => {
  store.getCities();
});
</script>

<style lang="scss" scoped>
.settings {
  @apply min-h-screen py-8 bg-slate-200;
}
.cities {
  @apply space-y-2;
}
</style>
