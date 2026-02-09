<template>
    <div class="container max-w-sm mx-auto">
        <ContentRenderer v-if="data" :value="data" />
    </div>
</template>

<script setup>
const { data } = await useAsyncData("home", () => {
    return queryCollection("pages").path("/pages/home").first();
});
</script>
