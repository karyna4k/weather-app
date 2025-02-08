<template>
  <div class="search">
    <div class="search-wrapper">
      <label
        for="search"
        class="search-label"
      >Add location</label>
      <input
        id="search"
        v-model="searchQuery"
        type="text"
        name="search"
        placeholder="Search for a city"
        class="search-input"
        @input="getSearchResults"
      >
    </div>
    <div>
      <ul
        v-if="searchResults && searchQuery.length !== 0"
        class="w-full divide-y-2 rounded-2xl"
      >
        <p
          v-if="searchError"
          class="py-4 px-6 text-center"
        >
          Sorry, something went wrong. Please, try again.
        </p>
        <p
          v-else-if="!searchError && searchResults.length === 0"
          class="py-4 px-6 text-center"
        >
          No results match your query. Try a different term.
        </p>
        <template v-else>
          <li
            v-for="result in isDisabled"
            :key="`${result.name},${result.country}`"
            class="results-item"
            :class="{ disabled: result.disabled }"
            :disabled="result.disabled"
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
import { computed, ref } from 'vue';
import axios from 'axios';
import type { GeocodedCity, City } from '@/models';
import { uid } from 'uid';
import { useCitiesStore } from '@/stores/cities';

const store = useCitiesStore();

const key = import.meta.env.VITE_WEATHER_KEY;

const searchQuery = ref('');
const queryTimeout = ref(null);
const searchResults = ref<GeocodedCity[] | null>(null);
const searchError = ref<boolean | null>(null);

const isDisabled = computed(() => {
  return searchResults.value.map((result: GeocodedCity) => {
    if (
      store.cities.some(
        (city: City) => result.lat === city.coords.lat && result.lon === city.coords.lon
      )
    ) {
      return { ...result, disabled: true };
    }
    return { ...result, disabled: false };
  });
});

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

const addCity = (cityResult: GeocodedCity) => {
  const newCity: City = {
    id: uid(),
    city: cityResult.name,
    country: cityResult.country,
    coords: {
      lat: cityResult.lat,
      lon: cityResult.lon
    }
  };
  store.addCity(newCity);
  searchQuery.value = '';
};
</script>

<style lang="scss">
@use '@/assets/scss/utils/variables';
.search {
  @apply space-y-4 mb-8;
  &-wrapper {
    @apply flex flex-col gap-2;
  }
  &-label {
    @apply flex-1 font-medium ml-3 text-lg;
  }
  &-input {
    @apply py-4 px-6 rounded-2xl focus:outline-none focus:shadow-md;
    border: variables.$b-purple-3;
  }
}
.results {
  &-list {
    @apply w-full divide-y-2 rounded-2xl;
  }
  &-item {
    @apply py-3 px-6 cursor-pointer  hover:font-semibold;
    &:first-child {
      @apply rounded-t-2xl;
    }
    &:last-child {
      @apply rounded-b-2xl;
    }
    &.disabled {
      @apply pointer-events-none;
    }
  }
}
</style>
