<template>
  <div>
    <button class="btn btn-primary" @click="getCurrentLocation">Get Current Location</button>
    <p v-if="address">{{address}}</p>
    <p v-else-if="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';


    const address = ref('');
    const error = ref('');


    const getCurrentLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          geocodePosition,
          handleLocationError
        );
      } else {
        error.value = "Geolocation is not supported by this browser.";
      }
    };

    const geocodePosition = async (position) => {
      try {
        const response = await axios.post(
          `http://localhost:3000/geocode`,
          {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }
        );
        address.value = response.data.results[0].formatted_address;
      } catch (error) {
        error.value = "Unable to retrieve your address";
      }
    };

    const handleLocationError = (error) => {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          error.value = "User denied the request for Geolocation.";
          break;
        case error.POSITION_UNAVAILABLE:
          error.value = "Location information is unavailable.";
          break;
        case error.TIMEOUT:
          error.value = "The request to get user location timed out.";
          break;
        default:
          error.value = "An unknown error occurred.";
          break;
      }
    };

</script>

<style scoped>
.btn {
  background-color: #0099ff;
  color: white;
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
  cursor: pointer;
}
</style>
