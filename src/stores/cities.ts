import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';
import { uid } from 'uid';
import type { City, Coordinates } from '@/models';
import { useGeolocation } from '@/composables';

export const useCitiesStore = defineStore('cities', () => {
  const cities = ref<City[]>([]);
  const loading = ref(false);
  const error = ref(null);

  // init list of cities
  const getCities = () => {
    localStorage.getItem('cities')
      ? (cities.value = JSON.parse(localStorage.getItem('cities') ?? ''))
      : useGeolocation(fetchCity);
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
      console.log(e);
    } finally {
      loading.value = false;
    }
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
