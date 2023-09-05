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
import { computed, ref, type Ref } from 'vue';
import axios from 'axios';
import type { GeocodedCity, City } from '@/models';
import { uid } from 'uid';
import { useCitiesStore } from '@/stores/cities';

const store = useCitiesStore();

const key = import.meta.env.VITE_WEATHER_KEY;

const searchQuery = ref('');
const queryTimeout = ref(null);
const searchResults: Ref<Array<DataLocation> | null> = ref(null);
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

<style lang="scss" scoped>
.search {
  @apply space-y-4 mb-8;
  &-block {
    @apply flex flex-col gap-2;
  }
  &-label {
    @apply flex-1 font-medium ml-3;
  }
  &-field {
    @apply py-4 px-6 rounded-2xl focus:border-gray-800 focus:outline-none focus:shadow-lg;
  }
}
.results {
  &-list {
    @apply w-full divide-y-2 rounded-2xl;
  }
  &-item {
    @apply py-3 px-6 cursor-pointer bg-slate-100 hover:font-semibold;
    &:first-child {
      @apply rounded-t-2xl;
    }
    &:last-child {
      @apply rounded-b-2xl;
    }
    &.disabled {
      @apply pointer-events-none bg-white/20;
    }
  }
  &-error,
  &-empty {
    @apply py-4 px-6 text-center;
  }
}
</style>
