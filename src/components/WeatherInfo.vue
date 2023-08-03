<script lang="ts" setup>
import IconSettings from './icons/IconSettings.vue'
</script>

<template>
  <div class="weather">
    <div class="weather-top">
      <span>City name</span>
      <icon-settings @click="$emit('openSettings')" />
    </div>
    <div class="weather-info">
      <img src="" alt="" />
      <span>Temperature</span>
      <div class="weather-descr">Weather description</div>
      <ul class="weather-detail">
        <li>Wind speed</li>
        <li>Pressure</li>
        <li>Humidity</li>
        <li>Dew point</li>
        <li>Visibility</li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.weather {
  &-top {
    display: flex;
    justify-content: space-between;
  }
  ::v-deep(.icon-settings) {
    cursor: pointer;
  }
}
</style>
