<template>
  <div>
    <input v-model="searchInput" type="text" placeholder="Enter a location" @keyup.enter="searchLocation">
    <button @click="searchLocation">Search</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

let searchInput = ref('');

const searchLocation = () => {
  emit('search', searchInput.value);
  searchInput.value = '';
};

const emit = defineEmits(["search"]);

</script>
