<template>
  <div>
    <h2>Park List</h2>
    <ParkCard v-for="park in parks" :key="park.slug" :park="park" />
  </div>
</template>

<script setup>
const parks = ref([
  { slug: 'my-first-park', title: 'My First Park' }
]);
</script>
