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
  'updateLocations': Function
});

const emit = defineEmits(['update:locations']);

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
  const newLocations = props.locations.filter(location => !selectedLocations.value.includes(location));
  selectedLocations.value = [];
  selectAll.value = false;
  
  emit('update:locations', newLocations); // <-- emit the event here
};

const toggleAll = () => {
  selectedLocations.value = selectAll.value ? [...displayedLocations.value] : [];
};
</script>

