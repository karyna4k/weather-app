<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Ref } from 'vue'
import axios from 'axios'
import WeatherInfo from './components/WeatherInfo.vue'
import WeatherSettings from './components/WeatherSettings.vue'
import type { Weather } from './models/weather'

let currentComponent = ref(WeatherInfo)
const weatherData: Ref<Weather | null> = ref(null)
const key = import.meta.env.VITE_WEATHER_KEY

function openSettings() {
  currentComponent.value = WeatherSettings
}
function closeSettings() {
  currentComponent.value = WeatherInfo
}

console.log(key)

onMounted(async () => {
  const data = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${key}&units=metric`
  )

  weatherData.value = data.data

  return { weatherData }
})
</script>

<template>
  <div>
    <component :is="currentComponent" @openSettings="openSettings" @closeSettings="closeSettings">
    </component>
  </div>
</template>

<style scoped></style>
