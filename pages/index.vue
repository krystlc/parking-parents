<template>
    <div class="container max-w-sm mx-auto py-24 space-y-8">
        <ContentRenderer v-if="data" :value="data" />
        <ParkList />
    </div>
</template>

<script setup>
const { data } = await useAsyncData("home", () => {
    return queryCollection("pages").path("/pages/home").first();
});
</script>
