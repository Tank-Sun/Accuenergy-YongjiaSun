<template>
  <div ref="mapContainer"></div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { Loader } from '@googlemaps/js-api-loader';

const props = defineProps({
  location: Object,
});

let map;
const mapContainer = ref(null);


onMounted(async () => {
  const loader = new Loader({
    apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    version: "weekly",
  });

  try {
    // Load the Google Maps JavaScript API
    await loader.load();

    // Initialize the map
    map = new google.maps.Map(mapContainer.value, {
      center: { lat: 43.748329, lng: -79.289200 },
      zoom: 8,
    });


  } catch (error) {
    // Handle the error
    console.error(error);
  }
});

// Watch for changes in props.location and update the map and marker accordingly
watch(() => props.location, (newLocation) => {
  if (newLocation) {
    console.log("newLocation:", newLocation);

    // Update map center
    map.setCenter(newLocation.place.geometry.location);

    // Add a new marker for the updated location
    new google.maps.Marker({
      position: newLocation.place.geometry.location,
      map,
    });
  }
}, { immediate: true });

</script>

<style scoped>
div {
  height: 400px;
  width: 100%;
}
</style>

