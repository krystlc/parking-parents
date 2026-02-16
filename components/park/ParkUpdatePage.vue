<script setup lang="ts">
const props = defineProps<{ parkSlug: string; updateSlug: string }>();

const { data: update } = await useAsyncData(
    `park-update-${props.updateSlug}`,
    () => {
        return queryCollection("updates")
            .path(`/parks/${props.parkSlug}/${props.updateSlug}`)
            .first();
    },
);

if (update.value) {
    useSeoMeta({
        title: `${update.value.title} | Parking Parents`,
        ogTitle: `${update.value.title} - Best Parks for Kids`,
        description: update.value.description,
        ogDescription: update.value.description,
        ogImage: "/default-park-og.jpg",
        twitterCard: "summary_large_image",
        // Dynamic structured data for Google
        articleTag: update.value.vibe,
    });

    useHead({
        script: [
            {
                type: "application/ld+json",
                innerHTML: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Review",
                    headline: update.value.title,
                    description: update.value.description,
                    datePublished: update.value.date,
                    author: {
                        "@type": "Organization", // Or "Person" if you have author names
                        name: "Parking Parents",
                    },
                    itemReviewed: {
                        "@type": "Park",
                        "@id": `https://parkingparents.com/parks/${props.parkSlug}#park`, // Links to Master
                        name: props.parkSlug.replace(/-/g, " "),
                    },
                    reviewRating: {
                        "@type": "Rating",
                        ratingValue: "5", // Defaulting to 5 for field reports, or make it dynamic
                        bestRating: "5",
                    },
                }),
            },
        ],
    });
}

useSeoMeta({
    title: update.value?.title,
    description: update.value?.description,
});

defineOgImage("Template", {
    title: update.value?.title,
    description: update.value?.description,
});
</script>

<template>
    <section v-if="update">
        <header class="mb-8 border-b pb-6">
            <h1 class="text-3xl font-bold mb-2">{{ update.title }}</h1>
            <div class="flex items-center gap-4 text-sm">
                <span>📅 {{ update.date }}</span>
                <div class="flex gap-1">
                    <UBadge v-for="v in update.vibe" :key="v" variant="soft">{{
                        v
                    }}</UBadge>
                </div>
            </div>
        </header>

        <div class="prose">
            <ContentRenderer :value="update" />
        </div>

        <UButton
            :to="`/parks/${props.parkSlug}`"
            variant="link"
            icon="i-lucide-arrow-left"
            class="mt-8"
        >
            Back to {{ props.parkSlug.replace(/-/g, " ") }}
        </UButton>
    </section>
</template>
