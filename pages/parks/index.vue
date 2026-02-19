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
                        v-model="activeFilters"
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
import {
    ParkFilterSchema,
    type ParkFilters,
} from "~/components/park/park-filter.schema";
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
const activeFilters = ref<ParkFilters>(ParkFilterSchema.parse(route.query));
// 2. Watch for filter changes and update the URL (Sync State -> URL)
watch(
    activeFilters,
    (newFilters) => {
        router.replace({
            path: "/parks",
            query: {
                q: newFilters.q,
                f: newFilters.f ? "true" : "false",
                s: String(newFilters.s),
                r: String(newFilters.r),
                sw: String(newFilters.sw),
                st: String(newFilters.st),
                t: newFilters.t,
                p: newFilters.p,
                age: newFilters.age,
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
        // 1. Bounds check (keep as is)
        if (currentBounds.value) {
            const { _southWest, _northEast } = currentBounds.value;
            const [lat, lng] = park.coordinates;
            if (!lat || !lng) return false;
            const isVisible =
                lat >= _southWest.lat &&
                lat <= _northEast.lat &&
                lng >= _southWest.lng &&
                lng <= _northEast.lng;
            if (!isVisible) return false;
        }

        // 2. Search Query (Title or Neighborhood)
        if (activeFilters.value.q) {
            const q = activeFilters.value.q.toLowerCase();
            const matchesTitle = park.title?.toLowerCase().includes(q);
            const matchesAddress = park.address?.street
                ?.toLowerCase()
                .includes(q);
            if (!matchesTitle && !matchesAddress) return false;
        }

        // 3. Simple Booleans
        if (activeFilters.value.f && !park.fenced) return false;
        if (activeFilters.value.s && !park.shade) return false;

        // 5. Terrain (Match selected radio to park terrain array)
        if (activeFilters.value.t && activeFilters.value.t.length > 0) {
            if (!park.terrain?.some((t) => activeFilters.value.t?.includes(t)))
                return false;
        }

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
