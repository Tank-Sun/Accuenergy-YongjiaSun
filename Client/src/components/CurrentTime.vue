<template>
  <div>
    <p v-if="location">The current time at {{ location }} is {{ currentTime }}</p>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import axios from 'axios';

let location = ref(props.location);
let currentTime = ref('');

watch(() => props.location, (newLocation) => {
  location.value = newLocation;
  // Fetch the current time for this location from your server or a third-party API
  axios.get(`/time?location=${newLocation}`)
  .then(response => {
    currentTime.value = response.data.time;
  });
}, { immediate: true });
</script>
