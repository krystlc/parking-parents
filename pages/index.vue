<template>
    <main class="container mx-auto">
        <ContentRenderer :value="page" />
    </main>
</template>

<script setup>
const { data: page } = await useAsyncData("page-home", () => {
    return queryCollection("pages").path("/pages/home").first();
});

useSeoMeta({
    title: page.value?.title,
    description: page.value?.description,
});

defineOgImage("Template", {
    title: page.value?.title,
    description: page.value?.description,
});
</script>
