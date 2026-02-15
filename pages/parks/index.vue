<template>
    <UContainer as="main" class="grid md:grid-cols-3 gap-8">
        <aside>
            <ParkFilter @update:filters="(val) => (activeFilters = val)" />
        </aside>
        <main class="space-y-4">
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
                <ParkMap :locations="filteredParks" />
            </ClientOnly>
        </aside>
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

// 3. The filtering logic remains the same
const filteredParks = computed(() => {
    if (!allParks.value) return [];
    return allParks.value.filter((park) => {
        if (
            activeFilters.value.searchQuery &&
            !park.title
                .toLowerCase()
                .includes(activeFilters.value.searchQuery.toLowerCase())
        )
            return false;
        if (activeFilters.value.isFullyFenced && !park.fenced) return false;
        if (activeFilters.value.hasShade && !park.shade) return false;

        // Add logic for Essentials and Terrain here as well
        return true;
    });
});
</script>
