<template>
    {{ locations }}
    <LMap
        style="height: 50vh"
        :zoom="12"
        :center="locations[0].latlng"
        :use-global-leaflet="false"
    >
        <LTileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&amp;copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
            layer-type="base"
            name="OpenStreetMap"
        />
        <!-- Loop through locations to create markers -->
        <LMarker
            v-for="(location, index) in locations"
            :key="index"
            :lat-lng="location.latlng"
        />
    </LMap>
</template>

<script setup lang="ts">
const props = defineProps<{
    locations: Location[];
}>();
</script>
