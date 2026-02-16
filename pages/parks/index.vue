<template>
    <UContainer as="main" class="grid md:grid-cols-3 gap-8">
        <aside>
            <ParkFilter @update:filters="(val) => (activeFilters = val)" />
        </aside>
        <main class="space-y-4 hidden md:block">
            <p class="text-sm text-muted">
                Showing {{ filteredParks.length }} parks
            </p>

            <ULink
                v-for="park in filteredParks"
                :key="park.id"
                :to="park.path"
                class="block"
            >
                <ParkCard :park="park" />
            </ULink>

            <div v-if="filteredParks.length === 0" class="text-center py-10">
                <UIcon
                    name="i-lucide-frown"
                    class="w-10 h-10 mx-auto text-gray-400"
                />
                <p class="mt-2 text-gray-600">No parks match your filters.</p>
            </div>
        </main>
        <aside>
            <ClientOnly>
                <ParkMap
                    :locations="filteredParks"
                    @select-park="openPreview"
                    @move-end="handleMoveEnd"
                />
            </ClientOnly>
        </aside>
        <USlideover
            v-model:open="isPreviewOpen"
            side="bottom"
            :ui="{ height: 'max-h-[40vh]' }"
        >
            <template #content>
                <ParkPreview
                    :selectedPark="selectedPark"
                    @on:close="isPreviewOpen = false"
                />
            </template>
        </USlideover>
    </UContainer>
</template>

<script setup lang="ts">
const route = useRoute();
const router = useRouter();

const { data: allParks } = await useAsyncData("parks", () => {
    return queryCollection("parks").all();
});

// 1. Initialize filters from URL query parameters (or defaults)
const activeFilters = ref({
    searchQuery: (route.query.q as string) || "",
    essentials: Array.isArray(route.query.e)
        ? route.query.e
        : route.query.e
          ? [route.query.e]
          : [],
    terrain: (route.query.t as string) || "",
    isFullyFenced: route.query.f === "true",
    hasShade: route.query.s === "true",
});

// 2. Watch for filter changes and update the URL (Sync State -> URL)
watch(
    activeFilters,
    (newFilters) => {
        router.replace({
            query: {
                q: newFilters.searchQuery || undefined,
                e: newFilters.essentials.length
                    ? newFilters.essentials
                    : undefined,
                t: newFilters.terrain || undefined,
                f: newFilters.isFullyFenced ? "true" : undefined,
                s: newFilters.hasShade ? "true" : undefined,
            },
        });
    },
    { deep: true },
);

const currentBounds = ref<any>(null);

// Update bounds whenever the map moves
const handleMoveEnd = (bounds: any) => {
    currentBounds.value = bounds;
};

const filteredParks = computed(() => {
    if (!allParks.value) return [];

    return allParks.value.filter((park) => {
        // 1. Map Bounds Filter (The "Search as I move" core)
        if (currentBounds.value) {
            const { _southWest, _northEast } = currentBounds.value;
            const [lat, lng] = park.coordinates; // Using your [lat, lng] tuple

            if (!lat || !lng) return false;

            const isVisible =
                lat >= _southWest.lat &&
                lat <= _northEast.lat &&
                lng >= _southWest.lng &&
                lng <= _northEast.lng;

            if (!isVisible) return false;
        }

        // 2. Your existing Amenity Filters
        if (activeFilters.value.isFullyFenced && !park.fenced) return false;
        if (activeFilters.value.hasShade && !park.shade) return false;

        return true;
    });
});

const isPreviewOpen = ref(false);
const selectedParkId = ref<string | null>(null);

// Find the park object from our list when a marker is clicked
const selectedPark = computed(() => {
    return allParks.value?.find((p) => p.path === selectedParkId.value);
});

const openPreview = (id: string) => {
    selectedParkId.value = id;
    isPreviewOpen.value = true;
};
</script>
