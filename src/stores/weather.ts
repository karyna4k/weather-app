import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';
import type { Nullable, Weather, Direction } from '@/models';
import type { LocationQueryValue } from 'vue-router';

export const useWeatherStore = defineStore('weather', () => {
  const weather = ref<Nullable<Weather>>(null);

  const loading = ref(false);
  const error = ref<string | null>(null);

  const getWindDirection = computed((): Direction => {
    const directions: Direction[] = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const deg = weather.value?.wind?.deg;
    if (typeof deg !== 'number') return directions[0];
    return directions[Math.round(deg / 45) % 8];
  });

  const getQueryValue = (value: LocationQueryValue | undefined): string | undefined => {
    if (value == null) return undefined;
    if (Array.isArray(value)) return value[0];
    return value;
  };

  const fetchWeather = async (lat: LocationQueryValue | undefined, lon: LocationQueryValue | undefined) => {
    const latStr = getQueryValue(lat);
    const lonStr = getQueryValue(lon);
    if (latStr == null || latStr === '' || lonStr == null || lonStr === '') return;
    const apiKey = import.meta.env.VITE_WEATHER_KEY;
    loading.value = true;

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latStr}&lon=${lonStr}&appid=${apiKey}&units=metric`,
      );
      weather.value = await response.data;
      localStorage.setItem('weather', JSON.stringify(weather.value));
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to fetch weather.';
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
