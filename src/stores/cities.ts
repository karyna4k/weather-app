import { defineStore } from 'pinia';
import { ref, type Ref } from 'vue';
import type { CityLocation, DataLocation, Nullable } from '@/models';
import { useConvertData } from '@/composables';

export const useCitiesStore = defineStore('cities', () => {
  const savedCities: Ref<Array<CityLocation>> = ref([]);
  const selectedCity: Ref<Nullable<CityLocation>> = ref(null);
  const loading: Ref<boolean> = ref(false);
  const error = ref(null);

  // add city to the list
  function addCity(city: DataLocation) {
    if (localStorage.getItem('savedCities')) {
      savedCities.value = JSON.parse(localStorage.getItem('savedCities'));
    }

    if (
      !savedCities.value.some(({ coords: { lat, lon } }) => lat === city.lat && lon === city.lon)
    ) {
      const location: CityLocation = useConvertData(city);
      savedCities.value.push(location);
      localStorage.setItem('savedCities', JSON.stringify(savedCities.value));
    }
  }

  // remove city from the list
  function removeCity(city: CityLocation) {
    const cities = savedCities.value.filter((item: CityLocation) => {
      return item.id !== city.id;
    });
    savedCities.value = cities;
    localStorage.setItem('savedCities', JSON.stringify(savedCities.value));
  }

  return {
    savedCities,
    selectedCity,
    loading,
    error,
    addCity,
    removeCity
  };
});
