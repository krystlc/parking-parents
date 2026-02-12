<template>
    <!-- <aside>
        <ParkFilter />
    </aside> -->
    <main class="sm:flex sm:h-screen">
        <section class="max-w-lg space-y-4 px-4 min-w-md">
            <ULink
                v-for="park in parks"
                :key="park.id"
                :to="park.path"
                class="block"
            >
                <ParkCard :park="park" />
            </ULink>
        </section>
        <section class="flex-1">
            <ParkMap :locations="markers" />
        </section>
    </main>
</template>

<script setup lang="ts">
import type { TabsItem } from "@nuxt/ui";
import type { ParkLocation } from "~/components/types";

const { data: parks } = await useAsyncData("parks", () => {
    return queryCollection("parks").all();
});

const markers = computed<ParkLocation[]>(
    () =>
        parks.value?.map((p) => ({
            name: p.title,
            latlng: p.coordinates,
            path: p.path,
        })) ?? [],
);
</script>
