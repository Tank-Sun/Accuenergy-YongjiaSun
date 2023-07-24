<template>
  <div class="pagination">
    <button @click="prevPage" :disabled="currentPage === 1">Prev</button>
    <span>Page {{ currentPage }} of {{ totalPages }}</span>
    <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
  </div>
</template>

<script setup>
import { ref, computed, defineProps, defineEmits } from 'vue';

const props = defineProps({
  perPage: Number,
  totalItems: Number,
});

const currentPage = ref(1);
const totalPages = computed(() => Math.ceil(props.totalItems / props.perPage));

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    emit('update:page', currentPage.value);
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    emit('update:page', currentPage.value);
  }
};

const emit = defineEmits(['update:page']);
</script>
