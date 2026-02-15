<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const items = ref<NavigationMenuItem[]>([
    [
        {
            icon: "i-lucide-circle-parking",
            to: "/",
        },
    ],
    [
        {
            label: "Blog",
            icon: "i-lucide-trees",
            to: "/blog",
        },
        {
            label: "Parks",
            icon: "i-lucide-map",
            to: "/parks",
        },
        {
            label: "the Kit",
            icon: "i-lucide-backpack",
            to: "/kit",
        },
    ],
]);
</script>

<template>
    <UContainer class="w-fit py-4" as="header">
        <UNavigationMenu :items="items" color="info" />
    </UContainer>
</template>
