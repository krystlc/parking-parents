<template>
    <UContainer class="grid grid-cols-1 md:grid-cols-12 gap-12">
        <article class="prose col-span-8">
            <ContentRenderer :value="page" />
        </article>
        <aside class="hidden md:block md:col-span-4">
            <div class="sticky top-24">
                <UiTableOfContents :links="page.body.toc.links" />
            </div>
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
</script>
