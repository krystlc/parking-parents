<script setup>
const slug = useRoute().params.slug;
const { data: post, error } = await useAsyncData(`parks-${slug}`, () => {
    return queryCollection("parks").path(`/parks/${slug}`).first();
});
</script>

<template>
    <main class="container mx-auto pt-24">
        <article v-if="post">
            <ContentRenderer :value="post" />
        </article>
        <div v-else-if="error || !post" class="text-center py-24">
            <p>Oops! This park's details have wandered off the trail.</p>
            <UButton to="/" variant="ghost">Back to Map</UButton>
        </div>
    </main>
</template>
