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
      <ul v-if="searchResults" class="results-list">
        <p v-if="searchError">Sorry, something went wrong. Please, try again.</p>
        <p v-else-if="!searchError && searchResults.length === 0">
          No results match your query. Try a different term.
        </p>
        <template v-else>
          <li
            v-for="result in searchResults"
            :key="`${result.name},${result.country}`"
            class="results-item"
            @click="add(result)"
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
import type { Nullable, DataLocation } from '@/models';

const emit = defineEmits(['add']);

const key = import.meta.env.VITE_WEATHER_KEY;

const searchQuery: Ref<string> = ref('');
const queryTimeout = ref(null);
const searchResults: Ref<Array<DataLocation> | null> = ref(null);
const searchError: Ref<Nullable<boolean>> = ref(null);

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

const add = (result: DataLocation): void => {
  emit('add', result);
  searchQuery.value = '';
  // searchResults.value = [];
};
</script>

<style lang="scss" scoped>
.search {
  @apply tw-space-y-2 tw-py-4;
  &-block {
    @apply tw-flex tw-flex-col tw-gap-2;
  }
  &-label {
    @apply tw-flex-1;
  }
  &-field {
    @apply tw-py-1 tw-px-2 tw-border-2 tw-border-gray-400 focus:tw-border-gray-800 focus:tw-outline-none focus:tw-shadow-lg;
  }
}
.results {
  &-list {
    @apply tw-w-full tw-divide-y-2 tw-bg-gray-400 tw-text-white tw-shadow-md;
  }
  &-item {
    @apply tw-px-2 tw-py-2.5 tw-cursor-pointer;
  }
}
</style>
