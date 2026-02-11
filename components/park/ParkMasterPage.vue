<script setup lang="ts">
const props = defineProps<{ slug: string }>();

const { data: page } = await useAsyncData(`park-master-${props.slug}`, () => {
    return queryCollection("parks").path(`/parks/${props.slug}`).first();
});

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

    // Schema.org JSON-LD for "Place"
    useHead({
        script: [
            {
                type: "application/ld+json",
                innerHTML: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Park",
                    name: page.value.title,
                    description: page.value.description,
                    address: {
                        "@type": "PostalAddress",
                        streetAddress: page.value.address,
                    },
                    geo: {
                        "@type": "GeoCoordinates",
                        latitude: page.value.coordinates[0],
                        longitude: page.value.coordinates[1],
                    },
                    amenityFeature: [
                        {
                            "@type": "LocationFeatureSpecification",
                            name: "Fenced",
                            value: page.value.fenced,
                        },
                        {
                            "@type": "LocationFeatureSpecification",
                            name: "Restrooms",
                            value: page.value.restrooms,
                        },
                    ],
                }),
            },
        ],
    });
}
</script>

<template>
    <div v-if="page">
        <h1 class="text-4xl font-bold">{{ page.title }}</h1>

        <div class="md:grid md:grid-cols-5 gap-8 py-4">
            <main class="md:col-span-3 space-y-4">
                <div class="flex gap-2">
                    <UBadge v-if="page.fenced">Fenced</UBadge>
                    <UBadge v-if="page.shade">Shaded</UBadge>
                </div>
                <UpdateRecentAlert :park-id="props.slug" />
                <section class="prose">
                    <ContentRenderer :value="page" />
                </section>
            </main>

            <aside class="md:col-span-2">
                <UpdateList :park-id="props.slug" />
            </aside>
        </div>
    </div>
</template>
