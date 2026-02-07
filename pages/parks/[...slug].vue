<script setup>
const slug = useRoute().params.slug;
const { data: post } = await useAsyncData(`parks-${slug}`, () => {
    return queryCollection("content").path(`/parks/${slug}`).first();
});
</script>

<template>
    <main>
        <article>
            <!-- Render the blog post as Prose & Vue components -->
            <ContentRenderer :value="post" />
        </article>
    </main>
</template>
