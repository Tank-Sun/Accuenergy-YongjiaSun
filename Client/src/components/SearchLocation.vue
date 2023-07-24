<template>
  <div>
    <SearchBar @search="searchLocation" />
    <CurrentTime :location="latestLocation" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import SearchBar from './SearchBar.vue';
import CurrentTime from './CurrentTime.vue';


const locations = ref([]); // array of locations
const latestLocation = ref(null);


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
