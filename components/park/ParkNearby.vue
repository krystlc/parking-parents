<script setup lang="ts">
const props = defineProps<{
    currentPark: any;
}>();

const { data: allParks } = await useAsyncData("all-parks-for-siblings", () => {
    return queryCollection("parks").all();
});

const siblings = computed(() => {
    if (!allParks.value) return [];

    return allParks.value
        .filter((p) => p.id !== props.currentPark.id) // Don't recommend itself
        .map((p) => {
            const distance = calculateDistance(
                props.currentPark.coordinates[0],
                props.currentPark.coordinates[1],
                p.coordinates[0],
                p.coordinates[1],
            );

            // Calculate "Tag Match" score for fallback
            const sharedTags = props.currentPark.ageGroup?.filter(
                (tag: string) => p.ageGroup.includes(tag),
            ).length;

            return { ...p, distance, sharedTags };
        })
        .sort((a, b) => a.distance - b.distance) // Primary sort by distance
        .slice(0, 3); // Only show top 3
});
</script>

<template>
    <section v-if="siblings.length" class="">
        <h3 class="text-xl font-bold mb-4 flex items-center gap-2">
            <UIcon name="i-lucide-map-pinned" />
            Nearby Plan B's
        </h3>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <NuxtLink v-for="park in siblings" :key="park.id" :to="park.path">
                <ParkCard :park="park">
                    <UBadge> {{ park.distance.toFixed(1) }} km away </UBadge>
                </ParkCard>
            </NuxtLink>
        </div>
    </section>
</template>
