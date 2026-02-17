<template>
    <div class="relative">
        <aside>
            <UButton
                title="Toggle Filter"
                @click="toggleFilter = !toggleFilter"
                icon="i-lucide-list-filter-plus"
                color="neutral"
                size="xl"
                variant="outline"
                :ui="{
                    leadingIcon: 'text-secondary',
                }"
                class="absolute top-2 right-2 z-1000"
            >
                Filter
            </UButton>
        </aside>
        <main class="col-span-2">
            <ClientOnly>
                <ParkMap
                    :locations="finalParks"
                    @select-park="openPreview"
                    @move-end="handleMoveEnd"
                />
            </ClientOnly>
        </main>
        <USlideover
            v-model:open="toggleFilter"
            :side="isSmall ? 'bottom' : 'left'"
            class="md:max-w-lg"
        >
            <template #content>
                <ClientOnly>
                    <ParkFilter
                        @update:filters="
                            (val) => {
                                activeFilters = val;
                                toggleFilter = false;
                            }
                        "
                        @on:close="toggleFilter = false"
                    />
                </ClientOnly>
            </template>
        </USlideover>
        <USlideover
            v-model:open="isPreviewOpen"
            :side="isSmall ? 'bottom' : 'right'"
            :ui="{ height: 'max-h-[40vh]' }"
            class="md:max-w-sm"
        >
            <template #content>
                <ParkPreview
                    :selectedPark="selectedPark"
                    @on:close="isPreviewOpen = false"
                />
            </template>
        </USlideover>
    </div>
</template>

<script setup lang="ts">
import { useUserLocation } from "~/composables/useUserLocation";
const breakpoints = useBreakpoints({
    sm: 640,
});
const isSmall = breakpoints.smaller("sm");

const toggleFilter = ref(false);

definePageMeta({
    layout: "fullscreen",
});

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
                q: newFilters?.searchQuery || undefined,
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

const { userCoords, resume } = useUserLocation();
const isSortingByDistance = ref(false);

// Function to trigger location request
const enableLocation = () => {
    resume();
    isSortingByDistance.value = true;
};

const finalParks = computed(() => {
    let list = [...filteredParks.value];

    if (isSortingByDistance.value && userCoords.value) {
        list = list
            .map((park) => ({
                ...park,
                // Calculate distance from user to park
                distanceFromMe: calculateDistance(
                    userCoords.value![0],
                    userCoords.value![1],
                    park.coordinates[0]!,
                    park.coordinates[1]!,
                ),
            }))
            .sort((a, b) => (a.distanceFromMe || 0) - (b.distanceFromMe || 0));
    }

    return list;
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
