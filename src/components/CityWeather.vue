<template>
  <div class="city">
    <div class="city-info">
      <div class="city-info-main">
        <img
          :src="`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`"
          :alt="weather.weather[0].main"
        />
        <div>{{ `${Math.round(weather.main.temp)}&deg;C` }}</div>
      </div>
      <div class="city-info-descr">
        {{
          `Feels like ${Math.round(weather.main.feels_like)}&deg;C, ${
            weather.weather[0].description
          }`
        }}.
      </div>
      <ul class="city-info-detail">
        <li>
          <i class="fa-solid fa-wind"></i>
          <span>{{ `${getWindDirection} ${weather.wind.speed.toFixed(1)} m/s` }}</span>
        </li>
        <li>
          <i class="fa-solid fa-hurricane"></i>
          <span>{{ `${weather.main.pressure} hPa` }} </span>
        </li>
        <li>{{ `Humidity: ${weather.main.humidity}%` }}</li>
        <li>{{ `Cloudiness: ${weather.clouds.all}%` }}</li>
        <li>{{ `Visibility: ${(weather.visibility / 1000).toFixed(1)} km` }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type PropType } from 'vue';
import { storeToRefs } from 'pinia';
import type { Weather } from '@/models';
import { useWeatherStore } from '@/stores/weather';

defineProps({
  weather: {
    type: Object as PropType<Weather>,
    required: true
  }
});

const { getWindDirection } = storeToRefs(useWeatherStore());
</script>

<style lang="scss" scoped>
.city {
  @apply tw-px-3;
  &-info {
    &-main {
      @apply tw-flex tw-justify-center tw-items-center tw-my-6 tw-text-2xl tw-font-medium;
      img {
        @apply tw-w-16;
      }
    }
    &-descr {
      @apply tw-my-6;
    }
    &-detail {
      @apply tw-flex tw-flex-wrap tw-gap-4;
      li {
        width: calc(100% / 2 - 1rem);
      }
    }
  }
}
</style>
