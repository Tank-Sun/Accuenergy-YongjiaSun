<template>
  <div ref="mapContainer"></div>
</template>

<script setup>
import { ref, onMounted, watch, defineProps } from 'vue';
import { Loader } from '@googlemaps/js-api-loader';

const props = defineProps({
  locations: Array,
  latestLocation: Object,
});

let map;
let mapContainer = ref(null);
let markers = ref({});
// let markers = reactive({});

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
      center: { lat: 40.7128, lng: -74.0060 },
      zoom: 8,
    });

    // Create markers for existing locations
    for (let location of props.locations) {
      addMarker(location);
    }

  } catch (error) {
    // Handle the error
    console.error(error);
  }
});

watch(() => props.locations, (newLocations, oldLocations) => {
  const newIds = newLocations.map(loc => loc.id);
  const oldIds = oldLocations.map(loc => loc.id);

  for (let location of oldLocations) {
    if (!newIds.includes(location.id)) {
      console.log("ccccclocation:", location);
      removeMarker(location);
    }
  }

  for (let location of newLocations) {
    if (!oldIds.includes(location.id)) {
      console.log("aaaaalocation:", location);
      addMarker(location);
    }
  }
}, {deep: true});

watch(() => props.latestLocation, (newLocation) => {
  if(newLocation){
    console.log("bbbbbnewLocation:", newLocation);
    // Update map center
    map.setCenter(newLocation.locaInfo.place.geometry.location);

    // Add marker for new location
    addMarker(newLocation);
  }
}, {deep: true});

const addMarker = (location) => {
  let marker = new google.maps.Marker({
    position: location.locaInfo.place.geometry.location,
    map,
  });
  markers.value[location.id] = marker;
}

const removeMarker = (location) => {
  let marker = markers.value[location.id];
  if (marker) {
    marker.setMap(null);
    delete markers.value[location.id];
  }
}

// const addMarker = (location) => {
//   let marker = new google.maps.Marker({
//     position: location.locaInfo.place.geometry.location,
//     map,
//   });
//   markers[location.id] = marker;
// }

// const removeMarker = (location) => {
//   let marker = markers[location.id];
//   if (marker) {
//     marker.setMap(null);
//     delete markers[location.id];
//   }
// }

</script>

<style scoped>
div {
  height: 400px;
  width: 100%;
}
</style>








