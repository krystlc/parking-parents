<template>
    <div>
        <ParkCard v-for="park in parks" :key="park.slug" :park="park" />
    </div>
</template>

<script setup>
const parks = ref([{ slug: "flatwoods-park", title: "Flatwoods Park" }]);
</script>
