<script lang="ts" setup></script>

<template>
  <div class="settings">
    <div>
      <span>Settigs</span>
      <span @click="$emit('closeSettings')">x</span>
    </div>
    <ul class="city-list">
      <li class="city-item">
        <span>drag and drop</span>
        <span>London, UK</span>
        <span>Delete</span>
      </li>
      <li class="city-item">
        <span>drag and drop</span>
        <span>Moscow, RU</span>
        <span>Delete</span>
      </li>
    </ul>
    <h3>Add location</h3>
    <input type="text" />
    <button type="submit">Submit</button>
  </div>
</template>
