<template>
    <main class="container mx-auto max-w-xl">
        <article class="prose px-4">
            <ContentRenderer :value="page" />
        </article>
    </main>
</template>

<script setup>
const { data: page } = await useAsyncData("page-kit", () => {
    return queryCollection("pages").path("/pages/kit").first();
});

useSeoMeta({
    title: page.value?.title,
    description: page.value?.description,
});
</script>
