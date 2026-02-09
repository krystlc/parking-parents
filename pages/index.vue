<template>
    <div class="container max-w-sm mx-auto">
        <ContentRenderer :value="home" />
    </div>
</template>

<script setup>
const { data: home } = await useAsyncData("home", () => {
    return queryCollection("pages").path("/pages/home").first();
});

useSeoMeta({
    title: home.value?.title,
    description: home.value?.description,
});
</script>
