<template>
  <div class="search">
    <div class="search-block">
      <label for="search" class="search-label">Add location</label>
      <input
        id="search"
        v-model="searchQuery"
        type="text"
        name="search"
        placeholder="Search for a city"
        class="search-field"
        @input="getSearchResults"
      />
    </div>
    <div class="results">
      <ul v-if="searchResults && searchQuery.length !== 0" class="results-list">
        <p v-if="searchError" class="results-error">
          Sorry, something went wrong. Please, try again.
        </p>
        <p v-else-if="!searchError && searchResults.length === 0" class="results-empty">
          No results match your query. Try a different term.
        </p>
        <template v-else>
          <li
            v-for="result in searchResults"
            :key="`${result.name},${result.country}`"
            class="results-item"
            @click="addCity(result)"
          >
            {{ `${result.name}, ${result.state ? result.state + ',' : ''} ${result.country}` }}
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue';
import axios from 'axios';
import type { GeocodedCity, City } from '@/models';
import { uid } from 'uid';
import { useCitiesStore } from '@/stores/cities';

const store = useCitiesStore();

const key = import.meta.env.VITE_WEATHER_KEY;

const emits = defineEmits<{
  (e: 'add-city', newCity: City): void;
}>();

const searchQuery = ref('');
const queryTimeout = ref(null);
const searchResults: Ref<Array<DataLocation> | null> = ref(null);
const searchError = ref<boolean | null>(null);

const getSearchResults = (): void => {
  clearTimeout(queryTimeout.value);
  queryTimeout.value = setTimeout(async (): Promise<void> => {
    if (searchQuery.value !== '') {
      try {
        const result = await axios.get(
          `http://api.openweathermap.org/geo/1.0/direct?q=${searchQuery.value}&limit=5&appid=${key}`
        );
        searchResults.value = result.data;
      } catch {
        searchError.value = true;
      }

      return;
    }
    searchResults.value = null;
  }, 500);
};

const addCity = (city: GeocodedCity) => {
  const newCity: City = {
    id: uid(),
    city: city.name,
    country: city.country,
    coords: {
      lat: city.lat,
      lon: city.lon
    }
  };
  store.addCity(newCity);
  searchQuery.value = '';
};
</script>

<style lang="scss" scoped>
.search {
  @apply tw-space-y-2 tw-mb-8;
  &-block {
    @apply tw-flex tw-flex-col tw-gap-2;
  }
  &-label {
    @apply tw-flex-1 tw-font-medium tw-ml-3;
  }
  &-field {
    @apply tw-py-4 tw-px-6 tw-rounded-2xl focus:tw-border-gray-800 focus:tw-outline-none focus:tw-shadow-lg;
  }
}
.results {
  &-list {
    @apply tw-w-full tw-divide-y-2 tw-rounded-2xl tw-bg-slate-100;
  }
  &-item {
    @apply tw-py-3 tw-px-6 tw-cursor-pointer  hover:tw-font-semibold;
  }
  &-error,
  &-empty {
    @apply tw-py-4 tw-px-6 tw-text-center;
  }
}
</style>
