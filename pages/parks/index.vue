<template>
    <ParkList />
    <ParkMap :locations="locations" />
</template>

<script setup lang="ts">
const locations: Location[] = [
    {
        name: "Location A",
        latlng: [28.1140756, -82.3064378],
        popupContent: "<h1>Welcome to Location A</h1>",
    },
];
</script>
