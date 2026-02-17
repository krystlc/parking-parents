<script setup lang="ts">
const { data: posts } = await useAsyncData("blog", () => {
    return queryCollection("updates").all();
});
</script>

<template>
    <UContainer as="main" class="max-w-3xl space-y-8 py-12">
        <UpdateCard v-for="post of posts" :post="post" />
    </UContainer>
</template>
