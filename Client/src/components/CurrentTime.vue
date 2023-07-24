<template>
  <div v-if="location">
    <h2>Searched Result: {{location.place.formatted_address}}</h2>
    <h3>Time Zone: {{location.timeZone.timeZoneName}}</h3>
    <p>Local Current Time: {{getLocalTime(location.timeZone)}}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  location: Object
});

const getLocalTime = (timeZone) => {
  const now = new Date();
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  const localTime = new Date(utc + (1000 * timeZone.rawOffset) + (1000 * timeZone.dstOffset));
  return localTime.toLocaleString();
};
</script>

