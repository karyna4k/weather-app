import { ref, computed, type Ref, type ComputedRef } from 'vue';
import { defineStore, storeToRefs } from 'pinia';
import axios from 'axios';
import { useCitiesStore } from './cities';
import type { Nullable, Weather, Direction } from '@/models';
import { useGeolocation } from '@/composables';

export const useWeatherStore = defineStore('weather', () => {
  const { selectedCity } = storeToRefs(useCitiesStore());

  const cityWeather: Ref<Nullable<Weather>> = ref(null);

  const loading: Ref<boolean> = ref(false);
  const error = ref(null);

  const getWindDirection: ComputedRef<Direction> = computed((): Direction => {
    const directions: Direction[] = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    return cityWeather.value
      ? directions[Math.round(cityWeather.value?.wind.deg / 45) % 8]
      : directions[0];
  });

  const fetchCityWeather = async () => {
    const apiKey = import.meta.env.VITE_WEATHER_KEY;

    let coords = {
      lat: 0,
      lon: 0
    };

    if (localStorage.getItem('savedCities')) {
      selectedCity.value = JSON.parse(localStorage.getItem('selectedCity'));
      coords = selectedCity.value ? selectedCity.value.coords : { lat: 0, lon: 0 };
    } else {
      const currentPostion = await useGeolocation();
      coords.lat = currentPostion.coords.latitude;
      coords.lon = currentPostion.coords.longitude;
    }

    loading.value = true;
    try {
      const weather = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}&units=metric`
      );
      cityWeather.value = weather.data;
    } catch (error) {
      throw new Error(error);
    } finally {
      loading.value = false;
    }
  };

  return {
    cityWeather,
    loading,
    error,
    getWindDirection,
    fetchCityWeather
  };
});
