<template>
  <div>
    <button @click="deleteSelectedLocations">Delete Selected</button>
    <table>
      <thead>
        <tr>
          <th><input type="checkbox" v-model="selectAll" @change="toggleAll" /></th>
          <th>Address</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="location in displayedLocations" :key="location.id">
          <td><input type="checkbox" v-model="selectedLocations" :value="location" /></td>
          <td>{{ location.locaInfo.place.formatted_address }}</td>
        </tr>
      </tbody>
    </table>
    <Pagination :perPage="10" :totalItems="locations.length" @update:page="currentPage = $event" />
  </div>
</template>

<script setup>
import { ref, computed, defineProps, watch } from 'vue';
import Pagination from './Pagination.vue';

const props = defineProps({
  locations: Array,
});

let selectedLocations = ref([]);
let currentPage = ref(1);
let selectAll = ref(false);

const displayedLocations = computed(() => {
  let start = (currentPage.value - 1) * 10;
  return props.locations.slice(start, start + 10);
});

watch(displayedLocations, () => {
  selectedLocations.value = selectAll.value ? [...displayedLocations.value] : [];
});

const deleteSelectedLocations = () => {
  for (let location of selectedLocations.value) {
    let index = props.locations.indexOf(location);
    if (index !== -1) {
      props.locations.splice(index, 1);
    }
  }
  selectedLocations.value = [];
  selectAll.value = false;
};

const toggleAll = () => {
  selectedLocations.value = selectAll.value ? [...displayedLocations.value] : [];
};
</script>

