<template>
    <LMap
        style="height: 100vh"
        :zoom="zoom"
        :center="center"
        :use-global-leaflet="false"
        @ready="onMapReady"
        @moveend="onMoveEnd"
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
                @click="$emit('select-park', feature.properties.parkId)"
            />
        </template>
    </LMap>
</template>

<script setup lang="ts">
import { ref, shallowRef, watch, onMounted } from "vue";
import Supercluster from "supercluster";
import type { ParksCollectionItem } from "@nuxt/content";

const emit = defineEmits(["select-park", "move-end"]);
const props = defineProps<{ locations: ParksCollectionItem[] }>();

const mapInstance = shallowRef<any>(null);
const visibleFeatures = ref<any[]>([]);
const center = ref<[number, number]>([27.9506, -82.4572]); // Default Tampa
const zoom = ref(12);

// 1. Setup Supercluster
const index = new Supercluster({ radius: 60, maxZoom: 16 });

const updateIndex = () => {
    const points = props.locations.map((park) => ({
        type: "Feature",
        properties: { cluster: false, parkId: park.path },
        geometry: {
            type: "Point",
            coordinates: [park.coordinates[1], park.coordinates[0]],
        },
    }));
    index.load(points as any);
    updateClusters();
};

// 2. Initial View Logic (Fit Bounds or User Location)
const setInitialView = () => {
    if (!mapInstance.value) return;

    if (props.locations.length > 0) {
        // Zoom out to fit ALL filtered parks
        const latLngs = props.locations.map((p) => [
            p.coordinates[0],
            p.coordinates[1],
        ]);
        mapInstance.value.fitBounds(latLngs, { padding: [50, 50] });
    } else {
        // Fallback: Try to find User
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                mapInstance.value.setView(
                    [pos.coords.latitude, pos.coords.longitude],
                    13,
                );
            },
            () => {
                console.log("User denied location access");
            },
        );
    }
};

const onMapReady = (map: any) => {
    mapInstance.value = map;
    updateIndex();
    setInitialView();
    emit("move-end", map.getBounds());
};

const onMoveEnd = (event: any) => {
    updateClusters();
    emit("move-end", event.target.getBounds());
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
    visibleFeatures.value = index.getClusters(
        bbox,
        mapInstance.value.getZoom(),
    );
};

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

// Re-index when locations change
watch(
    () => props.locations,
    () => updateIndex(),
    { deep: true },
);
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
