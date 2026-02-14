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
}
</script>

<template>
    <div v-if="update">
        <header class="mb-8 border-b pb-6">
            <h1 class="text-3xl font-bold mb-2">{{ update.title }}</h1>
            <div class="flex items-center gap-4 text-sm text-gray-500">
                <span>📅 {{ update.date }}</span>
                <div class="flex gap-1">
                    <UBadge
                        v-for="v in update.vibe"
                        :key="v"
                        size="xs"
                        variant="soft"
                        >{{ v }}</UBadge
                    >
                </div>
            </div>
        </header>

        <div class="park-prose">
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
    </div>
</template>
