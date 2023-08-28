<template>
  <app-header>
    <span class="tw-font-lg tw-font-semibold">Settings</span>
    <div class="tw-cursor-pointer" @click="goBack">
      <span class="material-symbols-outlined"> close </span>
    </div>
  </app-header>
  <section class="settings">
    <div class="tw-container">
      <app-search />

      <div class="cities">
        <city-card
          v-for="city in store.cities"
          :key="city.id"
          :city="city"
          @click="goToWeather(city.coords)"
        />
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
  @apply tw-min-h-screen tw-py-8 tw-bg-slate-200;
}
.cities {
  @apply tw-space-y-2;
}
</style>
