<template>
  <div class="cities-list">
    <city-card
      v-for="city in savedCities"
      :key="city.id"
      :city="city"
      @click="goToWeather(city)"
      @remove="removeCity(city)"
    />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useCitiesStore } from '@/stores/cities';
import CityCard from '@/components/CityCard.vue';
import type { CityLocation } from '@/models';
import type { PropType } from 'vue';

defineProps({
  savedCities: {
    type: Object as PropType<Array<CityLocation>>,
    required: true
  }
});

const { selectedCity } = storeToRefs(useCitiesStore());
const { removeCity } = useCitiesStore();

const router = useRouter();

const goToWeather = (city: CityLocation): void => {
  selectedCity.value = city;
  localStorage.setItem('selectedCity', JSON.stringify(selectedCity.value));
  router.push({
    name: 'WeatherView'
  });
};
</script>

<style lang="scss" scoped>
.cities-list {
  @apply tw-space-y-2;
}
</style>
