import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';
import type { Nullable, Weather, Direction } from '@/models';
import { LocationQueryValue } from 'vue-router';

export const useWeatherStore = defineStore('weather', () => {
  const weather = ref<Nullable<Weather>>(null);

  const loading = ref(false);
  const error = ref(null);

  const getWindDirection = computed((): Direction => {
    const directions: Direction[] = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    return weather.value
      ? directions[Math.round(weather.value?.wind.deg / 45) % 8]
      : // TODO: return null or something that
      directions[0];
  });

  const fetchWeather = async (lat: LocationQueryValue, lon: LocationQueryValue) => {
    const apiKey = import.meta.env.VITE_WEATHER_KEY;
    loading.value = true;

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`,
      );
      weather.value = await response.data;
      localStorage.setItem('weather', JSON.stringify(weather.value));
    } catch (e) {
      console.log(e);
    } finally {
      loading.value = false;
    }
  };

  return {
    weather,
    fetchWeather,
    loading,
    error,
    getWindDirection,
  };
});
