<template>
    <UContainer class="grid grid-cols-1 md:grid-cols-12 gap-12 py-12">
        <UCard class="prose col-span-8" variant="subtle">
            <ContentRenderer :value="page" />
        </UCard>
        <aside class="hidden md:block md:col-span-4">
            <UCard class="sticky top-0" variant="outline">
                <UiTableOfContents :links="page.body.toc.links" />
            </UCard>
        </aside>
    </UContainer>
</template>

<script setup>
const { data: page } = await useAsyncData("page-kit", () => {
    return queryCollection("pages").path("/pages/kit").first();
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
