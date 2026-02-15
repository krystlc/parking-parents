<script setup lang="ts">
const route = useRoute();
const slugArray = route.params.slug as string[];
const isUpdate = slugArray.length > 1;
const parkSlug = slugArray[0];
const updateSlug = slugArray[1];
</script>

<template>
    <UContainer as="main">
        <AppBreadcrumb />
        <ParkMasterPage v-if="!isUpdate" :slug="parkSlug" />
        <ParkUpdatePage
            v-else
            :park-slug="parkSlug"
            :update-slug="updateSlug"
        />
    </UContainer>
</template>
