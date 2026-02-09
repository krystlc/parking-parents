<template>
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
        <LMarker
            v-for="(marker, index) in locations"
            :key="index"
            :lat-lng="marker.latlng"
            @click="$router.push(marker.path)"
        />
    </LMap>
</template>

<script setup lang="ts">
import { type ParkLocation } from "./types";
const props = defineProps<{
    locations: ParkLocation[];
}>();
</script>
