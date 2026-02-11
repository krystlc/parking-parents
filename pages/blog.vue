<script setup lang="ts">
const { data: posts } = await useAsyncData("blog", () => {
    return queryCollection("updates").all();
});
</script>

<template>
    <UContainer as="main" class="max-w-3xl space-y-8">
        <UpdateCard
            v-for="post of posts"
            :post="{
                date: post.date,
                title: post.title,
                preview: post.description,
                path: post.path,
            }"
        />
    </UContainer>
</template>
