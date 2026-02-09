<template>
    <!-- <aside>
        <ParkFilter />
    </aside> -->
    <main class="flex h-screen">
        <section class="max-w-lg">
            <ULink v-for="park in parks" :key="park.slug" :to="park.path">
                <ParkCard :park="park" />
            </ULink>
        </section>
        <section class="flex-1">
            <ParkMap
                :locations="
                    parks.map((p) => ({
                        name: p.title,
                        latlng: p.latlng,
                        path: p.path,
                    }))
                "
            />
        </section>
    </main>
</template>

<script setup lang="ts">
const { data: parks, error } = await useAsyncData("parks", () => {
    return queryCollection("parks").all();
});
</script>
