<script setup>
const slug = useRoute().params.slug;
const { data: post } = await useAsyncData(`parks-${slug}`, () => {
    return queryCollection("content").path(`/parks/${slug}`).first();
});
</script>

<template>
    <main class="container mx-auto pt-24">
        <article class="prose">
            <ContentRenderer :value="post" />
        </article>
    </main>
</template>
