<template>
  <div>
    <SearchBar @search="searchLocation" />
    <div v-if="latestLocation">
      <h2>Searched Result: {{latestLocation.place.formatted_address}}</h2>
      <h3>Time Zone: {{latestLocation.timeZone.timeZoneName}}</h3>
      <p>Local Current Time: {{getLocalTime(latestLocation.timeZone)}}</p>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import SearchBar from './SearchBar.vue';


const locations = ref([]); // array of locations
const latestLocation = ref(null);
const getLocalTime = (timeZone) => {
  const now = new Date();
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  const localTime = new Date(utc + (1000 * timeZone.rawOffset) + (1000 * timeZone.dstOffset));
  return localTime.toLocaleString();
};


// Called when a location is searched in the SearchLocation component
const searchLocation = async (location) => {
  try {
    const response = await axios.get(`http://localhost:3000/search?location=${location}`);

    console.log("response:", response.data);

    latestLocation.value = response.data;
    const locationResult = response.data.place.formatted_address;
    locations.value.push(locationResult);

  } catch (error) {
    console.error(`Error searching for location "${location}": ${error}`);
  }
};

</script>
