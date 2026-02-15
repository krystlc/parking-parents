<script setup lang="ts">
const props = defineProps<{ slug: string }>();

// 1. Fetch the Master Park Data
const { data: page } = await useAsyncData(`park-master-${props.slug}`, () => {
    return queryCollection("parks").path(`/parks/${props.slug}`).first();
});

// 2. Bridge: Fetch the LATEST update to extract the "Vibe"
const { data: latestUpdate } = await useAsyncData(
    `latest-vibe-${props.slug}`,
    () => {
        return queryCollection("updates")
            .where("parkId", "=", props.slug)
            .order("date", "DESC")
            .first();
    },
);

// Auto-generate SEO Meta Tags
if (page.value) {
    useSeoMeta({
        title: `${page.value.title} | Parking Parents`,
        ogTitle: `${page.value.title} - Best Parks for Kids`,
        description: page.value.description,
        ogDescription: page.value.description,
        ogImage: page.value.featuredImage || "/default-park-og.jpg",
        twitterCard: "summary_large_image",
        // Dynamic structured data for Google
        articleTag: page.value.ageGroup,
    });

    const schemaAmenities = [
        { name: "Fenced", value: page.value.fenced },
        { name: "Restrooms", value: page.value.restrooms },
        { name: "Shaded", value: page.value.shade },
    ]
        .filter((a) => a.value) // Only show features the park actually has
        .map((a) => ({
            "@type": "LocationFeatureSpecification",
            name: a.name,
            value: true,
        }));

    useHead({
        script: [
            {
                type: "application/ld+json",
                innerHTML: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Park",
                    "@id": `https://parkingparents.com/parks/${props.slug}#park`, // Unique ID for cross-referencing
                    name: page.value.title,
                    description: page.value.description,
                    image: page.value.featuredImage,
                    address: {
                        "@type": "PostalAddress",
                        streetAddress: page.value.address,
                        addressLocality: "Tampa", // Replace with your dynamic city field if available
                        addressRegion: "FL",
                    },
                    geo: {
                        "@type": "GeoCoordinates",
                        latitude: page.value.coordinates[0],
                        longitude: page.value.coordinates[1],
                    },
                    amenityFeature: schemaAmenities,
                }),
            },
        ],
    });
}

useSeoMeta({
    title: page.value?.title,
    description: page.value?.description,
});

defineOgImage("Template", {
    title: page.value?.title,
    description: page.value?.description,
});
</script>

<template>
    <div v-if="page">
        <header class="mb-8">
            <h1 class="text-4xl font-extrabold tracking-tight">
                {{ page.title }}
                <ParkFavoriteButton :park-id="page.id" />
            </h1>

            <div v-if="latestUpdate?.vibe" class="mt-4 flex items-center gap-3">
                <UBadge v-if="page.fenced">Fenced</UBadge>
                <UBadge v-if="page.shade">Shaded</UBadge>
                <span
                    class="text-sm font-semibold uppercase tracking-wider text-gray-500"
                >
                    Current Vibe:
                </span>
                <div class="flex flex-wrap gap-2">
                    <UBadge
                        v-for="v in latestUpdate.vibe"
                        :key="v"
                        variant="subtle"
                        color="primary"
                        class="rounded-full px-3 py-1"
                    >
                        {{ v }}
                    </UBadge>
                </div>
                <span class="text-xs text-gray-400 italic">
                    (Reported {{ latestUpdate.date }})
                </span>
            </div>
        </header>

        <div class="md:grid md:grid-cols-5 gap-8 space-y-8">
            <main class="md:col-span-3 space-y-4">
                <UpdateRecentAlert :park-id="props.slug" />
                <section class="prose">
                    <ContentRenderer :value="page" />
                </section>
            </main>

            <aside class="md:col-span-2 space-y-8">
                <UpdateList :park-id="props.slug" />
                <ParkNearby :current-park="page" />
            </aside>
        </div>
    </div>
</template>
