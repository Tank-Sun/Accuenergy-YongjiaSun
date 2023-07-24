<template>
  <div className="flex flex-col items-center w-full">
    <SearchBar @search="searchLocation" />
    <CurrentTime :location="latestLocation" />
    <div className="flex w-full justify-around mt-20">
      <MapDisplay :locations="locations" :latestLocation="latestLocation" />
      <LocationTable :locations="locations" @update:locations="updateLocations" />
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import axios from 'axios';
  import SearchBar from './SearchBar.vue';
  import CurrentTime from './CurrentTime.vue';
  import MapDisplay from './MapDisplay.vue';
  import LocationTable from './LocationTable.vue';


  const locations = ref([]); // array of locations
  const latestLocation = ref(null);


  // Called when a location is searched in the SearchLocation component
  const searchLocation = async (location) => {
    try {
      const response = await axios.get(`http://localhost:3000/search?location=${location}`);

      console.log("response:", response.data);

      // latestLocation.value = response.data;
      let locationResult = {
        id: Date.now(),
        locaInfo: response.data,
      };
      latestLocation.value = locationResult;
      locations.value = [...locations.value, locationResult];
      console.log("locations:", locations.value);

    } catch (error) {
      console.error(`Error searching for location "${location}": ${error}`);
    }
  };

  const updateLocations = (newLocations) => {
    locations.value = newLocations; // If locations is a ref
    // OR this.locations = newLocations; if locations is in data()
  };

</script>
