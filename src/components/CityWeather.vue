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
    @apply tw-text-center tw-text-2xl sm:tw-text-4xl tw-font-bold;
  }
  &-main {
    @apply tw-flex tw-justify-center tw-items-center tw-text-xl sm:tw-text-3xl tw-font-medium;
    img {
      @apply tw-w-24;
    }
  }
  &-descr {
    @apply tw-text-center tw-font-medium tw-text-lg sm:tw-text-xl;
  }
  &-list {
    @apply tw-grid tw-gap-4 tw-my-10;
    grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
    @screen md {
      grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr));
    }
  }
}
.item {
  @apply tw-flex tw-flex-col tw-gap-2 tw-pl-12 tw-pr-8 tw-py-4 tw-rounded-2xl tw-bg-white;
  box-shadow: -1px -1px 0 rgba(0, 0, 0, 0.2) inset;
  &-title {
    @apply tw-flex tw-items-center tw-gap-2 tw-text-xs tw-font-medium;
  }
  &-descr {
    @apply tw-font-semibold tw-text-xl;
  }
}
</style>
