<template>
  <div class="city">
    <div class="info">
      <div class="info-title">{{ weather.name }}</div>
      <div class="info-main">
        <img
          :src="`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`"
          :alt="weather.weather[0].main"
        />
        <div>{{ `${Math.round(weather.main.temp)}&deg;` }}</div>
      </div>
      <div class="info-descr">{{ `${weather.weather[0].description}` }}</div>
      <ul class="info-list">
        <li class="item">
          <span class="item-title"
            ><span class="material-symbols-outlined"> thermostat </span>
            FEELS LIKE
          </span>
          <span class="item-descr">{{ `${Math.round(weather.main.feels_like)}&deg;C` }}</span>
        </li>
        <li class="item">
          <span class="item-title">
            <span class="material-symbols-outlined"> air </span>
            WIND
          </span>
          <span class="item-descr">{{
            `${getWindDirection} ${weather.wind.speed.toFixed(1)} m/s`
          }}</span>
        </li>
        <li class="item">
          <span class="item-title">
            <span class="material-symbols-outlined"> compress </span>
            PRESSURE
          </span>
          <span class="item-descr">{{ `${weather.main.pressure} hPa` }} </span>
        </li>
        <li class="item">
          <span class="item-title">
            <span class="material-symbols-outlined"> humidity_percentage </span>
            HUMIDITY
          </span>
          <span class="item-descr">
            {{ `${weather.main.humidity}%` }}
          </span>
        </li>
        <li class="item">
          <span class="item-title">
            <span class="material-symbols-outlined"> cloud </span>
            CLOUDINESS
          </span>
          <span class="item-descr">
            {{ `${weather.clouds.all}%` }}
          </span>
        </li>
        <li class="item">
          <span class="item-title">
            <span class="material-symbols-outlined">visibility</span>
            VISIBILITY
          </span>
          <span class="item-descr">
            {{ `${(weather.visibility / 1000).toFixed(1)} km` }}
          </span>
        </li>
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
.info {
  &-title {
    @apply text-center text-2xl sm:text-4xl font-bold;
  }
  &-main {
    @apply flex justify-center items-center text-xl sm:text-3xl font-medium;
    img {
      @apply w-24;
    }
  }
  &-descr {
    @apply text-center font-medium text-lg sm:text-xl;
  }
  &-list {
    @apply grid gap-4 my-10;
    grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
    @screen md {
      grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr));
    }
  }
}
.item {
  @apply flex flex-col gap-2 pl-12 pr-8 py-4 rounded-2xl bg-white;
  box-shadow: -1px -1px 0 rgba(0, 0, 0, 0.2) inset;
  &-title {
    @apply flex items-center gap-2 text-xs font-medium;
  }
  &-descr {
    @apply font-semibold text-xl;
  }
}
</style>
