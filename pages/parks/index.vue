<template>
    <!-- <aside>
        <ParkFilter />
    </aside> -->
    <main class="sm:flex sm:h-screen">
        <UTabs :items="items" class="w-full sm:hidden">
            <template #map>
                <ParkMap :locations="markers" />
            </template>
            <template #list>
                <section class="max-w-lg">
                    <ULink v-for="park in parks" :key="park.id" :to="park.path">
                        <ParkCard :park="park" />
                    </ULink>
                </section>
            </template>
        </UTabs>
        <section class="max-w-lg hidden sm:block">
            <ULink v-for="park in parks" :key="park.id" :to="park.path">
                <ParkCard :park="park" />
            </ULink>
        </section>
        <section class="flex-1 hidden sm:block">
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
            latlng: p.latlng,
            path: p.path,
        })) ?? [],
);

const items = [
    {
        icon: "i-lucide-list",
        label: "List",
        slot: "list",
    },
    {
        icon: "i-lucide-map-marker",
        label: "Map",
        slot: "map",
    },
] satisfies TabsItem[];
</script>
