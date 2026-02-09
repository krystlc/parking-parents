<script setup lang="ts">
const { data: posts } = await useAsyncData("blog", () => {
    return queryCollection("updates").all();
});
</script>

<template>
    <UContainer as="main" class="max-w-md">
        <UCard>
            <template #header> Latest reports </template>
            <ULink v-for="post of posts" :to="post.path">
                <UCard variant="soft">
                    <template #header>
                        {{ post.title }}
                    </template>
                </UCard>
            </ULink>
        </UCard>
    </UContainer>
</template>
