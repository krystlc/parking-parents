<template>
  <div>
    <h3>
      <NuxtLink :to="`/parks/${park.slug}`">{{ park.title }}</NuxtLink>
    </h3>
  </div>
</template>

<script setup>
defineProps({
  park: Object
});
</script>
