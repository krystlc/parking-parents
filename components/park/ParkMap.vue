<template>
    <LMap
        style="height: 480px"
        :zoom="12"
        :center="locations[0]?.coordinates || [0, 0]"
        :use-global-leaflet="false"
        @ready="onMapReady"
        @moveend="updateClusters"
    >
        <LTileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
            layer-type="base"
            name="OpenStreetMap"
        />

        <template
            v-for="feature in visibleFeatures"
            :key="feature.id || feature.properties.parkId"
        >
            <LMarker
                v-if="feature.properties.cluster"
                :lat-lng="[
                    feature.geometry.coordinates[1],
                    feature.geometry.coordinates[0],
                ]"
                @click="expandCluster(feature)"
            >
                <LIcon :icon-size="[35, 35]" className="custom-cluster-icon">
                    <div class="cluster-inner">
                        {{ feature.properties.point_count }}
                    </div>
                </LIcon>
            </LMarker>

            <LMarker
                v-else
                :lat-lng="[
                    feature.geometry.coordinates[1],
                    feature.geometry.coordinates[0],
                ]"
                @click="$router.push(feature.properties.parkId)"
            />
        </template>
    </LMap>
</template>

<script setup lang="ts">
import { ref, shallowRef } from "vue";
import Supercluster from "supercluster";
import type { ParksCollectionItem } from "@nuxt/content";

const props = defineProps<{
    locations: ParksCollectionItem[];
}>();

const mapInstance = shallowRef<any>(null);
const visibleFeatures = ref<any[]>([]);

// 1. Initialize Supercluster
const index = new Supercluster({
    radius: 60,
    maxZoom: 16,
});

const points = props.locations.map((park) => ({
    type: "Feature",
    properties: { cluster: false, parkId: park.path },
    geometry: {
        type: "Point",
        coordinates: [park.coordinates[1], park.coordinates[0]],
    },
}));

index.load(points as any);

// 2. Map Event Handlers
const onMapReady = (map: any) => {
    mapInstance.value = map;
    updateClusters();
};

const updateClusters = () => {
    if (!mapInstance.value) return;

    const b = mapInstance.value.getBounds();
    const bbox: [number, number, number, number] = [
        b.getWest(),
        b.getSouth(),
        b.getEast(),
        b.getNorth(),
    ];
    const zoom = mapInstance.value.getZoom();

    visibleFeatures.value = index.getClusters(bbox, zoom);
};

// 3. Zoom into cluster on click
const expandCluster = (cluster: any) => {
    const expansionZoom = Math.min(
        index.getClusterExpansionZoom(cluster.id),
        18,
    );
    mapInstance.value.setView(
        [cluster.geometry.coordinates[1], cluster.geometry.coordinates[0]],
        expansionZoom,
    );
};
</script>

<style>
.custom-cluster-icon {
    background: var(--color-primary-500, #3b82f6);
    color: white;
    border-radius: 50%;
    border: 2px solid white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}
</style>
