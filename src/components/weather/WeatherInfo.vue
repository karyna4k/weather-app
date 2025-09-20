<template>
  <div>
    <div>
      <div class="text-center text-2xl sm:text-4xl font-bold">
        {{ weather.name }}
      </div>
      <div class="flex justify-center items-center text-xl sm:text-3xl font-medium">
        <img
          :src="`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`"
          :alt="weather.weather[0].main"
          class="w-24"
        >
        <div>{{ `${Math.round(weather.main.temp)}&deg;` }}</div>
      </div>
      <div class="text-center font-medium text-lg sm:text-xl">
        {{ `${weather.weather[0].description}` }}
      </div>
      <ul class="grid gap-4 my-10 grid-cols-card-mobile md:grid-cols-card">
        <weather-card
          v-for="card in cards"
          :key="`${card.title}-${card.iconName}`"
          :title="card.title"
          :icon-name="card.iconName"
        >
          {{ card.info }}
        </weather-card>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import { storeToRefs } from 'pinia';
import type { Weather } from '@/models';
import { useWeatherStore } from '@/stores/weather';

const WeatherCard = defineAsyncComponent(() => import('@/components/weather/WeatherCard.vue'));

const props = defineProps<{
  weather: Weather
}>();

const { getWindDirection } = storeToRefs(useWeatherStore());

// TODO: fix
const cards = [
  {
    title: 'feels like',
    iconName: 'thermostat',
    info: `${Math.round(props.weather.main.feels_like)}&deg;`,
  },
  {
    title: 'wind',
    iconName: 'air',
    info: `${getWindDirection.value} ${props.weather.wind.speed.toFixed(1)} m/s`,
  },
  {
    title: 'pressure',
    iconName: 'compress',
    info: `${props.weather.main.pressure} hPa`,
  },
  {
    title: 'humidity',
    iconName: 'humidity_percentage',
    info: `${props.weather.main.humidity}%`,
  },
  {
    title: 'cloudiness',
    iconName: 'cloud',
    info: `${props.weather.clouds.all}%`,
  },
  {
    title: 'visibility',
    iconName: 'visibility',
    info: `${(props.weather.visibility / 1000).toFixed(1)} km`,
  },
];
</script>
