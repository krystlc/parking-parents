<script setup lang="ts">
const slug = useRoute().params.slug;
const { data: park, error } = await useAsyncData(`parks-${slug}`, () => {
    return queryCollection("parks").path(`/parks/${slug}`).first();
});
// Auto-generate SEO Meta Tags
if (park.value) {
    useSeoMeta({
        title: `${park.value.title} | Parent-Tested Park Guide`,
        ogTitle: `${park.value.title} - Best Parks for Kids`,
        description: park.value.description,
        ogDescription: park.value.description,
        ogImage: park.value.featuredImage || "/default-park-og.jpg",
        twitterCard: "summary_large_image",
        // Dynamic structured data for Google
        articleTag: park.value.ageGroup,
    });

    // Schema.org JSON-LD for "Place"
    useHead({
        script: [
            {
                type: "application/ld+json",
                innerHTML: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Park",
                    name: park.value.title,
                    description: park.value.description,
                    address: {
                        "@type": "PostalAddress",
                        streetAddress: park.value.address,
                    },
                    geo: {
                        "@type": "GeoCoordinates",
                        latitude: park.value.coordinates[0],
                        longitude: park.value.coordinates[1],
                    },
                    amenityFeature: [
                        {
                            "@type": "LocationFeatureSpecification",
                            name: "Fenced",
                            value: park.value.fenced,
                        },
                        {
                            "@type": "LocationFeatureSpecification",
                            name: "Restrooms",
                            value: park.value.restrooms,
                        },
                    ],
                }),
            },
        ],
    });
}
</script>

<template>
    <main class="container mx-auto pt-24">
        <Breadcrumb />
        <article v-if="park">
            <ContentRenderer :value="park" />
        </article>
        <div v-else-if="error || !park" class="text-center py-24">
            <p>Oops! This park's details have wandered off the trail.</p>
            <UButton to="/" variant="ghost">Back to Map</UButton>
        </div>
    </main>
</template>
