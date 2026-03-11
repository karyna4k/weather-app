import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';
import { uid } from 'uid';
import type { City, Coordinates } from '@/models';
import { useGeolocation } from '@/composables';

export const useCitiesStore = defineStore('cities', () => {
  const cities = ref<City[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchCity = async (coords: Coordinates) => {
    const apiKey = import.meta.env.VITE_WEATHER_KEY;
    loading.value = true;

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/geo/1.0/reverse?lat=${coords.lat}&lon=${coords.lon}&limit=5&appid=${apiKey}`,
      );
      const city = await response.data[0];
      cities.value.push({
        id: uid(),
        city: city.name,
        country: city.country,
        coords: {
          lat: city.lat,
          lon: city.lon,
        },
      });
      localStorage.setItem('cities', JSON.stringify(cities.value));
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to fetch city.';
    } finally {
      loading.value = false;
    }
  };

  // init list of cities
  const getCities = () => {
    const stored = localStorage.getItem('cities');
    if (stored) {
      cities.value = JSON.parse(stored);
      return;
    }

    const geoError = useGeolocation(fetchCity);
    if (geoError) error.value = geoError.message;
  };

  // add city to the list
  const addCity = (city: City) => {
    cities.value.push(city);
    localStorage.setItem('cities', JSON.stringify(cities.value));
  };

  // remove city from the list
  const deleteCity = (id: string) => {
    cities.value = cities.value.filter((city: City) => city.id !== id);
    localStorage.setItem('cities', JSON.stringify(cities.value));
  };

  return {
    cities,
    loading,
    error,
    getCities,
    addCity,
    deleteCity,
  };
});
