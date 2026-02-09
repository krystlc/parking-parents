<template>
    <!-- <aside>
        <ParkFilter />
    </aside> -->
    <main class="flex h-screen">
        <section class="max-w-lg">
            <ULink v-for="park in parks" :key="park.id" :to="park.path">
                <ParkCard :park="park" />
            </ULink>
        </section>
        <section class="flex-1">
            <ParkMap :locations="markers" />
        </section>
    </main>
</template>

<script setup lang="ts">
import type { ParkLocation } from "~/components/types";

const { data: parks } = await useAsyncData("parks", () => {
    return queryCollection("parks").all();
});

const markers = computed<ParkLocation[]>(
    () =>
        parks.value?.map((p) => ({
            name: p.title,
            latlng: p.latlng,
            path: p.path,
        })) ?? [],
);
</script>
